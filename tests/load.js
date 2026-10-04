import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000', 'p(99)<2000'],
    http_req_failed: ['rate<0.05'],
    http_requests: ['count>100'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const userId = Math.floor(Math.random() * 10) + 1;

  const getUserResponse = http.get(`${BASE_URL}/users/${userId}`);
  check(getUserResponse, {
    'user status is 200': (r) => r.status === 200,
    'user response time < 1000ms': (r) => r.timings.duration < 1000,
    'user has required fields': (r) => {
      const user = JSON.parse(r.body);
      return user.id && user.name && user.email;
    },
  });

  sleep(0.5);

  const getPostsResponse = http.get(`${BASE_URL}/posts?userId=${userId}`);
  check(getPostsResponse, {
    'posts status is 200': (r) => r.status === 200,
    'posts response time < 1000ms': (r) => r.timings.duration < 1000,
    'posts returns array': (r) => Array.isArray(JSON.parse(r.body)),
  });

  sleep(0.5);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'load-test-report.json': JSON.stringify(data),
  };
}

function textSummary(data, options = {}) {
  let summary = '\n=== Load Test Summary ===\n';
  summary += `Total Requests: ${data.metrics.http_requests?.values?.count || 0}\n`;
  summary += `Failed Requests: ${data.metrics.http_req_failed?.values?.rate || 0}\n`;
  summary += `Duration: ${data.state.testRunDurationMs}ms\n`;
  return summary;
}
