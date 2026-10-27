// tests/showcase-v3.spec.cjs
const { chromium } = require('/Users/shaikubaidullah/.gemini/mcp-packages/node_modules/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');

function startServer(port = 5898) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(port, () => {
      resolve({ server, port });
    });
  });
}

async function runTests() {
  console.log('🏛️ Starting Automated QA Test Suite for Showcase V3 (Brand & Compact Edition)...');
  const { server, port } = await startServer(5898);
  const baseUrl = `http://localhost:${port}`;
  console.log(`📡 Local preview server running at: ${baseUrl}`);

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const consoleErrors = [];
  const page = await context.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') {
      // Filter transient external CDN/font network fluctuations
      if (!msg.text().includes('ERR_CONNECTION_CLOSED') && !msg.text().includes('ERR_NETWORK_CHANGED') && !msg.text().includes('ERR_INTERNET_DISCONNECTED')) {
        consoleErrors.push(msg.text());
      }
    }
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    // Test 1: Favicon and Brand Glyph
    console.log('\n--- Test 1: Favicon & Brand Glyph ---');
    const faviconHref = await page.locator('link[rel="icon"][type="image/svg+xml"]').getAttribute('href');
    console.log(`Favicon link href: "${faviconHref}"`);
    if (!faviconHref || !faviconHref.includes('/favicon.svg')) {
      throw new Error(`Favicon link not properly wired! ${faviconHref}`);
    }

    const brandGlyphSvg = page.locator('svg[viewBox="0 0 100 100"]');
    const glyphCount = await brandGlyphSvg.count();
    console.log(`Brand glyphs rendered: ${glyphCount}`);
    if (glyphCount === 0) {
      throw new Error('Brand glyph not found in DOM!');
    }
    console.log('✅ Favicon and brand glyph verified.');

    // Test 2: Verify Total Absence of Noise Text
    console.log('\n--- Test 2: Verify Total Absence of Noise Text ---');
    const bodyText = await page.textContent('body');
    const forbiddenWords = [
      'FOLIO EXHIBIT',
      'SPECIMEN',
      '1280 × 800 HD Production',
      'Atmakur G.P.O.',
      '100% VERIFIED BUILDS',
      'Engineering Stack:',
      'Dossier #',
      'shaikubaidullah.dev@gmail.com', // Must use shaikubaidullah689@gmail.com
    ];

    for (const word of forbiddenWords) {
      if (bodyText.includes(word)) {
        throw new Error(`Forbidden text found: "${word}"`);
      }
    }
    console.log('✅ Zero noise text verified.');

    // Test 3: Verified Correct Email & LinkedIn
    console.log('\n--- Test 3: Verified Correct Email & LinkedIn ---');
    const hasCorrectEmail = bodyText.includes('shaikubaidullah689@gmail.com');
    if (!hasCorrectEmail) {
      throw new Error('shaikubaidullah689@gmail.com not found on page!');
    }

    const linkedinLink = await page.locator('a[href*="linkedin.com/in/shaik-ubaidullah-610284394"]').first().getAttribute('href');
    console.log(`LinkedIn Link: "${linkedinLink}"`);
    if (!linkedinLink) {
      throw new Error('LinkedIn link missing!');
    }
    console.log('✅ Correct Email & LinkedIn verified.');

    // Test 4: Compact "Send a letter" Form & Interaction
    console.log('\n--- Test 4: Compact "Send a letter" Section ---');
    const contactSection = page.locator('#contact');
    const letterHeading = await contactSection.locator('h2').textContent();
    console.log(`Section Heading: "${letterHeading}"`);
    if (!letterHeading.includes('Send a letter')) {
      throw new Error(`Expected "Send a letter", got: ${letterHeading}`);
    }

    const noteTextarea = contactSection.locator('textarea');
    await noteTextarea.fill('Testing compact note submission.');
    await page.waitForTimeout(200);

    const postBtn = contactSection.locator('button[type="submit"]');
    if (!(await postBtn.isVisible())) {
      throw new Error('Post letter button not visible!');
    }
    console.log('✅ Compact "Send a letter" form verified.');

    // Test 5: Responsive Viewports (Zero Overflow)
    console.log('\n--- Test 5: Responsive Viewport Stress Test ---');
    const viewports = [
      { name: 'Mobile SE', width: 320, height: 568 },
      { name: 'Mobile Standard', width: 375, height: 667 },
      { name: 'Mobile Modern', width: 390, height: 844 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Laptop', width: 1024, height: 768 },
      { name: 'Desktop HD', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          hasOverflow: docWidth > winWidth,
          scrollWidth: docWidth,
          innerWidth: winWidth,
        };
      });

      console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}): ScrollWidth=${overflow.scrollWidth}, InnerWidth=${overflow.innerWidth}`);
      if (overflow.hasOverflow) {
        throw new Error(`Horizontal overflow detected at ${vp.name}! ScrollWidth (${overflow.scrollWidth}) > InnerWidth (${overflow.innerWidth})`);
      }
    }
    console.log('✅ All 6 viewports have ZERO horizontal overflow.');

    // Test 6: Screenshots
    console.log('\n--- Test 6: Capturing Brand Verification Screenshots ---');
    const docsDir = path.resolve(__dirname, '../docs');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: path.join(docsDir, 'showcase-v3-brand-desktop.png') });
    console.log('📸 Captured docs/showcase-v3-brand-desktop.png');

    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(docsDir, 'showcase-v3-compact-contact.png') });
    console.log('📸 Captured docs/showcase-v3-compact-contact.png');

    // Test 7: Runtime Console Errors
    console.log('\n--- Test 7: Runtime Console Errors ---');
    console.log(`Console error count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
      throw new Error(`Encountered ${consoleErrors.length} console errors!`);
    }
    console.log('✅ 0 runtime console errors.');

    // Test 8: All 15 Projects & View Switching
    console.log('\n--- Test 8: 15 Projects, View Switching & Drawer Interaction ---');
    // Switch to Spatial view
    await page.locator('button:has-text("Spatial")').first().click();
    await page.waitForTimeout(200);
    const spatialCards = await page.locator('article').count();
    console.log(`Spatial cards rendered: ${spatialCards}`);
    if (spatialCards !== 15) {
      throw new Error(`Expected 15 projects in Spatial view, found ${spatialCards}`);
    }

    // Switch to Index view
    await page.locator('button:has-text("Index")').first().click();
    await page.waitForTimeout(200);
    const indexRows = await page.locator('.divide-y > div').count();
    console.log(`Index rows rendered: ${indexRows}`);
    if (indexRows !== 15) {
      throw new Error(`Expected 15 projects in Index view, found ${indexRows}`);
    }

    // Test Search Functionality
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('Memories');
    await page.waitForTimeout(200);
    const searchFilteredRows = await page.locator('.divide-y > div').count();
    console.log(`Search for "Memories" returned ${searchFilteredRows} projects`);
    if (searchFilteredRows !== 1) {
      throw new Error(`Expected 1 result for "Memories", found ${searchFilteredRows}`);
    }

    // Open Drawer
    const detailsBtn = page.locator('button:has-text("Details")').first();
    await detailsBtn.click();
    await page.waitForTimeout(200);
    const drawer = page.locator('[role="dialog"]');
    if (!(await drawer.isVisible())) {
      throw new Error('Project drawer failed to open!');
    }
    console.log('✅ Project drawer opened successfully');

    // Close Drawer via Close button
    const closeBtn = drawer.locator('button[aria-label="Close"]');
    await closeBtn.click();
    await page.waitForTimeout(200);
    if (await drawer.isVisible()) {
      throw new Error('Project drawer failed to close!');
    }
    console.log('✅ Project drawer closed successfully');

    // Clear search
    await searchInput.fill('');
    await page.waitForTimeout(200);

    console.log('\n🎉 ALL BRAND, 15-PROJECTS & COMPACT QA TESTS PASSED!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTests().catch(err => {
  console.error('\n❌ QA Test Suite Failed:', err);
  process.exit(1);
});
