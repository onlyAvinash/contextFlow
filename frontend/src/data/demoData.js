export const demoBugs = [
  {
    id: '#2847',
    title: 'Auth service crashes on startup',
    assignee: 'John Doe',
    priority: 'P0',
    repository: 'backend',
    created: '2026-01-29T10:30:00Z'
  },
  {
    id: '#2839',
    title: 'Payment flow fails for EU users',
    assignee: 'Jane Smith',
    priority: 'P0',
    repository: 'frontend',
    created: '2026-01-29T07:00:00Z'
  },
  {
    id: '#2821',
    title: 'Database connection timeout',
    assignee: 'Mike Jones',
    priority: 'P1',
    repository: 'backend',
    created: '2026-01-28T19:00:00Z'
  }
];

export const demoDocs = [
  {
    title: 'API Documentation v2.0',
    excerpt: 'Comprehensive guide for REST API endpoints, authentication, and rate limiting.',
    author: 'John Doe',
    lastUpdated: '3 days ago',
    tags: ['backend', 'api', 'documentation'],
    url: 'https://notion.so/api-docs'
  },
  {
    title: 'Deploy Guide',
    excerpt: 'Step-by-step production deployment checklist and rollback plan.',
    author: 'Mike Jones',
    lastUpdated: '5 days ago',
    tags: ['devops', 'release'],
    url: 'https://notion.so/deploy'
  }
];

export const demoTimeline = [
  {
    timestamp: 'Jan 27 • PR #234 merged',
    title: 'New auth flow shipped',
    description: 'Improved MFA and session handling',
    type: 'pr',
    user: { name: '@johndoe' }
  },
  {
    timestamp: 'Jan 26 • Docs updated',
    title: 'API docs refreshed',
    description: 'Updated OAuth section',
    type: 'doc',
    user: { name: '@mikejones' }
  },
  {
    timestamp: 'Jan 25 • Bug fixes',
    title: '3 backend bugs resolved',
    description: 'Timeout and retry logic tuned',
    type: 'bug',
    user: { name: '@janesmith' }
  }
];

export const demoAvailability = {
  date: 'Tomorrow',
  time: '15:00',
  attendees: ['John Doe', 'Jane Smith']
};

export const demoMetrics = {
  title: 'Open P0 Bugs',
  value: 12,
  trend: { direction: 'down', percentage: 8, period: 'vs last week' },
  sparkline: [{ value: 16 }, { value: 15 }, { value: 14 }, { value: 12 }]
};

export const demoKpis = [
  {
    title: 'Revenue (Q4)',
    value: '$4.2M',
    trend: { direction: 'up', percentage: 12, period: 'QoQ' },
    sparkline: [{ value: 3.2 }, { value: 3.6 }, { value: 4.0 }, { value: 4.2 }]
  },
  {
    title: 'New ARR',
    value: '$1.1M',
    trend: { direction: 'up', percentage: 8, period: 'QoQ' },
    sparkline: [{ value: 0.7 }, { value: 0.9 }, { value: 1.0 }, { value: 1.1 }]
  },
  {
    title: 'Churn',
    value: '3.2%',
    trend: { direction: 'down', percentage: 1.4, period: 'QoQ' },
    sparkline: [{ value: 4.6 }, { value: 4.0 }, { value: 3.6 }, { value: 3.2 }]
  }
];

export const demoRevenueTable = [
  { region: 'North America', revenue: '$1.9M', growth: '14%' },
  { region: 'EMEA', revenue: '$1.2M', growth: '9%' },
  { region: 'APAC', revenue: '$0.9M', growth: '11%' }
];
