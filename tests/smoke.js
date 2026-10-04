import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
  const getUsers = http.get(`${BASE_URL}/users`);
  check(getUsers, {
    'users list status is 200': (r) => r.status === 200,
    'users response time < 500ms': (r) => r.timings.duration < 500,
    'users response body is not empty': (r) => r.body.length > 0,
  });

  sleep(1);

  const getPosts = http.get(`${BASE_URL}/posts`);
  check(getPosts, {
    'posts list status is 200': (r) => r.status === 200,
    'posts response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);

  const getComments = http.get(`${BASE_URL}/comments?postId=1`);
  check(getComments, {
    'comments list status is 200': (r) => r.status === 200,
    'comments response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
