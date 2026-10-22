import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export const options = {
  vus: 10,
  duration: '10m',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const userId = Math.floor(Math.random() * 10) + 1;

  const getUser = http.get(`${BASE_URL}/users/${userId}`);
  check(getUser, {
    'user status is 200': (r) => r.status === 200,
    'user response time < 500ms': (r) => r.timings.duration < 500,
  });

  const getTodos = http.get(`${BASE_URL}/todos?userId=${userId}`);
  check(getTodos, {
    'todos status is 200': (r) => r.status === 200,
    'todos list is not empty': (r) => r.json().length > 0,
  });

  sleep(2);
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: false }),
    'soak-test-report.json': JSON.stringify(data),
  };
}
