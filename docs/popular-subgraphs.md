# Popular Subgraphs

Reference list of popular subgraph deployment IDs for use with Subgraph MCP.

> **Tip:** You don't need to know deployment IDs! The AI agent can search for subgraphs by keyword. But providing a deployment ID gives you precise control over which subgraph version you're querying.

---

## How to Use Subgraph IDs

### Option 1: Let the AI Search (Easier)

Just describe what you want:

```
"Find Uniswap V3 subgraphs"
"Search for lending protocol subgraphs"
"What subgraphs track ENS domains?"
```

The AI will search The Graph Network and show you available options.

### Option 2: Specify a Deployment ID (Precise)

If you know the exact subgraph you want:

```
"Query subgraph 5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV for the top 10 pools"
"Get the schema for deployment DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G"
```

**When to use deployment IDs:**
- You need a specific version of a subgraph
- You want consistent results across sessions
- You're building automated pipelines
- The AI search returns multiple similar results

---

## Uniswap

| Version | Network | Deployment ID |
|---------|---------|---------------|
| Uniswap V4 | Ethereum | `DiYPVdygkfjDWhbxGSqAQxwBKmfKnkWQojqeM2rkLb3G` |
| Uniswap V3 | Ethereum | `5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV` |
| Uniswap V2 | Ethereum | `A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum` |
| Uniswap V1 | Ethereum | `ESnjgAG9NjfmHypk4Huu4PVvz55fUwpyrRqHF21thoLJ` |

**Example queries:**
```
Query subgraph 5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV for top 20 pools by TVL

Get the schema for Uniswap V3 (5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV)
```

---

## Aave

| Version | Network | Subgraph Name |
|---------|---------|---------------|
| Aave V3 | Ethereum | `aave/protocol-v3` |
| Aave V3 | Arbitrum | `aave/protocol-v3-arbitrum` |
| Aave V3 | Polygon | `aave/protocol-v3-polygon` |
| Aave V3 | Optimism | `aave/protocol-v3-optimism` |
| Aave V2 | Ethereum | `aave/protocol-v2` |

**Example queries:**
```
Search for Aave V3 subgraph on Ethereum and show me active loans

Query Aave protocol-v3 for the top borrowers
```

---

## ENS (Ethereum Name Service)

| Subgraph | Network | Description |
|----------|---------|-------------|
| ENS | Ethereum | Domain registrations, ownership, resolvers |

**Example queries:**
```
Find the ENS subgraph and query recent domain registrations

Show me the schema for ENS domains
```

---

## Other Popular Protocols

| Protocol | Category | Networks |
|----------|----------|----------|
| **Compound** | Lending | Ethereum |
| **Lido** | Staking | Ethereum |
| **Curve** | DEX | Ethereum, Arbitrum, Polygon |
| **Balancer** | DEX | Ethereum, Arbitrum, Polygon |
| **SushiSwap** | DEX | Multi-chain |
| **PancakeSwap** | DEX | BSC, Ethereum |
| **MakerDAO** | Lending/Stablecoin | Ethereum |
| **Chainlink** | Oracles | Multi-chain |
| **OpenSea** | NFT Marketplace | Ethereum |
| **Decentraland** | Metaverse | Ethereum |
| **The Graph** | Protocol | Ethereum |

**Example queries:**
```
Find Compound V3 subgraphs

Search for Lido staking subgraph

What subgraphs are available for Curve Finance?
```

---

## Finding More Subgraphs

### Using Natural Language

```
"Find subgraphs for NFT marketplaces"
"What subgraphs track stablecoins?"
"Search for governance/voting subgraphs"
"Find subgraphs on Arbitrum network"
```

### By Contract Address

```
"Find subgraphs that index contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
```

### By Category

- **DeFi:** Uniswap, Aave, Compound, Curve, Balancer
- **NFTs:** OpenSea, Blur, LooksRare, Foundation
- **DAOs:** Snapshot, Compound Governance, ENS
- **Staking:** Lido, Rocket Pool, Frax
- **Bridges:** Hop, Stargate, Across

---

## Direct Query Endpoint Format

If you need to query a subgraph directly (outside of MCP):

```
https://gateway.thegraph.com/api/YOUR_API_KEY/subgraphs/id/DEPLOYMENT_ID
```

Example:
```
https://gateway.thegraph.com/api/abc123/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV
```

---

## Tips for AI Agents

When working with users:

1. **Start with search** - Most users don't know deployment IDs
2. **Confirm the subgraph** - Show the user which subgraph you found before querying
3. **Save IDs for later** - If a user will query the same subgraph repeatedly, note the deployment ID
4. **Check for updates** - Subgraphs can be redeployed with new IDs; search again if queries fail

---

## Resources

- [Graph Explorer](https://thegraph.com/explorer) - Browse all subgraphs
- [Uniswap Subgraph Docs](https://docs.uniswap.org/api/subgraph/overview)
- [Aave Subgraph Repo](https://github.com/aave/protocol-subgraphs)
