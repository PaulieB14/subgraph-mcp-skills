# Claude Code (CLI) Setup

Configure Claude Code CLI to use Subgraph MCP for blockchain data queries in your terminal.

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/claude/docs/claude-code) installed
- Node.js 18+ installed
- `npx` available in your PATH
- Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

## Installation

### Step 1: Open Settings

Run Claude Code and access settings:

```bash
claude
# Then type: /settings
```

Or edit the settings file directly:

```bash
# macOS/Linux
nano ~/.claude/settings.json

# Or with your preferred editor
code ~/.claude/settings.json
```

### Step 2: Add MCP Configuration

Add the MCP server configuration:

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
        "AUTH_HEADER": "Bearer YOUR_GATEWAY_API_KEY"
      }
    }
  }
}
```

### Step 3: Insert Your API Key

Replace `YOUR_GATEWAY_API_KEY` with your actual API key from Subgraph Studio.

### Step 4: Restart Claude Code

Exit and restart Claude Code for changes to take effect:

```bash
# Exit current session
exit

# Start new session
claude
```

## Using Environment Variables

For better security, use environment variables:

### Step 1: Set Environment Variable

```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
export GRAPH_API_KEY="your_gateway_api_key_here"
```

### Step 2: Update Configuration

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
        "AUTH_HEADER": "Bearer ${GRAPH_API_KEY}"
      }
    }
  }
}
```

## Using Subgraph MCP

### Verify Connection

After setup, ask Claude Code:

```
Can you list the available MCP tools?
```

Or try a subgraph query:

```
Find subgraphs related to Uniswap
```

### Example Queries

```
Query the ENS subgraph for the top 10 most recent domain registrations

Show me the GraphQL schema for the Aave V3 subgraph

Find subgraphs that track NFT marketplaces

What's the 30-day query volume for popular DeFi subgraphs?

Search for subgraphs indexing contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
```

## Full Configuration with Token API

Add both Subgraph MCP and Token API MCP:

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
        "AUTH_HEADER": "Bearer YOUR_GATEWAY_API_KEY"
      }
    },
    "token-api": {
      "command": "npx",
      "args": [
        "@pinax/mcp",
        "--remote-url",
        "https://token-api.mcp.thegraph.com/"
      ],
      "env": {
        "ACCESS_TOKEN": "YOUR_JWT_TOKEN"
      }
    }
  }
}
```

## Project-Specific Configuration

You can also add MCP configuration to a specific project by creating `.claude/settings.json` in your project root:

```bash
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
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
        "AUTH_HEADER": "Bearer YOUR_GATEWAY_API_KEY"
      }
    }
  }
}
EOF
```

## Troubleshooting

### Check MCP Status

In Claude Code, you can check available tools:

```
/mcp
```

### Enable Verbose Logging

Add verbose flag:

```json
{
  "mcpServers": {
    "subgraph": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "--header",
        "Authorization:${AUTH_HEADER}",
        "https://subgraphs.mcp.thegraph.com/sse",
        "--verbose",
        "true"
      ],
      "env": {
        "AUTH_HEADER": "Bearer YOUR_GATEWAY_API_KEY"
      }
    }
  }
}
```

### Common Issues

**"MCP server not found":**
- Verify JSON syntax is valid (`cat ~/.claude/settings.json | jq .`)
- Restart Claude Code completely
- Ensure `npx` is in your PATH

**"npx: command not found":**
- Install Node.js 18+
- Or use the full path: `which npx`

**Authentication errors:**
- Double-check your API key
- Ensure `Bearer ` prefix is present
- Try regenerating your API key

**Timeout errors:**
- Check your internet connection
- Verify endpoint URL is correct
- Some queries on large subgraphs may take longer

### Verify Setup

```bash
# Check Node.js version
node --version  # Should be 18+

# Check npx availability
which npx

# Validate settings JSON
cat ~/.claude/settings.json | jq .
```

## Using with Development Workflows

### Blockchain Development

```
I'm building a DeFi dashboard. Find subgraphs for:
- Uniswap liquidity pools
- Aave lending positions
- Compound supply rates

Then show me example GraphQL queries for each.
```

### Data Analysis

```
Query the Uniswap V3 subgraph to get the top 20 pools by total value locked,
including token symbols and current liquidity.
```

### Smart Contract Integration

```
Find subgraphs that index contract 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
and show me what data is available.
```

## Next Steps

- [Try example queries](../examples/queries.md)
- [Configure Token API](token-api-mcp.md)
- [View subgraph skills](../skills/subgraph-skills.md)
