# Subgraph MCP Skills

This document defines skills and prompts for AI agents to effectively use the Subgraph MCP server.

## Core Skills

### Skill: Search Subgraphs

**Purpose:** Find relevant subgraphs by keyword, protocol name, or contract address.

**Trigger phrases:**
- "Find subgraphs for..."
- "Search for subgraphs related to..."
- "What subgraphs track..."
- "Look up subgraphs that index..."

**System prompt:**
```
You have access to the Subgraph MCP server which provides tools to search and query
over 15,000 subgraphs on The Graph Network.

When the user asks to find or search for subgraphs:
1. Use the search_subgraphs tool with relevant keywords
2. Present results showing: subgraph name, description, deployment ID, and query volume
3. Offer to show schemas or run queries on discovered subgraphs
```

**Example interactions:**
```
User: Find subgraphs for Uniswap
Agent: [Uses search_subgraphs with keyword "uniswap"]
       Found 15 subgraphs related to Uniswap:
       1. Uniswap V3 (Mainnet) - deployment: Qm...
       2. Uniswap V2 (Mainnet) - deployment: Qm...
       ...
```

---

### Skill: Get Schema

**Purpose:** Retrieve and explain GraphQL schemas for any subgraph.

**Trigger phrases:**
- "Show me the schema for..."
- "What data is available in..."
- "What entities does the... subgraph have?"
- "Explain the schema for..."

**System prompt:**
```
When the user asks about a subgraph schema:
1. Use get_schema tool with the subgraph deployment ID or name
2. List all entities and their fields
3. Explain relationships between entities
4. Suggest useful queries based on the schema
```

**Example interactions:**
```
User: Show me the schema for ENS subgraph
Agent: [Uses get_schema]
       The ENS subgraph has the following entities:

       Domain:
       - id: ID!
       - name: String
       - owner: Account
       - resolver: Resolver
       - registrant: Account
       - expiryDate: BigInt

       Account:
       - id: ID!
       - domains: [Domain!]
       ...
```

---

### Skill: Execute Query

**Purpose:** Run GraphQL queries against subgraphs and explain results.

**Trigger phrases:**
- "Query the... subgraph for..."
- "Get data from..."
- "Run a query to find..."
- "Fetch... from the subgraph"

**System prompt:**
```
When the user asks to query a subgraph:
1. First get the schema if you don't know the structure
2. Construct a valid GraphQL query based on the request
3. Use execute_query tool to run the query
4. Present results in a clear, formatted way
5. Offer analysis or follow-up queries
```

**Example interactions:**
```
User: Query the top 10 Uniswap V3 pools by TVL
Agent: [Uses execute_query]
       {
         pools(first: 10, orderBy: totalValueLockedUSD, orderDirection: desc) {
           id
           token0 { symbol }
           token1 { symbol }
           totalValueLockedUSD
         }
       }

       Results:
       1. USDC/ETH - $523M TVL
       2. WBTC/ETH - $312M TVL
       ...
```

---

### Skill: Get Subgraph Info

**Purpose:** Retrieve metadata and deployment details for a subgraph.

**Trigger phrases:**
- "Tell me about the... subgraph"
- "What is the deployment ID for..."
- "Get info on..."
- "Subgraph details for..."

**System prompt:**
```
When the user asks for subgraph information:
1. Use get_subgraph_info tool
2. Present: name, description, deployment ID, network, entity count
3. Include links to Graph Explorer
4. Show recent sync status if available
```

---

### Skill: Analyze Query Volume

**Purpose:** Retrieve and analyze 30-day query statistics.

**Trigger phrases:**
- "How popular is the... subgraph?"
- "Query volume for..."
- "Usage statistics for..."
- "Most queried subgraphs"

**System prompt:**
```
When the user asks about subgraph popularity or usage:
1. Use get_query_volume tool
2. Present 30-day query count
3. Compare to similar subgraphs if relevant
4. Explain what high/low volume might indicate
```

---

## Composite Skills

### Skill: DeFi Analysis

**Purpose:** Comprehensive DeFi protocol analysis using subgraph data.

**System prompt:**
```
For DeFi analysis requests:
1. Identify relevant subgraphs (lending, DEX, derivatives)
2. Query for TVL, volume, user counts
3. Cross-reference data from multiple subgraphs
4. Present trends and insights
```

**Example:**
```
User: Analyze the current state of Aave V3
Agent: [Searches for Aave V3 subgraphs]
       [Queries TVL, active loans, liquidations]
       [Presents comprehensive analysis]
```

---

### Skill: Contract Discovery

**Purpose:** Find all subgraphs indexing a specific smart contract.

**System prompt:**
```
When given a contract address:
1. Search subgraphs by contract address
2. List all subgraphs that index this contract
3. Explain what data each subgraph provides
4. Help user choose the most relevant one
```

**Example:**
```
User: What subgraphs track 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
Agent: [Uses search_subgraphs with contract address]
       This is the UNI token contract. Found 8 subgraphs:
       - Uniswap Governance (tracks voting)
       - Token Transfers (tracks all transfers)
       ...
```

---

### Skill: Schema Comparison

**Purpose:** Compare schemas across similar subgraphs.

**System prompt:**
```
When asked to compare subgraphs:
1. Fetch schemas for both subgraphs
2. Identify common entities and differences
3. Explain tradeoffs in data availability
4. Recommend which to use for specific use cases
```

---

## OpenClaw Skills Configuration

For OpenClaw users, add these skills to your configuration:

```json
{
  "skills": {
    "subgraph-search": {
      "description": "Search for blockchain subgraphs by keyword or contract",
      "triggers": ["find subgraph", "search subgraph", "subgraphs for"],
      "mcp": "subgraph"
    },
    "subgraph-query": {
      "description": "Query blockchain data from subgraphs",
      "triggers": ["query subgraph", "get data from", "fetch from subgraph"],
      "mcp": "subgraph"
    },
    "subgraph-schema": {
      "description": "Get GraphQL schemas for subgraphs",
      "triggers": ["schema for", "what data in", "show schema"],
      "mcp": "subgraph"
    }
  }
}
```

## Claude Code Skills

For Claude Code, you can reference these skills in your project's `.claude/settings.json`:

```json
{
  "skills": {
    "subgraph": {
      "description": "Query The Graph's 15,000+ blockchain subgraphs via MCP",
      "instructions": "Use the subgraph MCP tools to search for subgraphs, get schemas, and execute GraphQL queries. Always get the schema first before writing queries."
    }
  }
}
```

## Prompt Engineering Tips

### Be Specific About Data Needs
```
Good: "Query the Uniswap V3 subgraph for pools with > $1M TVL, sorted by volume"
Bad: "Get Uniswap data"
```

### Request Schema First for Complex Queries
```
"First show me the Aave V3 schema, then help me write a query for user positions"
```

### Specify Networks When Relevant
```
"Find the Uniswap V3 subgraph on Arbitrum (not mainnet)"
```

### Ask for Query Optimization
```
"Write an efficient query to get the last 100 swaps with pagination"
```

## Error Handling Prompts

When queries fail, the agent should:

1. **Schema mismatch:** "Let me check the current schema - it may have been updated"
2. **Rate limits:** "The query volume is high. Let me simplify the query or add pagination"
3. **Timeout:** "This is a large query. Let me break it into smaller parts"
4. **Not found:** "This subgraph may be deprecated. Let me search for alternatives"
