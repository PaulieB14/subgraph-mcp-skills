# Troubleshooting

Common issues and solutions for Subgraph MCP integration.

## Connection Issues

### MCP Server Not Appearing

**Symptoms:**
- Server not listed in available tools
- "No MCP servers configured" message

**Solutions:**

1. **Verify JSON syntax:**
   ```bash
   # Validate your config file
   cat ~/.claude/settings.json | jq .
   # or
   cat ~/.cursor/mcp.json | jq .
   ```

2. **Check file location:**
   | Client | Config Path |
   |--------|-------------|
   | Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
   | Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
   | Claude Desktop (Linux) | `~/.config/Claude/claude_desktop_config.json` |
   | Claude Code | `~/.claude/settings.json` |
   | Cursor | `~/.cursor/mcp.json` |
   | Cline | `cline_mcp_settings.json` (in VS Code settings) |
   | OpenClaw | `~/.openclaw/openclaw.json` |

3. **Restart completely:**
   - Quit the application entirely (not just close window)
   - Wait a few seconds
   - Reopen and start a new conversation

---

### "Command Not Found" Error

**Symptoms:**
- `npx: command not found`
- `ENOENT` error in logs

**Solutions:**

1. **Verify Node.js installation:**
   ```bash
   node --version  # Should be 18+ (22+ for OpenClaw)
   npm --version
   npx --version
   ```

2. **Install Node.js if missing:**
   ```bash
   # macOS with Homebrew
   brew install node

   # Or download from nodejs.org
   ```

3. **Use full path to npx:**
   ```bash
   # Find the full path
   which npx
   # Example output: /usr/local/bin/npx
   ```

4. **Update config with full path:**
   ```json
   {
     "mcpServers": {
       "subgraph": {
         "command": "/usr/local/bin/npx",
         "args": ["mcp-remote", ...]
       }
     }
   }
   ```

---

### Server Disconnects Immediately

**Symptoms:**
- Server shows as connected then disconnects
- Intermittent connection

**Solutions:**

1. **Check internet connection**

2. **Verify endpoint URL:**
   ```
   https://subgraphs.mcp.thegraph.com/sse
   ```

3. **Test endpoint directly:**
   ```bash
   curl -I https://subgraphs.mcp.thegraph.com/sse
   ```

4. **Check firewall/VPN:**
   - Disable VPN temporarily to test
   - Check if corporate firewall blocks the endpoint

---

## Authentication Errors

### "Invalid API Key"

**Symptoms:**
- `401 Unauthorized` error
- "Invalid API key" message

**Solutions:**

1. **Verify key format:**
   ```json
   "AUTH_HEADER": "Bearer YOUR_API_KEY"
   ```
   - Include `Bearer ` prefix (with space)
   - No extra quotes around the key
   - No trailing whitespace

2. **Check for copy/paste issues:**
   - Re-copy the key from Subgraph Studio
   - Avoid copying extra characters

3. **Verify key is active:**
   - Go to [Subgraph Studio](https://thegraph.com/studio/)
   - Check API Keys tab
   - Ensure key wasn't deleted or regenerated

4. **Regenerate if needed:**
   - Create a new API key in Subgraph Studio
   - Update your config with the new key

---

### "Rate Limit Exceeded"

**Symptoms:**
- `429 Too Many Requests`
- Queries stop working temporarily

**Solutions:**

1. **Check your limits:**
   - Free tier: 3,000 queries/day
   - View usage in Subgraph Studio

2. **Implement caching:**
   - Cache frequent queries locally
   - Avoid repeated identical queries

3. **Optimize queries:**
   - Use pagination for large result sets
   - Query only needed fields

4. **Upgrade plan if needed**

---

## Query Issues

### Empty Results

**Symptoms:**
- Query returns empty array
- No data found

**Solutions:**

1. **Check schema first:**
   ```
   Show me the schema for [subgraph name]
   ```

2. **Verify entity names:**
   - Entity names are case-sensitive
   - Field names must match schema exactly

3. **Check filters:**
   - Verify filter values exist
   - Try removing filters to test

4. **Confirm subgraph has data:**
   - Check sync status
   - Try a simple query first

---

### Schema Mismatch

**Symptoms:**
- "Field does not exist" error
- Query worked before but now fails

**Solutions:**

1. **Fetch current schema:**
   ```
   Get the latest schema for [subgraph]
   ```

2. **Subgraph may have been updated:**
   - Schema changes when subgraph is redeployed
   - Check for new deployment IDs

3. **Use correct deployment ID:**
   - Specific deployment: `Qm...` (IPFS hash)
   - Latest version: Use subgraph ID instead

---

### Timeout Errors

**Symptoms:**
- Query takes too long
- Connection timeout

**Solutions:**

1. **Simplify the query:**
   - Reduce number of fields
   - Add `first: N` limit
   - Remove nested queries

2. **Use pagination:**
   ```graphql
   {
     swaps(first: 100, skip: 0) { ... }
   }
   ```

3. **Query specific time range:**
   ```graphql
   {
     swaps(where: { timestamp_gt: 1234567890 }) { ... }
   }
   ```

---

## Client-Specific Issues

### Claude Desktop

**Issue: Context menu doesn't show subgraph option**
- Restart Claude Desktop completely
- Start a fresh conversation
- Manually add "Subgraph Server Instructions" resource

**Issue: Config file not found**
- Create the file manually at the correct path
- Ensure parent directories exist

### Claude Code

**Issue: MCP not recognized after config change**
```bash
# Validate config
cat ~/.claude/settings.json | jq .

# Restart Claude Code
exit
claude
```

### Cursor

**Issue: Server shows error in MCP settings**
- Check Cursor Settings > MCP for specific error
- Try removing and re-adding the server

### Cline

**Issue: MCP not activating in chat**
1. Open MCP Servers > Installed
2. Ensure "subgraph" is enabled
3. Add "Subgraph Server Instructions" to chat context
4. Reload VS Code window

### OpenClaw

**Issue: Daemon not starting**
```bash
# Check daemon status
openclaw daemon status

# View logs
openclaw logs

# Restart daemon
openclaw daemon restart
```

---

## Debugging

### Enable Verbose Logging

Add `--verbose true` to your args:

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
        "AUTH_HEADER": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Log Locations

| Client | Log Path |
|--------|----------|
| Claude Desktop | `~/Library/Application Support/Claude/logs/` (macOS) |
| Claude Code | Console output |
| Cursor | Output panel > MCP |
| Cline | VS Code Output panel |
| OpenClaw | `~/.openclaw/logs/` |

### Test MCP Connection Manually

```bash
# Test the remote endpoint
npx mcp-remote --header "Authorization:Bearer YOUR_API_KEY" https://subgraphs.mcp.thegraph.com/sse
```

---

## Getting Help

1. **Check The Graph Discord:** [discord.gg/thegraph](https://discord.gg/thegraph)

2. **Subgraph MCP Issues:** [github.com/graphops/subgraph-mcp/issues](https://github.com/graphops/subgraph-mcp/issues)

3. **The Graph Documentation:** [thegraph.com/docs](https://thegraph.com/docs/)

4. **MCP Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)

When reporting issues, include:
- Your AI client and version
- Operating system
- Node.js version
- Relevant config (redact API keys!)
- Error messages or logs
- Steps to reproduce
