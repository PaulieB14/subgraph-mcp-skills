# Subgraph MCP Skills

> **Give your AI agents access to 15,000+ blockchain subgraphs through natural language**

This repository provides comprehensive documentation and skills for integrating [The Graph's](https://thegraph.com/) Subgraph MCP (Model Context Protocol) into AI agents. Query blockchain data conversationally without writing GraphQL.

## What is Subgraph MCP?

Subgraph MCP is an open-source implementation of [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) that connects AI assistants to The Graph's decentralized data network. It enables:

- **Schema Discovery** - Access GraphQL schemas for any subgraph on The Graph Network
- **Query Execution** - Run GraphQL queries on any subgraph deployment
- **Subgraph Search** - Find subgraphs by keyword or contract address
- **Usage Analytics** - Retrieve 30-day query volumes for deployments
- **Natural Language** - Ask questions about blockchain data without writing GraphQL

## Quick Start

### Need Help? Let an AI Agent Set It Up!

If you're not sure how to configure MCP, just ask your AI assistant:

```
"Help me set up Subgraph MCP"
```

The agent can walk you through the entire setup process interactively, including getting your API key and configuring your client. See [Agent-Assisted Setup](docs/agent-setup.md) for how this works.

### Manual Setup

#### 1. Get Your API Key

1. Go to [Subgraph Studio](https://thegraph.com/studio/)
2. Connect your wallet (MetaMask, Coinbase Wallet, WalletConnect, or Safe)
3. Navigate to **API Keys** tab
4. Click **Create API Key**
5. Name your key and save it securely

> See [Getting API Keys](docs/getting-api-keys.md) for detailed instructions.

#### 2. Configure Your AI Client

Choose your AI client and follow the setup guide:

| Client | Guide | Config File |
|--------|-------|-------------|
| Claude Desktop | [Setup Guide](docs/claude-desktop.md) | `claude_desktop_config.json` |
| Claude Code (CLI) | [Setup Guide](docs/claude-code.md) | `~/.claude/settings.json` |
| Cursor | [Setup Guide](docs/cursor.md) | `~/.cursor/mcp.json` |
| Cline | [Setup Guide](docs/cline.md) | `cline_mcp_settings.json` |
| OpenClaw | [Setup Guide](docs/openclaw.md) | `~/.openclaw/openclaw.json` |

#### 3. Basic Configuration

Add this to your MCP config file (replace `YOUR_API_KEY`):

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
        "AUTH_HEADER": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

## Subgraph MCP Server

**Endpoint:** `https://subgraphs.mcp.thegraph.com/sse`

**Authentication:** Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

**Access:** 15,000+ subgraphs covering DeFi, NFTs, DAOs, governance, and more

### Available Tools

| Tool | Description |
|------|-------------|
| `get_schema` | Retrieve GraphQL schema by deployment ID, Subgraph ID, or IPFS hash |
| `execute_query` | Run GraphQL queries against any subgraph deployment |
| `search_subgraphs` | Find subgraphs by keyword or contract address |
| `get_subgraph_info` | Get metadata and deployment details |
| `get_query_volume` | Retrieve 30-day query statistics |

## Querying Subgraphs

### You Don't Need to Know Deployment IDs!

Just describe what you want in natural language:

```
"Find Uniswap subgraphs and show me the top pools"
"Search for lending protocol subgraphs"
"What subgraphs track ENS domains?"
```

The AI will search The Graph Network and find the right subgraph for you.

### Or Use Specific Deployment IDs (Optional)

For precise control, you can specify a deployment ID:

```
"Query subgraph 5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV for top 10 pools"
```

See [Popular Subgraphs](docs/popular-subgraphs.md) for common deployment IDs.

### Example Queries

```
"What are the top Uniswap V3 pools by volume?"

"Show me the GraphQL schema for the ENS subgraph"

"Find subgraphs related to Aave lending protocol"

"What's the 30-day query volume for the Compound subgraph?"

"Search for subgraphs that index contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
```

See [Example Queries](examples/queries.md) for 100+ more examples.

## AI Agent Skills

This repo includes skill definitions for integrating subgraph capabilities into AI agent frameworks:

- [Subgraph Skills](skills/subgraph-skills.md) - Core skill definitions and prompts

## Documentation

| Document | Description |
|----------|-------------|
| [Agent-Assisted Setup](docs/agent-setup.md) | Let an AI agent configure MCP for you |
| [Getting API Keys](docs/getting-api-keys.md) | How to obtain and manage API keys |
| [Popular Subgraphs](docs/popular-subgraphs.md) | Common subgraph deployment IDs |
| [Claude Desktop Setup](docs/claude-desktop.md) | Configure Claude Desktop app |
| [Claude Code Setup](docs/claude-code.md) | Configure Claude Code CLI |
| [Cursor Setup](docs/cursor.md) | Configure Cursor IDE |
| [Cline Setup](docs/cline.md) | Configure Cline extension |
| [OpenClaw Setup](docs/openclaw.md) | Configure OpenClaw multi-channel assistant |
| [Troubleshooting](docs/troubleshooting.md) | Common issues and solutions |

## Prerequisites

- **Node.js 18+** installed and in your PATH (Node 22+ for OpenClaw)
- **npx** or **bunx** available
- **Wallet** for signing into Subgraph Studio (MetaMask, etc.)
- **AI Client** - Claude Desktop, Claude Code, Cursor, Cline, or OpenClaw

## Security Best Practices

- Store API keys in environment variables, never hardcode
- Use domain restrictions in Subgraph Studio
- Set spending limits on API keys
- Regenerate keys if compromised

## Resources

- [The Graph Documentation](https://thegraph.com/docs/)
- [AI Suite Introduction](https://thegraph.com/docs/en/ai-suite/ai-introduction/)
- [Subgraph MCP Source Code](https://github.com/graphops/subgraph-mcp)
- [Subgraph Studio](https://thegraph.com/studio/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [MCP Protocol Spec](https://modelcontextprotocol.io/)
- [OpenClaw](https://github.com/openclaw/openclaw)

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT
