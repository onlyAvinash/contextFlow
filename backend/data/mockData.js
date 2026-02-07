const mockBugs = [
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

const mockCommits = [
  {
    sha: 'a1b2c3d',
    message: 'fix: resolve auth timeout issue',
    author: 'John Doe',
    timestamp: '2026-01-29T14:30:00Z',
    repository: 'backend'
  },
  {
    sha: 'e4f5g6h',
    message: 'feat: add new billing webhook',
    author: 'Jane Smith',
    timestamp: '2026-01-28T09:20:00Z',
    repository: 'payments'
  }
];

const mockDocs = [
  {
    id: 'doc-1',
    title: 'API Documentation v2.0',
    url: 'https://notion.so/api-docs',
    excerpt: 'Comprehensive guide for REST API endpoints, authentication, and rate limiting.',
    lastUpdated: '2026-01-26T10:00:00Z',
    tags: ['backend', 'api', 'documentation'],
    author: 'John Doe'
  },
  {
    id: 'doc-2',
    title: 'Deploy Guide',
    url: 'https://notion.so/deploy',
    excerpt: 'Step-by-step production deployment checklist and rollback plan.',
    lastUpdated: '2026-01-24T16:00:00Z',
    tags: ['devops', 'release'],
    author: 'Mike Jones'
  }
];

const mockCalendar = {
  available: [
    { time: '2:00 PM', members: ['John Doe', 'Jane Smith'] },
    { time: '3:00 PM', members: ['John Doe', 'Mike Jones'] }
  ],
  busy: [
    { time: '10:00 AM', reason: 'Team standup' }
  ]
};

module.exports = {
  mockBugs,
  mockCommits,
  mockDocs,
  mockCalendar
};
