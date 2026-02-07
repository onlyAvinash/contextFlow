import { z } from 'zod';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const tamboTools = [
  {
    name: 'searchGitHub',
    description: 'Search GitHub repositories, issues, PRs, and commits (mocked in MVP).',
    tool: async ({ query, type }) => {
      const response = await fetch(`${apiBaseUrl}/api/github/search?q=${encodeURIComponent(query)}&type=${type}`);
      return response.json();
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          query: z.string(),
          type: z.enum(['issues', 'prs', 'commits', 'repos'])
        })
      )
      .returns(z.array(z.any()))
  },
  {
    name: 'searchDocs',
    description: 'Search Notion docs (mocked in MVP).',
    tool: async ({ query }) => {
      const response = await fetch(`${apiBaseUrl}/api/notion/search?q=${encodeURIComponent(query)}`);
      return response.json();
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          query: z.string()
        })
      )
      .returns(
        z.array(
          z.object({
            title: z.string(),
            url: z.string(),
            excerpt: z.string(),
            lastUpdated: z.string()
          })
        )
      )
  },
  {
    name: 'getTeamCalendar',
    description: 'Return availability for a given date and team members (mocked in MVP).',
    tool: async ({ date, members }) => {
      const response = await fetch(`${apiBaseUrl}/api/calendar/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, members })
      });
      return response.json();
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          date: z.string(),
          members: z.array(z.string())
        })
      )
      .returns(
        z.object({
          available: z.array(z.any()),
          busy: z.array(z.any())
        })
      )
  }
];
