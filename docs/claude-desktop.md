# Claude Desktop Setup

Configure Claude Desktop to use Subgraph MCP for blockchain data queries.

## Prerequisites

- [Claude Desktop](https://claude.ai/download) (latest version)
- Node.js 18+ installed
- `npx` available in your PATH
- Gateway API Key from [Subgraph Studio](https://thegraph.com/studio/)

## Installation

### Method 1: Using npx (Recommended)

#### Step 1: Open Configuration File

**Via Claude Desktop:**
1. Open Claude Desktop
2. Go to **Settings** > **Developer** > **Edit Config**

**Or manually locate the file:**

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

#### Step 2: Add MCP Configuration

Add the following to your config file:

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

#### Step 3: Insert Your API Key

Replace `YOUR_GATEWAY_API_KEY` with your actual API key from Subgraph Studio.

#### Step 4: Save and Restart

1. Save the configuration file
2. Completely quit Claude Desktop
3. Reopen Claude Desktop

### Method 2: Building from Source

For advanced users who want to run the MCP server locally.

#### Prerequisites
- Rust 1.75+ (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- Git

#### Steps

1. **Clone the repository:**
```bash
git clone git@github.com:graphops/subgraph-mcp.git
cd subgraph-mcp
```

2. **Build the binary:**
```bash
cargo build --release
```

3. **Get the binary path:**
```bash
pwd  # Note this path
```

4. **Update config with local binary:**
```json
{
  "mcpServers": {
    "subgraph": {
      "command": "/path/to/subgraph-mcp/target/release/subgraph-mcp",
      "args": [],
      "env": {
        "GRAPH_API_KEY": "YOUR_GATEWAY_API_KEY"
      }
    }
  }
}
```

## Using Subgraph MCP

### Activate the Server

1. Start a new conversation in Claude Desktop
2. Click the **Context Menu** (attachment icon or +)
3. Select **Add Resource**
4. Choose **Subgraph Server Instructions**

> **Note:** You need to add this resource manually for each new conversation that needs subgraph access.

### Example Queries

Once activated, try these queries:

```
Find subgraphs related to Uniswap

Show me the schema for the ENS subgraph

Query the top 10 domains from ENS subgraph

What's the 30-day query volume for Aave subgraph?

Find subgraphs that index the USDC contract
```

## Adding Token API MCP

To also access token data, add the Token API server:

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

## Troubleshooting

### Enable Verbose Logging

Add `--verbose true` to the args array:

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

Logs are written to `logs/mcp.log` in your Claude config directory.

### Common Issues

**Server not appearing:**
- Verify JSON syntax is valid
- Ensure Claude Desktop is fully restarted
- Check that `npx` is in your PATH

**ENOENT error:**
- Use the full path to `npx`: `which npx` to find it
- Example: `/usr/local/bin/npx`

**Authentication errors:**
- Verify your API key is correct
- Check for extra spaces in the key
- Ensure Bearer prefix is included

**Server disconnected:**
- Check internet connection
- Verify the endpoint URL is correct
- Regenerate API key if needed

### Verify npx Path

```bash
which npx
# Example output: /usr/local/bin/npx
```

Use the full path if needed:
```json
"command": "/usr/local/bin/npx"
```

## Next Steps

- [Try example queries](../examples/queries.md)
- [Configure Token API](token-api-mcp.md)
- [View available skills](../skills/subgraph-skills.md)
