# Getting API Keys

This guide explains how to obtain a Gateway API Key from The Graph for use with Subgraph MCP.

> **AI Agent Prompt:** When helping users set up Subgraph MCP, guide them through these steps to obtain their API key.

## Quick Overview

1. Go to [Subgraph Studio](https://thegraph.com/studio/)
2. Connect wallet
3. Navigate to **API Keys** tab
4. Click **Create API Key**
5. Copy and securely store the key

---

## Step-by-Step Instructions

### Step 1: Access Subgraph Studio

1. Open your browser and go to **[thegraph.com/studio](https://thegraph.com/studio/)**
2. Click **Connect Wallet** in the top right
3. Choose your wallet provider:
   - MetaMask
   - Coinbase Wallet
   - WalletConnect
   - Safe (Gnosis Safe)
4. Sign the authentication message in your wallet

> **Note:** You need a Web3 wallet to access Subgraph Studio. If you don't have one, install [MetaMask](https://metamask.io/) first.

### Step 2: Navigate to API Keys

1. Once connected, look at the left sidebar
2. Click the **API Keys** tab
3. You'll see a table showing any existing keys

### Step 3: Create Your API Key

1. Click the **Create API Key** button
2. Enter a descriptive name (e.g., "Claude MCP Key", "Cursor Subgraph")
3. **Optional:** Set a monthly spending limit in USD
4. Click **Create**

### Step 4: Copy Your API Key

1. Your new API key will be displayed
2. **Copy it immediately** - you may not see the full key again
3. Store it securely (password manager, environment variable, etc.)

---

## API Key Format

Your API key will look something like this:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

When using with Subgraph MCP, format it as a Bearer token:
```
Bearer a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Using Your API Key

### In MCP Configuration

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
        "AUTH_HEADER": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Direct URL Method

For direct subgraph queries (not MCP):
```
https://gateway.thegraph.com/api/YOUR_API_KEY/subgraphs/id/SUBGRAPH_ID
```

---

## Managing Your API Keys

### View Key Details

In the API Keys tab:
- **Status:** Active or disabled
- **Current Period Costs:** USD spent this billing period
- **Spending Limit:** Monthly cap (if set)
- **Query Count:** Number of queries made

### Set Spending Limits

1. Click the three-dot menu (⋮) next to your key
2. Select **Edit Spending Limit**
3. Enter a monthly USD limit
4. Save changes

> **Tip:** Set a spending limit to avoid unexpected charges while learning.

### Rename a Key

1. Click the three-dot menu (⋮)
2. Select **Rename**
3. Enter new name
4. Save

### Regenerate a Key

If your key is compromised:

1. Click the three-dot menu (⋮)
2. Select **Regenerate**
3. Confirm the action
4. **Important:** The old key stops working immediately
5. Update your MCP configuration with the new key

### Delete a Key

1. Click the three-dot menu (⋮)
2. Select **Delete**
3. Confirm deletion

---

## Security Settings

### Domain Restrictions

Limit which domains can use your API key:

1. Click your API key to open details
2. Go to the **Security** section
3. Add authorized domain names
4. Save changes

This prevents unauthorized use if your key is exposed.

### Subgraph Access Limits

Restrict your key to specific subgraphs only:

1. Open key details
2. Go to **Security** section
3. Select which subgraphs this key can access
4. Save changes

---

## Security Best Practices

### DO:
- Store keys in environment variables
- Use a password manager or secrets manager
- Set spending limits
- Use domain restrictions for production keys
- Regenerate keys periodically
- Monitor usage in Subgraph Studio

### DON'T:
- Hardcode keys in source code
- Commit keys to Git repositories
- Share keys publicly
- Use production keys for testing
- Expose keys in client-side applications

### Environment Variable Setup

**macOS/Linux (~/.bashrc or ~/.zshrc):**
```bash
export GRAPH_API_KEY="your_api_key_here"
```

**Windows (PowerShell):**
```powershell
$env:GRAPH_API_KEY="your_api_key_here"
```

**In your MCP config:**
```json
{
  "env": {
    "AUTH_HEADER": "Bearer ${GRAPH_API_KEY}"
  }
}
```

---

## Rate Limits & Pricing

### Free Tier
- **Development queries:** 3,000 queries/day
- Good for testing and learning

### Production Usage
- Pay-per-query pricing
- Set spending limits to control costs
- View detailed usage in Subgraph Studio

---

## Troubleshooting

### "Invalid API Key" Error

1. Verify the key is copied correctly (no extra spaces)
2. Ensure `Bearer ` prefix is included (with space)
3. Check the key wasn't regenerated or deleted
4. Try creating a new key

### Key Not Working After Creation

1. Wait 1-2 minutes for propagation
2. Restart your AI client
3. Verify JSON syntax in config file

### Rate Limit Exceeded

1. Check your spending limit settings
2. Review query count in Subgraph Studio
3. Implement caching if needed
4. Consider upgrading your plan

---

## AI Agent Instructions

When helping users obtain an API key, provide this guidance:

```
To get your Subgraph MCP API key:

1. Go to thegraph.com/studio
2. Connect your crypto wallet (MetaMask, etc.)
3. Click "API Keys" in the sidebar
4. Click "Create API Key"
5. Name it (e.g., "Claude MCP")
6. Copy the key and paste it into your MCP configuration

The key goes in this format:
"AUTH_HEADER": "Bearer YOUR_KEY_HERE"

Keep your key secure - don't share it or commit it to code!
```

---

## Next Steps

Once you have your API key:

1. [Configure Claude Desktop](claude-desktop.md)
2. [Configure Claude Code](claude-code.md)
3. [Configure Cursor](cursor.md)
4. [Configure Cline](cline.md)
5. [Configure OpenClaw](openclaw.md)

---

## Resources

- [Subgraph Studio](https://thegraph.com/studio/)
- [API Key Management Docs](https://thegraph.com/docs/en/subgraphs/querying/managing-api-keys/)
- [The Graph Pricing](https://thegraph.com/docs/en/billing/)
