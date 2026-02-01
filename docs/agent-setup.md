# Agent-Assisted Setup

> **For AI Agents:** Use this guide to help users set up Subgraph MCP automatically.

When a user says they want to use Subgraph MCP but doesn't know how, follow this interactive setup flow.

---

## Detection Flow

First, detect which AI client the user is running:

```
I can help you set up Subgraph MCP! Which AI client are you using?

1. Claude Desktop (Mac/Windows/Linux app)
2. Claude Code (CLI/terminal)
3. Cursor (IDE)
4. Cline (VS Code extension)
5. OpenClaw (multi-channel assistant)
6. I'm not sure
```

If they say "I'm not sure", ask:
- "Are you using a desktop app, terminal, or IDE?"
- "What did you type or click to start this conversation?"

---

## Step 1: Check Prerequisites

Ask the user to verify:

```
Before we start, let's check you have what you need:

1. Do you have Node.js installed?
   (Run `node --version` in terminal - should be 18+)

2. Do you have a crypto wallet like MetaMask?
   (Needed to get your API key)

Let me know if you need help with either of these.
```

**If no Node.js:**
```
You need Node.js to run the MCP server. Install it from:
https://nodejs.org/

Download the LTS version, install it, then restart your terminal and come back.
```

**If no wallet:**
```
You need a crypto wallet to sign into Subgraph Studio. The easiest option:

1. Install MetaMask: https://metamask.io/
2. Create a new wallet (save your seed phrase securely!)
3. Come back when ready

Note: You don't need any crypto funds - the wallet is just for authentication.
```

---

## Step 2: Get API Key

Guide them through getting an API key:

```
Now let's get your API key:

1. Open this link: https://thegraph.com/studio/
2. Click "Connect Wallet" (top right)
3. Select your wallet and sign the message
4. Click "API Keys" in the left sidebar
5. Click "Create API Key"
6. Name it something like "Claude MCP"
7. Click Create
8. COPY THE KEY and paste it here (I'll help you configure it)

Don't worry - I won't store your key anywhere, just help you put it in the right config file.
```

---

## Step 3: Auto-Configure (Agent Executes)

Once you have the API key, offer to configure automatically:

```
I have your API key. I can set this up for you automatically.

Should I add Subgraph MCP to your [CLIENT_NAME] configuration?
- Yes, set it up for me
- No, show me the manual steps
```

### If Yes - Claude Desktop (macOS)

```bash
# Check if config exists
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json 2>/dev/null || echo "{}"
```

Then create/update the config:

```json
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "--header",
        "Authorization:${AUTH_HEADER}",
        "https://subgraphs.mcp.thegraph.com/sse"
      ],
      "env": {
        "AUTH_HEADER": "Bearer USER_API_KEY_HERE"
      }
    }
  }
}
```

### If Yes - Claude Desktop (Windows)

Config path: `%APPDATA%\Claude\claude_desktop_config.json`

### If Yes - Claude Desktop (Linux)

Config path: `~/.config/Claude/claude_desktop_config.json`

### If Yes - Claude Code

```bash
# Check existing config
cat ~/.claude/settings.json 2>/dev/null || echo "{}"
```

Update `~/.claude/settings.json` with the mcpServers block.

### If Yes - Cursor

```bash
# Check existing config
cat ~/.cursor/mcp.json 2>/dev/null || echo "{}"
```

Update `~/.cursor/mcp.json` with the mcpServers block.

### If Yes - Cline

Guide user to: MCP Servers > Installed > Configure MCP Servers

### If Yes - OpenClaw

```bash
# Check existing config
cat ~/.openclaw/openclaw.json 2>/dev/null || echo "{}"
```

---

## Step 4: Verify Setup

After configuration:

```
Setup complete! Now:

1. Completely quit [CLIENT_NAME] (not just close the window)
2. Reopen [CLIENT_NAME]
3. Start a new conversation
4. Try asking: "Find subgraphs related to Uniswap"

If it works, you'll see subgraph search results!
If not, let me know the error and I'll help troubleshoot.
```

---

## Troubleshooting Prompts

**If "MCP not found":**
```
The MCP server isn't connecting. Let's check:

1. Is Node.js installed? Run: node --version
2. Is npx available? Run: which npx
3. Did you restart [CLIENT_NAME] completely?

If npx isn't found, we may need to use the full path. Run:
which npx

And tell me what it shows.
```

**If "Invalid API Key":**
```
The API key isn't working. Let's verify:

1. Go to https://thegraph.com/studio/
2. Click API Keys
3. Check if your key is still there
4. If needed, create a new one and we'll update the config
```

**If config file doesn't exist:**
```
The config file doesn't exist yet. I'll create it for you.
This is normal for first-time setup.
```

---

## Quick Setup Commands

For agents that can execute commands, here are one-liners:

### Claude Desktop (macOS)
```bash
mkdir -p ~/Library/Application\ Support/Claude && cat > ~/Library/Application\ Support/Claude/claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": ["mcp-remote", "--header", "Authorization:${AUTH_HEADER}", "https://subgraphs.mcp.thegraph.com/sse"],
      "env": { "AUTH_HEADER": "Bearer YOUR_API_KEY" }
    }
  }
}
EOF
```

### Claude Code
```bash
mkdir -p ~/.claude && cat > ~/.claude/settings.json << 'EOF'
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": ["mcp-remote", "--header", "Authorization:${AUTH_HEADER}", "https://subgraphs.mcp.thegraph.com/sse"],
      "env": { "AUTH_HEADER": "Bearer YOUR_API_KEY" }
    }
  }
}
EOF
```

### Cursor
```bash
mkdir -p ~/.cursor && cat > ~/.cursor/mcp.json << 'EOF'
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": ["mcp-remote", "--header", "Authorization:${AUTH_HEADER}", "https://subgraphs.mcp.thegraph.com/sse"],
      "env": { "AUTH_HEADER": "Bearer YOUR_API_KEY" }
    }
  }
}
EOF
```

---

## Post-Setup Success Message

```
You're all set! You now have access to 15,000+ blockchain subgraphs.

Try these queries:
- "Find Uniswap V3 subgraphs"
- "Show me the ENS subgraph schema"
- "Query the top DeFi protocols by TVL"

Need the full list of what you can do? Check:
https://github.com/PaulieB14/subgraph-mcp-skills/blob/main/examples/queries.md
```

---

## Agent Behavior Guidelines

1. **Be patient** - Users may not know technical terms
2. **Confirm before writing** - Always ask before modifying config files
3. **Backup existing configs** - If a config exists, preserve existing mcpServers
4. **Never log API keys** - Don't echo or store the user's API key
5. **Test the connection** - After setup, verify with a simple query
