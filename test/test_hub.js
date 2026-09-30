import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { ECOSYSTEM_TOOLS, updateStatusMarkdown } from '../ecosystem_monitor.js';

test('Shokun DevTools Hub - Integration & Telemetry Tests', async (t) => {
  await t.test('ECOSYSTEM_TOOLS tracks exactly 10 production assets', () => {
    assert.equal(ECOSYSTEM_TOOLS.length, 10);
    const names = ECOSYSTEM_TOOLS.map(t => t.name);
    assert.ok(names.includes('Binance Pay SaaS Starter'));
    assert.ok(names.includes('Awesome CursorRules & Agent Skills'));
    assert.ok(names.includes('Disposable Email Validator API'));
    assert.ok(names.includes('Dev & Founder OS Obsidian Vault'));
    assert.ok(names.includes('Docker Backup Relay'));
    assert.ok(names.includes('AI Commit Generator for VS Code'));
  });

  await t.test('index.html contains Binance UID 1049392123 and all tool names', () => {
    const htmlPath = path.join(process.cwd(), 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    assert.ok(html.includes('1049392123'), 'Must contain Binance UID 1049392123');
    assert.ok(html.includes('User-79a91'), 'Must contain Binance Username');
    for (const tool of ECOSYSTEM_TOOLS) {
      assert.ok(html.includes(tool.repo), `HTML must reference ${tool.repo}`);
    }
  });

  await t.test('updateStatusMarkdown successfully generates STATUS.md', () => {
    updateStatusMarkdown();
    const statusPath = path.join(process.cwd(), 'STATUS.md');
    assert.ok(fs.existsSync(statusPath), 'STATUS.md must be generated');
    const statusText = fs.readFileSync(statusPath, 'utf-8');
    assert.ok(statusText.includes('1049392123'));
    assert.ok(statusText.includes('Online'));
  });
});
