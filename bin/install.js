#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const HOME = process.env.HOME || process.env.USERPROFILE || os.homedir();
const SKILLS_SRC = path.join(__dirname, "..", "skills");

function resolveDir(p) {
  return path.resolve(p.replace(/^~($|\/)/, HOME + "$1"));
}

function parseArgs() {
  const args = process.argv.slice(2);
  let targetDir = null;
  let claude = false, cursor = false, gemini = false, codex = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--help" || args[i] === "-h") return { help: true };
    if (args[i] === "--claude")  { claude = true; continue; }
    if (args[i] === "--cursor")  { cursor = true; continue; }
    if (args[i] === "--gemini")  { gemini = true; continue; }
    if (args[i] === "--codex")   { codex = true; continue; }
    if (args[i] === "--path" && args[i + 1]) { targetDir = args[++i]; continue; }
  }

  if (!targetDir) {
    if (claude)  targetDir = ".claude/skills";
    else if (cursor)  targetDir = ".cursor/skills";
    else if (gemini)  targetDir = ".gemini/skills";
    else if (codex)   targetDir = ".codex/skills";
    else              targetDir = ".claude/skills"; // default
  }

  return { targetDir, help: false };
}

function copySkills(destDir) {
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(SKILLS_SRC);
  let count = 0;

  for (const entry of entries) {
    const srcPath = path.join(SKILLS_SRC, entry);

    // Skip non-directories (e.g. subgraph-skills.md at root of skills/)
    if (!fs.statSync(srcPath).isDirectory()) continue;

    const destSkillDir = path.join(destDir, entry);
    fs.mkdirSync(destSkillDir, { recursive: true });

    const files = fs.readdirSync(srcPath);
    for (const file of files) {
      fs.copyFileSync(
        path.join(srcPath, file),
        path.join(destSkillDir, file)
      );
    }
    count++;
  }
  return count;
}

function printHelp() {
  console.log(`
subgraph-mcp-skills — Install The Graph MCP querying skills

Usage:
  npx subgraph-mcp-skills [options]

Options:
  --claude    Install to .claude/skills/ (default)
  --cursor    Install to .cursor/skills/
  --gemini    Install to .gemini/skills/
  --codex     Install to .codex/skills/
  --path DIR  Install to a custom directory
  --help      Show this help

Skills included:
  subgraph-mcp  Query subgraphs via The Graph MCP tools

Examples:
  npx subgraph-mcp-skills --claude
  npx subgraph-mcp-skills --cursor
  npx subgraph-mcp-skills --path ~/.my-agent/skills
`);
}

const { help, targetDir } = parseArgs();

if (help) {
  printHelp();
  process.exit(0);
}

const dest = resolveDir(targetDir);
console.log(`\nInstalling subgraph-mcp-skills to ${dest}...\n`);

try {
  const count = copySkills(dest);
  console.log(`✓ Installed ${count} skill(s) to ${dest}`);
  console.log(`\nSkills ready! Use them in Claude Code:`);
  console.log(`  "Query the Uniswap V3 subgraph for recent swaps"`);
  console.log(`  "Find the most active subgraph for Aave"`);
  console.log(`  "Get the schema for a subgraph by IPFS hash"\n`);
} catch (err) {
  console.error(`✗ Installation failed: ${err.message}`);
  process.exit(1);
}
