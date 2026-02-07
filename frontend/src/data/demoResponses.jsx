import { DataTable } from '../components/tambo/DataTable.jsx';
import { MetricCard } from '../components/tambo/MetricCard.jsx';
import { TimelineView } from '../components/tambo/TimelineView.jsx';
import { DocumentCard } from '../components/tambo/DocumentCard.jsx';
import { ActionForm } from '../components/tambo/ActionForm.jsx';
import { demoBugs, demoDocs, demoTimeline, demoAvailability, demoMetrics } from './demoData.js';

const bugColumns = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'repository', label: 'Repository', type: 'text' },
  { key: 'priority', label: 'Priority', type: 'status' },
  { key: 'assignee', label: 'Assignee', type: 'text' },
  { key: 'created', label: 'Created', type: 'date' }
];

const suggestionMap = [
  {
    match: ['p0 bugs', 'bugs assigned', 'bug list'],
    response: {
      text: 'Found 12 P0 bugs across 3 repositories.',
      components: [
        <MetricCard key="metric" {...demoMetrics} />,
        <DataTable key="table" title="P0 Bugs Assigned to You" columns={bugColumns} rows={demoBugs} />
      ]
    }
  },
  {
    match: ['engineering ship', 'last week', 'recent backend commits'],
    response: {
      text: 'Last week overview: 47 commits, 12 PRs, 3 docs updated.',
      components: [
        <TimelineView key="timeline" title="Engineering Timeline" events={demoTimeline} />
      ]
    }
  },
  {
    match: ['available', 'meeting', 'tomorrow', 'calendar'],
    response: {
      text: 'Here is the best availability window for the team.',
      components: [
        <ActionForm
          key="form"
          title="Schedule Meeting"
          date={demoAvailability.date}
          time={demoAvailability.time}
          attendees={demoAvailability.attendees}
        />
      ]
    }
  },
  {
    match: ['docs', 'documentation', 'authentication'],
    response: {
      text: 'I found the most relevant docs in Notion.',
      components: demoDocs.map((doc, idx) => <DocumentCard key={idx} {...doc} />)
    }
  }
];

export const suggestedQueries = [
  'Show me all P0 bugs assigned to me',
  'What did engineering ship last week?',
  'Who is available for a meeting tomorrow at 3pm?',
  'Find docs about authentication',
  'Summarize recent backend commits'
];

export function getDemoResponse(query) {
  const normalized = query.toLowerCase().trim();
  const isSuggested = suggestedQueries.some(
    (suggested) => suggested.toLowerCase() === normalized
  );
  if (!isSuggested) return null;

  const match = suggestionMap.find((item) => item.match.some((word) => normalized.includes(word)));
  return match?.response ?? null;
}
