// scripts/deploy-netlify.cjs
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const zipPath = path.resolve(rootDir, 'dist.zip');

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found! Run npm run build first.');
  process.exit(1);
}

// 1. Create zip
console.log('📦 Creating dist.zip...');
try {
  execSync(`cd "${distDir}" && zip -r "${zipPath}" ./* > /dev/null`);
  console.log(`✓ Created dist.zip (${(fs.statSync(zipPath).size / 1024).toFixed(1)} KB)`);
} catch (err) {
  console.error('Failed to create dist.zip:', err);
  process.exit(1);
}

// 2. Load Token
const config = JSON.parse(fs.readFileSync('/Users/shaikubaidullah/.gemini/config/mcp_config.json', 'utf8'));
const token = config.mcpServers.netlify.env.NETLIFY_AUTH_TOKEN;

const preferredName = 'ubaidullah-exhibition';

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const str = buffer.toString('utf8');
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(str) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: str });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function deploy() {
  console.log('🔍 Checking existing Netlify sites...');
  const sitesRes = await request({
    hostname: 'api.netlify.com',
    path: '/api/v1/sites',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Ubaidullah-Deployer'
    }
  });

  let site = (sitesRes.data || []).find(s => s.name === preferredName);

  if (!site) {
    console.log(`Creating new site "${preferredName}"...`);
    const createRes = await request({
      hostname: 'api.netlify.com',
      path: '/api/v1/sites',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Ubaidullah-Deployer'
      }
    }, JSON.stringify({ name: preferredName }));

    if (createRes.status === 201 || createRes.status === 200) {
      site = createRes.data;
    } else {
      console.log('Preferred name taken, creating with fallback name...');
      const fallbackName = `shaikubaidullah-exhibition`;
      const fallbackRes = await request({
        hostname: 'api.netlify.com',
        path: '/api/v1/sites',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Ubaidullah-Deployer'
        }
      }, JSON.stringify({ name: fallbackName }));
      site = fallbackRes.data;
    }
  }

  console.log(`✓ Target site: ${site.name} (ID: ${site.id})`);
  console.log(`🚀 Uploading dist.zip (${(fs.statSync(zipPath).size / 1024).toFixed(1)} KB)...`);

  const zipBuffer = fs.readFileSync(zipPath);
  const deployRes = await request({
    hostname: 'api.netlify.com',
    path: `/api/v1/sites/${site.id}/deploys`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/zip',
      'Content-Length': zipBuffer.length,
      'User-Agent': 'Ubaidullah-Deployer'
    }
  }, zipBuffer);

  console.log('Deploy status code:', deployRes.status);
  const deployData = deployRes.data;
  console.log('Deploy ID:', deployData.id);
  console.log('Deploy State:', deployData.state);
  const prodUrl = site.ssl_url || site.url || `https://${site.name}.netlify.app`;
  console.log('🎉 Production Live URL:', prodUrl);
}

deploy().catch(console.error);
