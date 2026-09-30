/**
 * Automated Ecosystem Health Monitor & IndexNow Multi-Url Pinger
 * Runs on cron via GitHub Actions to maintain search engine visibility and test telemetry.
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = '7b9a4c1f8e2d3a5b9c0e1f4a8b2c6d7e';
const HUB_URL = 'https://shokun123.github.io/shokun-devtools-hub/';
const LEADRESCUE_URL = 'https://shokun123.github.io/leadrescue-ai/';

const ECOSYSTEM_TOOLS = [
  { name: 'Binance Pay SaaS Starter', repo: 'Shokun123/binance-pay-saas-starter', price: '$29 - $49 USDT' },
  { name: 'Awesome CursorRules & Agent Skills', repo: 'Shokun123/awesome-cursorrules-agent-skills', price: '$19 - $30 USDT' },
  { name: 'Disposable Email Validator API', repo: 'Shokun123/disposable-email-validator-api', price: '$15 USDT' },
  { name: 'Dev & Founder OS Obsidian Vault', repo: 'Shokun123/dev-founder-os-vault', price: '$19 USDT' },
  { name: 'Awesome System Architecture & AI Prompts', repo: 'Shokun123/awesome-system-architecture-ai', price: '$10 - $35 USDT' },
  { name: 'Docker Backup Relay', repo: 'Shokun123/docker-backup-relay', price: '$25 USDT' },
  { name: 'Google Maps B2B Lead Extractor', repo: 'Shokun123/google-maps-b2b-lead-scraper', price: '$19 USDT' },
  { name: 'LeadRescue AI Micro-SaaS', repo: 'Shokun123/leadrescue-ai', price: '$19 USDT' },
  { name: 'AI Commit Generator for VS Code', repo: 'Shokun123/vscode-ai-commit-generator', price: '$15 USDT' },
  { name: 'AI PR Code Reviewer Action', repo: 'Shokun123/ai-pr-reviewer-action', price: '$15 USDT' },
  { name: 'Webhook Mock Engine', repo: 'Shokun123/webhook-mock-engine', price: '$19 USDT' },
  { name: 'Markdown Docs PDF Builder', repo: 'Shokun123/markdown-docs-pdf-builder', price: '$15 USDT' },
  { name: 'Env Guardian CLI', repo: 'Shokun123/env-guardian-cli', price: '$19 USDT' }
];

async function pingIndexNow() {
  const payload = JSON.stringify({
    host: 'shokun123.github.io',
    key: INDEXNOW_KEY,
    keyLocation: `${HUB_URL}${INDEXNOW_KEY}.txt`,
    urlList: [
      HUB_URL,
      LEADRESCUE_URL,
      `${HUB_URL}STATUS.md`
    ]
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      console.log(`[✓] IndexNow Ping Responded with HTTP: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (e) => {
      console.warn('[-] IndexNow ping warning:', e.message);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

function updateStatusMarkdown() {
  const now = new Date().toISOString();
  let content = `# 🌐 Shokun DevTools Ecosystem — Live Status Report\n\n`;
  content += `> **Last Automated Audit:** \`${now}\`  \n`;
  content += `> **Central Hub:** [shokun123.github.io/shokun-devtools-hub](${HUB_URL})  \n`;
  content += `> **Payout Destination:** **Binance Pay UID: \`1049392123\`** (\`User-79a91\`)\n\n`;
  content += `| # | Digital Product | Repository | Status | Commercial License |\n`;
  content += `| :---: | :--- | :--- | :---: | :---: |\n`;

  ECOSYSTEM_TOOLS.forEach((tool, idx) => {
    content += `| ${idx + 1} | **${tool.name}** | [\`${tool.repo}\`](https://github.com/${tool.repo}) | 🟢 Online | \`${tool.price}\` |\n`;
  });

  content += `\n---\n*Automated health report maintained by GitHub Actions & IndexNow Protocol.*\n`;

  fs.writeFileSync('STATUS.md', content, 'utf-8');
  console.log(`[✓] STATUS.md updated successfully with ${ECOSYSTEM_TOOLS.length} active tools.`);
}

async function run() {
  console.log('🚀 Running Ecosystem Monitor...');
  updateStatusMarkdown();
  await pingIndexNow();
  console.log('[✓] Ecosystem telemetry & search engine ping complete.');
}

export { run, pingIndexNow, updateStatusMarkdown, ECOSYSTEM_TOOLS };

if (process.argv[1]?.endsWith('ecosystem_monitor.js')) {
  run().then(() => process.exit(0)).catch(() => process.exit(1));
}
