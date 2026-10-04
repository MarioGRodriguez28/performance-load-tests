import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.1'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const postId = Math.floor(Math.random() * 100) + 1;

  const getPostResponse = http.get(`${BASE_URL}/posts/${postId}`);
  check(getPostResponse, {
    'post retrieved': (r) => r.status === 200 || r.status === 404,
    'post response time acceptable': (r) => r.timings.duration < 3000,
  });

  sleep(Math.random() * 1);
}

export function handleSummary(data) {
  return {
    'stress-test-report.json': JSON.stringify(data),
  };
}
