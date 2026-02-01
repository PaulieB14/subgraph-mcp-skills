# Example Queries

This document provides example natural language queries you can use with Subgraph MCP across any AI client.

## Getting Started

### Basic Discovery

```
Find subgraphs related to Ethereum DeFi

What subgraphs are available for NFT marketplaces?

List the most popular subgraphs by query volume

Search for subgraphs that track stablecoins
```

### Schema Exploration

```
Show me the GraphQL schema for the ENS subgraph

What entities are available in the Uniswap V3 subgraph?

Explain the relationship between Pool and Swap entities in Uniswap

List all queryable fields for the Domain entity in ENS
```

---

## DeFi Queries

### Uniswap

```
Query the top 20 Uniswap V3 pools by total value locked

Get the last 50 swaps on the USDC/ETH pool

What's the 24-hour volume for Uniswap V3 on mainnet?

Find all liquidity positions for address 0x...

Query the historical price of ETH in the WETH/USDC pool
```

### Aave

```
Find subgraphs for Aave lending protocol

Query all active borrow positions over $100k

What's the current utilization rate for USDC on Aave V3?

Get recent liquidation events from Aave

Show me the top 10 suppliers on Aave V3 Ethereum
```

### Compound

```
Search for Compound V3 subgraphs

Query the total supplied and borrowed for each market

Get the current supply APY for USDC on Compound

Find all accounts with health factor below 1.5

List recent governance proposals from Compound
```

### Curve

```
Find Curve Finance subgraphs

Query the largest Curve pools by TVL

Get swap volume for the 3pool over the last week

What's the virtual price history for stETH/ETH pool?
```

---

## NFT Queries

### General NFT

```
Find subgraphs that track ERC-721 transfers

Query the most traded NFT collections this week

Get transfer history for a specific NFT token ID

Find all NFTs owned by address 0x...
```

### ENS Domains

```
Query the most recently registered ENS domains

Find all domains owned by a specific address

Get the resolver and records for vitalik.eth

What domains are expiring in the next 30 days?

Search for 3-letter ENS domain registrations
```

### OpenSea / Marketplaces

```
Find subgraphs for NFT marketplace activity

Query recent sales over 10 ETH

Get the floor price history for Bored Ape Yacht Club

What's the trading volume trend for Azuki?
```

---

## Governance Queries

```
Find subgraphs for DAO governance

Query recent proposals from Uniswap governance

Get voting history for a specific delegate address

What proposals are currently active on Compound?

Show me the top token holders with voting power
```

---

## Token Queries

```
Search for subgraphs that track ERC-20 transfers

Query the total supply and holders for UNI token

Get transfer history for USDC in the last 24 hours

Find the largest token holders for AAVE

Track token approvals for a specific spender contract
```

---

## Multi-Protocol Analysis

```
Compare TVL across Uniswap, Aave, and Compound

Which DeFi protocols have the highest query volume?

Find all subgraphs that index the WETH contract

Query lending rates across multiple protocols

Get DEX volume comparison for the top 5 exchanges
```

---

## Developer Queries

### Contract Discovery

```
Find subgraphs that index contract 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D

What data is available for the Chainlink price feed contracts?

Search for subgraphs tracking the USDC proxy contract

Find all subgraphs deployed on Arbitrum network
```

### Schema Design

```
Show me how Uniswap V3 models liquidity positions

What's the best schema pattern for tracking token transfers?

How does the Aave subgraph handle interest accrual?

Compare the pool entity design in Uniswap V2 vs V3
```

### Query Optimization

```
Write a paginated query to fetch all historical swaps

How can I efficiently query positions for multiple addresses?

Optimize this query to reduce response time: [paste query]

What indexes are available on the Pool entity?
```

---

## Code Generation

```
Generate TypeScript code to query Uniswap V3 pools using ethers.js

Create a React hook that fetches ENS domain data

Write a Python script to track Aave liquidations

Generate GraphQL types from the Compound V3 schema

Build a data pipeline to aggregate DEX volumes
```

---

## Analytics & Reporting

```
Generate a weekly DeFi report using top subgraph data

What's the trend in NFT trading volume over the past month?

Compare gas usage across different DeFi protocols

Track the growth of unique users on Uniswap

Analyze liquidity migration between Uniswap V2 and V3
```

---

## Advanced Queries

### Time-Based Queries

```
Query hourly OHLC data for ETH/USDC from Uniswap

Get daily active users on Aave for the past 30 days

Track TVL changes hour-by-hour during market volatility

Find all large swaps (>$1M) in the last 24 hours
```

### Cross-Subgraph Analysis

```
Find all DeFi activity for wallet 0x...

Track a token across multiple DEX subgraphs

Compare lending rates for USDC across all protocols

Aggregate NFT holdings across multiple marketplaces
```

### Real-Time Monitoring

```
Set up alerts for liquidations over $100k

Monitor large token transfers in real-time

Track new pool creations on Uniswap

Watch for significant governance votes
```

---

## Troubleshooting Queries

```
Why is my Uniswap V3 query returning empty results?

The subgraph seems to be behind - check sync status

Help me fix this GraphQL query error: [paste error]

Is there a more efficient way to query historical data?
```

---

## Tips for Effective Queries

1. **Start broad, then narrow:** "Find Uniswap subgraphs" → "Show V3 schema" → "Query specific pools"

2. **Always check the schema first** for complex queries

3. **Use pagination** for large result sets: "Get the first 100 swaps, then the next 100"

4. **Specify the network** when querying multi-chain protocols

5. **Ask for query optimization** when dealing with historical data

6. **Request code generation** to integrate queries into your applications
