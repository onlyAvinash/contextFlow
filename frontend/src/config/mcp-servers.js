import { MCPTransport } from '@tambo-ai/react/mcp';

export const mcpServers = [
  {
    name: 'github',
    url: import.meta.env.VITE_GITHUB_MCP_URL,
    transport: MCPTransport.HTTP
  },
  {
    name: 'notion',
    url: import.meta.env.VITE_NOTION_MCP_URL,
    transport: MCPTransport.HTTP
  },
  {
    name: 'calendar',
    url: import.meta.env.VITE_CALENDAR_MCP_URL,
    transport: MCPTransport.HTTP
  }
].filter((server) => Boolean(server.url));
