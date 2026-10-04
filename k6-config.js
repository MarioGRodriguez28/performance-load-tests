export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const THRESHOLDS = {
  smoke: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
  load: {
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
    http_req_failed: ['rate<0.05'],
    http_requests: ['count>100'],
  },
  stress: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.1'],
  },
  soak: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
  },
};

export const TEST_SCENARIOS = {
  smoke: {
    name: 'Smoke Test',
    description: 'Quick sanity check - 1 VU for 10s',
    vus: 1,
    duration: '10s',
  },
  load: {
    name: 'Load Test',
    description: 'Realistic load - ramp up to 50 VUs over 2 min',
    stages: [
      { duration: '30s', target: 20 },
      { duration: '1m30s', target: 50 },
      { duration: '20s', target: 0 },
    ],
  },
  stress: {
    name: 'Stress Test',
    description: 'Find breaking point - ramp up to 300 VUs',
    stages: [
      { duration: '30s', target: 100 },
      { duration: '30s', target: 200 },
      { duration: '30s', target: 300 },
      { duration: '30s', target: 200 },
      { duration: '30s', target: 0 },
    ],
  },
  soak: {
    name: 'Soak Test',
    description: 'Extended duration - 30 VUs for 10 min',
    vus: 30,
    duration: '10m',
  },
};
