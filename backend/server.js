const express = require("express");
const cors = require("cors");
const {
  mockBugs,
  mockCommits,
  mockDocs,
  mockCalendar,
  mockKpis,
  mockSlack,
} = require("./data/mockData");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const normalize = (value = "") => value.toLowerCase();
const includesAny = (text, list) => list.some((item) => text.includes(item));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/github/search", (req, res) => {
  // searchGitHub Tool
  const { q, type } = req.query;
  const query = normalize(q || "");
  console.log(`[github/search] type=${type} query="${q}"`);

  if (type === "issues") {
    const wantsP0 = includesAny(query, ["p0", "priority p0"]);
    const wantsP1 = includesAny(query, ["p1", "priority p1"]);
    const wantsP2 = includesAny(query, ["p2", "priority p2"]);
    const wantsMe = includesAny(query, ["assigned to me", "my bugs", "me"]);

    const filtered = mockBugs.filter((bug) => {
      const matchesTitle = bug.title.toLowerCase().includes(query);
      const matchesPriority =
        (wantsP0 && bug.priority === "P0") ||
        (wantsP1 && bug.priority === "P1") ||
        (wantsP2 && bug.priority === "P2");
      const matchesAssignee = wantsMe ? bug.assignee === "John Doe" : true;
      const matchesRepo = query.includes("backend")
        ? bug.repository === "backend"
        : query.includes("frontend")
        ? bug.repository === "frontend"
        : true;

      if (!query) return true;
      if (matchesPriority || matchesTitle) {
        return matchesAssignee && matchesRepo;
      }
      if (includesAny(query, ["bug", "bugs", "issues"])) {
        return matchesAssignee && matchesRepo;
      }
      return matchesTitle;
    });

    const safeResult = filtered.length ? filtered : mockBugs;
    console.log(`[github/search] issues matched=${filtered.length}`);
    return res.json(safeResult);
  }

  if (type === "commits") {
    const filtered = mockCommits.filter((commit) => {
      if (!query) return true;
      const matchesAuthor = commit.author.toLowerCase().includes(query);
      const matchesRepo = commit.repository.toLowerCase().includes(query);
      const matchesMessage = commit.message.toLowerCase().includes(query);
      return matchesAuthor || matchesRepo || matchesMessage;
    });
    const safeResult = filtered.length ? filtered : mockCommits;
    console.log(`[github/search] commits returned=${safeResult.length}`);
    return res.json(safeResult);
  }

  console.log("[github/search] type not supported, returning empty array");
  return res.json([]);
});

app.get("/api/notion/search", (req, res) => {
  // searchDocs Tool
  const { q } = req.query;
  const query = normalize(q || "");
  console.log(`[notion/search] query="${q}"`);

  const filtered = mockDocs.filter((doc) => {
    if (!query) return true;
    const titleMatch = doc.title.toLowerCase().includes(query);
    const excerptMatch = doc.excerpt.toLowerCase().includes(query);
    const tagMatch = doc.tags.some((tag) => tag.toLowerCase().includes(query));
    return titleMatch || excerptMatch || tagMatch;
  });

  const safeResult = filtered.length ? filtered : mockDocs;
  console.log(`[notion/search] docs returned=${safeResult.length}`);
  res.json(safeResult);
});

app.post("/api/calendar/availability", (req, res) => {
  //  getTeamCalendar Tool
  const { date, members } = req.body || {};
  console.log(
    `[calendar/availability] date="${date || "n/a"}" members=${
      Array.isArray(members) ? members.join(", ") : "n/a"
    }`
  );
  res.json({
    ...mockCalendar,
    request: {
      date: date || "tomorrow",
      members:
        Array.isArray(members) && members.length
          ? members
          : ["John Doe", "Jane Smith"],
      timezone: mockCalendar.timezone,
    },
  });
});

app.get("/api/kpi/summary", (req, res) => {
  //getKpiSummary
  const { period } = req.query;
  console.log(`[kpi/summary] period="${period || mockKpis.period}"`);
  res.json({
    ...mockKpis,
    period: period || mockKpis.period,
  });
});

app.get("/api/slack/summary", (req, res) => {
  //getSlackSummary
  const { channel = mockSlack.channel, date = "yesterday" } = req.query;
  console.log(`[slack/summary] channel="${channel}" date="${date}"`);
  res.json({
    channel,
    date,
    summary: mockSlack.summary,
    messages: mockSlack.messages,
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
