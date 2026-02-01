# Cline Setup

Configure Cline (VS Code extension) to use Subgraph MCP for blockchain data queries.

## Prerequisites

- [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) extension (latest version)
- VS Code installed
- Node.js 18+ installed
- `npx` or `bunx` available in your PATH
- Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

## Installation

### Step 1: Access MCP Settings

1. Open VS Code
2. Open the Cline extension panel
3. Navigate to **MCP Servers** > **Installed**
4. Click **Configure MCP Servers**

This will open or create your `cline_mcp_settings.json` file.

### Step 2: Add MCP Configuration

Add the following configuration:

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

### Step 4: Restart and Activate

1. Save the configuration file
2. Restart Cline (or reload VS Code window)
3. Start a fresh conversation
4. Enable the Subgraph MCP from the context menu
5. Add **"Subgraph Server Instructions"** as a resource in your chat context

## Using Subgraph MCP

### Enable for Each Session

1. Open Cline chat panel
2. Click the context menu (typically + or attachment icon)
3. Enable "Subgraph MCP"
4. Add "Subgraph Server Instructions" resource

### Example Queries

```
Find subgraphs for the contract address in my current file

Show me the GraphQL schema for the Compound V3 subgraph

Generate a query to get all token transfers for a specific address

What subgraphs are available for Polygon network?

Help me understand the ENS subgraph schema and write queries for it
```

## Full Configuration with Token API

Add both servers:

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

## Available Tools

| Tool | Description |
|------|-------------|
| Schema Retrieval | Get GraphQL schemas by deployment ID, Subgraph ID, or IPFS hash |
| Query Execution | Run GraphQL queries against any subgraph deployment |
| Subgraph Discovery | Search and rank subgraphs by keyword or contract |
| Usage Analytics | Get 30-day query volumes for deployments |

## Cline-Specific Features

### Autonomous Mode

Cline can autonomously:
1. Search for relevant subgraphs
2. Fetch schemas
3. Generate and execute queries
4. Integrate results into your code

### Context-Aware Development

Reference your workspace:

```
Look at my smart contract file and find subgraphs that index similar contracts.
Then help me write integration code.
```

### Code Generation

```
Generate a complete TypeScript service class that:
1. Queries the Uniswap V3 subgraph for pool data
2. Handles pagination
3. Includes error handling
4. Has proper TypeScript types
```

## Troubleshooting

### Enable Verbose Logging

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

**MCP server not appearing:**
- Verify JSON syntax is valid
- Reload VS Code window (Cmd/Ctrl + Shift + P > "Reload Window")
- Check Cline's MCP Servers panel for errors

**"Command not found" error:**
- Use the full path to `npx`:
  ```bash
  which npx
  ```
- Update config with full path:
  ```json
  "command": "/usr/local/bin/npx"
  ```

**Authentication errors:**
- Verify API key is correct
- Check for extra whitespace
- Regenerate key in Subgraph Studio

**Server keeps disconnecting:**
- Check internet connection
- Verify endpoint URL is correct
- Try restarting VS Code

### Verify Configuration

```bash
# Check Node.js version
node --version  # Should be 18+

# Check npx
which npx

# Validate JSON syntax (if you have jq installed)
cat path/to/cline_mcp_settings.json | jq .
```

## Development Workflow Examples

### Smart Contract Development

```
I'm writing a lending protocol. Help me:
1. Find existing lending subgraphs (Aave, Compound)
2. Understand their schema patterns
3. Design a similar schema for my protocol
4. Generate subgraph mapping code
```

### Frontend Integration

```
I need to display user's DeFi positions. Find and query:
- Uniswap LP positions
- Aave deposits and borrows
- Staking positions

Generate React hooks for each data source.
```

### Data Pipeline

```
Create a data pipeline that:
1. Queries multiple subgraphs for DEX volume data
2. Aggregates the results
3. Formats for a dashboard display
```

## Working with Multiple Subgraphs

### Cross-Protocol Analysis

```
Compare the schemas of Uniswap V2 vs V3 subgraphs.
What are the key differences in how they track liquidity?
```

### Multi-Chain Queries

```
Find the Aave subgraph deployments across:
- Ethereum mainnet
- Polygon
- Arbitrum

Show me how to query all three.
```

## Next Steps

- [Try example queries](../examples/queries.md)
- [Configure Token API](token-api-mcp.md)
- [View subgraph skills](../skills/subgraph-skills.md)
