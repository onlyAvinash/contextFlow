import { z } from "zod";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const emitToolStatus = (message) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("tambo:tool-status", {
      detail: message,
    })
  );
};

export const tamboTools = [
  {
    name: "searchGitHub",
    description:
      "Search GitHub repositories, issues, PRs, and commits (mocked in MVP).",
    tool: async ({ query, type }) => {
      emitToolStatus("Scanning GitHub…");
      console.log(`[tool:searchGitHub] query="${query}" type="${type}"`);
      const response = await fetch(
        `${apiBaseUrl}/api/github/search?q=${encodeURIComponent(
          query
        )}&type=${type}`
      );
      const data = await response.json();
      console.log(
        `[tool:searchGitHub] results=${Array.isArray(data) ? data.length : "n/a"}`
      );
      return data;
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          query: z.string(),
          type: z.enum(["issues", "prs", "commits", "repos"]),
        })
      )
      .returns(z.array(z.any())),
  },
  {
    name: "getSlackSummary",
    description: "Summarize Slack channel activity and decisions for a given date (mocked in MVP).",
    tool: async ({ channel, date }) => {
      emitToolStatus("Reading Slack threads…");
      console.log(`[tool:getSlackSummary] channel="${channel}" date="${date}"`);
      const response = await fetch(
        `${apiBaseUrl}/api/slack/summary?channel=${encodeURIComponent(channel)}&date=${encodeURIComponent(date)}`
      );
      const data = await response.json();
      console.log(
        `[tool:getSlackSummary] messages=${Array.isArray(data?.messages) ? data.messages.length : "n/a"}`
      );
      return data;
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          channel: z.string().optional(),
          date: z.string().optional()
        })
      )
      .returns(
        z.object({
          channel: z.string(),
          date: z.string(),
          summary: z.object({
            decisions: z.number(),
            actionItems: z.number()
          }),
          messages: z.array(
            z.object({
              timestamp: z.string(),
              title: z.string(),
              description: z.string().optional(),
              user: z.object({ name: z.string() }).optional(),
              type: z.enum(['commit', 'pr', 'bug', 'meeting', 'doc', 'other']).optional()
            })
          )
        })
      )
  },
  {
    name: "getKpiSummary",
    description: "Get KPI summary metrics for a given period (mocked in MVP).",
    tool: async ({ period }) => {
      emitToolStatus("Calculating KPIs…");
      console.log(`[tool:getKpiSummary] period="${period}"`);
      const response = await fetch(
        `${apiBaseUrl}/api/kpi/summary?period=${encodeURIComponent(period)}`
      );
      const data = await response.json();
      console.log(
        `[tool:getKpiSummary] metrics=${Array.isArray(data?.metrics) ? data.metrics.length : "n/a"}`
      );
      return data;
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          period: z.string()
        })
      )
      .returns(
        z.object({
          period: z.string(),
          metrics: z.array(
            z.object({
              title: z.string(),
              value: z.union([z.string(), z.number()]),
              trend: z.object({
                direction: z.enum(["up", "down", "neutral"]),
                percentage: z.number(),
                period: z.string()
              })
            })
          ),
          topRegions: z.array(
            z.object({
              region: z.string(),
              revenue: z.string(),
              growth: z.string()
            })
          )
        })
      )
  },
  {
    name: "searchDocs",
    description: "Search Notion docs (mocked in MVP).",
    tool: async ({ query }) => {
      emitToolStatus("Syncing Notion…");
      console.log(`[tool:searchDocs] query="${query}"`);
      const response = await fetch(
        `${apiBaseUrl}/api/notion/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log(
        `[tool:searchDocs] results=${Array.isArray(data) ? data.length : "n/a"}`
      );
      return data;
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          query: z.string(),
        })
      )
      .returns(
        z.array(
          z.object({
            title: z.string(),
            url: z.string(),
            excerpt: z.string(),
            lastUpdated: z.string(),
          })
        )
      ),
  },
  {
    name: "getTeamCalendar",
    description:
      "Return availability for a given date and team members (mocked in MVP).",
    tool: async ({ date, members }) => {
      emitToolStatus("Mapping calendars…");
      console.log(
        `[tool:getTeamCalendar] date="${date}" members="${members?.join(", ") ?? ""}"`
      );
      const response = await fetch(`${apiBaseUrl}/api/calendar/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, members }),
      });
      const data = await response.json();
      console.log(
        `[tool:getTeamCalendar] available=${data?.available?.length ?? "n/a"}`
      );
      return data;
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          date: z.string(),
          members: z.array(z.string()),
        })
      )
      .returns(
        z.object({
          available: z.array(z.any()),
          busy: z.array(z.any()),
        })
      ),
  },
];
