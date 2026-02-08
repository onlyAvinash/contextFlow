import { z } from "zod";
import { DataTable } from "../components/tambo/DataTable.jsx";
import { MetricCard } from "../components/tambo/MetricCard.jsx";
import { TimelineView } from "../components/tambo/TimelineView.jsx";
import { ActionForm } from "../components/tambo/ActionForm.jsx";
import { DocumentCard } from "../components/tambo/DocumentCard.jsx";

export const tamboComponents = [
  {
    name: "DataTable",
    description:
      "Displays structured data such as bugs, tasks, issues, or team members. Use for any list with columns.",
    component: DataTable,
    propsSchema: z.object({
      title: z.string(),
      columns: z.array(
        z.object({
          key: z.string(),
          label: z.string(),
          type: z.enum(["text", "number", "date", "status"]),
        })
      ),
      rows: z.array(
        z
          .object({
            id: z.string().optional(),
            title: z.string().optional(),
            assignee: z.string().optional(),
            priority: z.string().optional(),
            repository: z.string().optional(),
            created: z.string().optional()
          })
          .passthrough()
      ),
      actions: z
        .array(
          z.object({
            label: z.string(),
            onClick: z.string().optional(),
          })
        )
        .optional(),
    }),
  },
  {
    name: "MetricCard",
    description:
      "Displays a single KPI with a trend and optional sparkline. Use for summary metrics.",
    component: MetricCard,
    propsSchema: z.object({
      title: z.string(),
      value: z.union([z.string(), z.number()]),
      trend: z
        .object({
          direction: z.enum(["up", "down", "neutral"]),
          percentage: z.number(),
          period: z.string(),
        })
        .optional(),
      icon: z.string().optional(),
      sparkline: z
        .array(
          z.object({
            value: z.number(),
          })
        )
        .optional(),
    }),
  },
  {
    name: "TimelineView",
    description:
      "Chronological timeline of events. Use for activity feeds, commits, meetings, or updates.",
    component: TimelineView,
    propsSchema: z.object({
      title: z.string(),
      events: z.array(
        z.object({
          timestamp: z.string(),
          title: z.string(),
          description: z.string().optional(),
          user: z
            .object({
              name: z.string(),
              avatar: z.string().optional(),
            })
            .optional(),
          type: z.enum(["commit", "pr", "bug", "meeting", "doc", "other"]),
        })
      ),
    }),
  },
  {
    name: "ActionForm",
    description:
      "Action form for scheduling meetings. Always include any person explicitly named in the user query in the attendees list, and prefill date/time if mentioned. The attendees list must not be empty.",
    component: ActionForm,
    propsSchema: z.object({
      title: z.string(),
      date: z.string(),
      time: z.string(),
      attendees: z.array(z.string()).min(1),
    }),
  },
  {
    name: "DocumentCard",
    description: "Card view for documents with metadata and tags.",
    component: DocumentCard,
    propsSchema: z.object({
      title: z.string(),
      excerpt: z.string(),
      author: z.string(),
      lastUpdated: z.string(),
      tags: z.array(z.string()),
      url: z.string().url(),
    }),
  },
];
