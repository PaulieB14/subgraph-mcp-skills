# Cursor IDE Setup

Configure Cursor IDE to use Subgraph MCP for blockchain data queries while coding.

## Prerequisites

- [Cursor IDE](https://www.cursor.com/) (latest version)
- Node.js 18+ installed
- `npx` or `bunx` available in your PATH
- Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

## Installation

### Step 1: Access MCP Settings

1. Open Cursor IDE
2. Go to **Cursor Settings** (Cmd/Ctrl + ,)
3. Navigate to **MCP** section
4. Click **Add new global MCP Server**

### Step 2: Edit Configuration File

Open or create the MCP configuration file:

```bash
# macOS/Linux
nano ~/.cursor/mcp.json

# Or locate via Cursor
# Settings > MCP > Open Config File
```

### Step 3: Add MCP Configuration

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

### Step 4: Insert Your API Key

Replace `YOUR_GATEWAY_API_KEY` with your actual API key from Subgraph Studio.

### Step 5: Restart Cursor

1. Save the configuration file
2. Completely quit Cursor
3. Reopen Cursor
4. Start a fresh chat session

## Using Subgraph MCP in Cursor

### Activate in Chat

1. Open Cursor's AI chat (Cmd/Ctrl + L)
2. Start a new conversation
3. The subgraph tools should be available automatically

### Example Queries

Try these in Cursor's chat:

```
Find subgraphs related to the smart contract I'm working with

Show me the GraphQL schema for Uniswap V3

Generate code to query the ENS subgraph using ethers.js

What subgraphs track ERC-721 NFT transfers?

Help me write a GraphQL query for Aave lending positions
```

## Full Configuration with Token API

Add both servers for comprehensive blockchain data access:

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

Once configured, these tools become available:

| Tool | Description |
|------|-------------|
| Schema Retrieval | Get GraphQL schemas by deployment ID, Subgraph ID, or IPFS hash |
| Query Execution | Run GraphQL queries against any subgraph deployment |
| Subgraph Discovery | Search and rank subgraphs by keyword or contract |
| Usage Analytics | Get 30-day query volumes for deployments |

## Cursor-Specific Tips

### Inline Code Generation

Ask Cursor to generate code that queries subgraphs:

```
Generate a TypeScript function that queries the Uniswap V3 subgraph
to get the top 10 pools by TVL
```

### Context-Aware Queries

Reference your open files:

```
Based on the contract address in my current file, find relevant subgraphs
and show me how to query them
```

### Documentation Lookup

```
Explain the schema for the ENS subgraph and how each entity relates
```

## Troubleshooting

### Verify MCP Connection

In Cursor Settings > MCP, you should see:
- Green status indicator for "subgraph" server
- No error messages

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

**Server not connecting:**
- Verify JSON syntax is valid
- Restart Cursor completely
- Check MCP section in settings for errors

**"npx not found":**
- Use the full path: `which npx`
- Example: `/usr/local/bin/npx`

**Authentication errors:**
- Verify API key is correct
- Check for extra spaces or quotes
- Regenerate key in Subgraph Studio if needed

### Using bunx Instead of npx

If you prefer Bun:

```json
{
  "mcpServers": {
    "subgraph": {
      "command": "bunx",
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

## Development Workflow Examples

### Building a DeFi Dashboard

```
I'm building a DeFi portfolio tracker. Help me:
1. Find subgraphs for Uniswap, Aave, and Compound
2. Show the schemas for position/balance data
3. Generate TypeScript code to query user positions
```

### NFT Project Development

```
For my NFT marketplace, find subgraphs that:
- Track ERC-721 transfers
- Index NFT metadata
- Monitor floor prices

Show me the schemas and example queries.
```

### Analytics Application

```
I need to build a blockchain analytics tool. Query the top 10 subgraphs
by usage volume and show me what data each provides.
```

## Next Steps

- [Try example queries](../examples/queries.md)
- [Configure Token API](token-api-mcp.md)
- [View subgraph skills](../skills/subgraph-skills.md)
