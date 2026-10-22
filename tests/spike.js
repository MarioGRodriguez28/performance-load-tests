import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '10s', target: 150 },
    { duration: '30s', target: 150 },
    { duration: '10s', target: 5 },
    { duration: '30s', target: 5 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.1'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const postId = Math.floor(Math.random() * 100) + 1;

  const getPost = http.get(`${BASE_URL}/posts/${postId}`);
  check(getPost, {
    'post status is 200': (r) => r.status === 200,
    'post response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: false }),
    'spike-test-report.json': JSON.stringify(data),
  };
}
