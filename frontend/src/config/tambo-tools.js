import { z } from "zod";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const tamboTools = [
  {
    name: "searchGitHub",
    description:
      "Search GitHub repositories, issues, PRs, and commits (mocked in MVP).",
    tool: async ({ query, type }) => {
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
    name: "searchDocs",
    description: "Search Notion docs (mocked in MVP).",
    tool: async ({ query }) => {
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
