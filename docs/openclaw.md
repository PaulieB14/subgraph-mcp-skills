# OpenClaw Setup

Configure [OpenClaw](https://github.com/openclaw/openclaw) to use Subgraph MCP for blockchain data queries across all your messaging channels.

## What is OpenClaw?

OpenClaw is a personal AI assistant that runs on your own devices. It connects to multiple messaging services (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, and more) while keeping you in control through a local Gateway.

## Prerequisites

- [OpenClaw](https://github.com/openclaw/openclaw) installed (`npm install -g openclaw@latest`)
- Node.js 22+ installed
- Gateway daemon running
- Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

## Installation

### Step 1: Install OpenClaw (if not already)

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### Step 2: Locate Configuration File

OpenClaw configuration is at:

```bash
~/.openclaw/openclaw.json
```

### Step 3: Add MCP Server Configuration

Edit your OpenClaw configuration to include the Subgraph MCP server:

```json
{
  "model": "anthropic/claude-opus-4-5",
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

### Step 4: Insert Your API Key

Replace `YOUR_GATEWAY_API_KEY` with your actual API key from Subgraph Studio.

### Step 5: Restart OpenClaw

```bash
# Restart the daemon
openclaw daemon restart

# Or manually restart
openclaw daemon stop
openclaw daemon start
```

## Using Subgraph MCP with OpenClaw

### Via Any Connected Channel

Once configured, you can query blockchain data from any connected messaging platform:

**WhatsApp/Telegram/Discord:**
```
Find subgraphs related to Uniswap

Show me the ENS subgraph schema

Query top 10 Aave lending positions
```

### Via Web Chat

Access the local web UI and interact with subgraph data:

```bash
# Open web chat
openclaw chat
```

### Via CLI

```bash
openclaw "Find subgraphs for NFT marketplaces"
```

## Example Queries

```
What subgraphs track Ethereum DeFi protocols?

Show me the GraphQL schema for Compound V3

Query the 30-day trading volume from Uniswap V3

Find subgraphs that index contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984

List the most popular subgraphs by query volume
```

## Multi-Channel Use Cases

### DeFi Alerts via Telegram

Configure OpenClaw to:
1. Query subgraphs for price/volume data
2. Send alerts to your Telegram when thresholds are met

### Portfolio Tracking via Discord

Ask your OpenClaw bot in Discord:
```
Query all my positions across Uniswap, Aave, and Compound subgraphs
```

### Team Updates via Slack

Get blockchain data summaries in your team Slack:
```
Generate a daily DeFi market summary from the top subgraphs
```

## Advanced Configuration

### Multiple Workspaces

Route different channels to different agents:

```json
{
  "workspaces": {
    "defi": {
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
  }
}
```

### Environment Variables

For better security:

```bash
# Add to your shell profile
export GRAPH_API_KEY="your_gateway_api_key_here"
```

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

## Troubleshooting

### Check Gateway Status

```bash
openclaw daemon status
```

### View Logs

```bash
openclaw logs
```

### Common Issues

**"MCP server not connecting":**
- Verify JSON syntax in config file
- Restart the OpenClaw daemon
- Check that `npx` is available in PATH

**"Command not found" error:**
- Use full path to npx: `which npx`
- Ensure Node.js 22+ is installed

**Authentication errors:**
- Verify API key is correct
- Check for extra whitespace
- Regenerate key in Subgraph Studio if needed

### Verify Setup

```bash
# Check Node version
node --version  # Should be 22+

# Check npx
which npx

# Validate config JSON
cat ~/.openclaw/openclaw.json | jq .

# Test OpenClaw
openclaw "test"
```

## Skills Integration

OpenClaw supports a skills platform. You can create custom skills for subgraph queries:

```bash
# Create a subgraph skill
openclaw skill create subgraph-query
```

See [Subgraph Skills](../skills/subgraph-skills.md) for skill definitions.

## Security Notes

- OpenClaw runs locally, keeping your API keys on your device
- Default sandbox mode protects group channel interactions
- Store API keys in environment variables, not directly in config

## Next Steps

- [Try example queries](../examples/queries.md)
- [View subgraph skills](../skills/subgraph-skills.md)
- [OpenClaw Documentation](https://github.com/openclaw/openclaw)
