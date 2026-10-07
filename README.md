# Performance Load Testing Suite

[![CI](https://github.com/MarioGRodriguez28/performance-load-tests/actions/workflows/test.yml/badge.svg)](https://github.com/MarioGRodriguez28/performance-load-tests/actions/workflows/test.yml)

A professional performance testing framework using k6 for load testing, stress testing, and SLA validation.

## Overview

This suite demonstrates production-grade performance testing practices:

- Smoke tests for sanity checking
- Load tests with realistic user ramp-up
- Stress tests to find breaking points
- Spike and soak tests for edge cases
- Automated metric collection and reporting
- SLA validation and thresholds
- Trend analysis capabilities

## Technology Stack

- k6 - Modern load testing tool
- JavaScript - Test scripting
- JSON reporting - Metrics storage
- Automation-ready - CI/CD integration

## Test Types

### Smoke Test

Quick sanity check to verify basic functionality.

VUs: 1
Duration: 10s
Endpoints: Users, Posts, Comments
Threshold: p95 < 500ms

Run: npm run test:smoke

### Load Test

Realistic load scenario with gradual ramp-up and ramp-down.

Stages:
- 0-30s: Ramp to 20 VUs
- 30s-2m: Hold at 50 VUs
- 2m-2m20s: Ramp down to 0 VUs

Thresholds:
- p95 response time < 1000ms
- p99 response time < 2000ms
- Failure rate < 5%

Run: npm run test:load

### Stress Test

Find system breaking points with aggressive user ramp-up.

VUs: Ramp from 0 to 300 to 0
Duration: 2.5 minutes
Focus: System behavior under extreme load

Thresholds:
- p95 response time < 2000ms
- p99 response time < 5000ms
- Failure rate < 10%

Run: npm run test:stress

### Soak Test

Extended duration test to detect memory leaks and resource issues.

VUs: 30 (constant)
Duration: 10 minutes
Threshold: p95 < 500ms

Run: npm run test:soak (requires k6 installed)

## Project Structure

```
.
├── tests/
│   ├── smoke.js          (Sanity check test)
│   ├── load.js           (Load test with ramp-up)
│   ├── stress.js         (Stress test, breaking point)
│   ├── spike.js          (Spike test)
│   └── soak.js           (Extended duration test)
├── k6-config.js          (Shared configuration)
├── reports/              (Test results and metrics)
└── README.md
```

## Key Metrics Analyzed

Response Time

- p50 (median)
- p95 (95th percentile)
- p99 (99th percentile)
- Average
- Min/Max

Request Counts

- Total requests
- Successful requests
- Failed requests
- Request rate

System Health

- Error rate
- Availability
- Throughput

## Installation & Setup

### Install k6

On macOS:
```
brew install k6
```

On Linux:
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3232A+
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6-stable.list
sudo apt-get update
sudo apt-get install k6
```

### Run Tests

```
# Smoke test
k6 run tests/smoke.js

# Load test
k6 run tests/load.js

# Stress test
k6 run tests/stress.js

# All tests
npm run test:all
```

## Understanding Results

Pass/Fail Criteria

Tests pass if all thresholds are met. Example:

✓ p95 response time < 1000ms
✓ Failure rate < 5%
✓ Total requests > 100

Interpreting Metrics

- High p99: Long-tail latency issues
- Increasing response times: Memory leak indicator
- High error rate: System overload or error condition
- Low throughput: Bottleneck in system

## Real-World Example

Load Test Scenario:

```
Stage 1 (0-30s): Ramp to 20 VUs
- System warming up
- Cache population
- Connection pooling

Stage 2 (30s-2m): Hold at 50 VUs
- Sustained load testing
- Stable state metrics
- Endurance verification

Stage 3 (2m-2m20s): Ramp down to 0
- Graceful shutdown
- Resource cleanup
- Connection closing
```

## Performance Targets

Based on JSONPlaceholder API:

Metric              Target      Actual
Response Time p95   < 500ms     300-400ms
Response Time p99   < 1000ms    600-800ms
Error Rate          < 5%        0-1%
Throughput          > 100 req/s  150+ req/s

## CI/CD Integration

GitHub Actions Example:

```yaml
- name: Run k6 smoke test
  run: k6 run tests/smoke.js
  
- name: Run k6 load test
  run: k6 run tests/load.js
```

## Reports

Output Files:

- smoke-test-report.json
- load-test-report.json
- stress-test-report.json

Each contains:

- Aggregated metrics
- Per-endpoint breakdown
- Threshold pass/fail status
- Timestamp and duration

## Best Practices Applied

1. Multiple Test Types - Different scenarios catch different issues
2. SLA Thresholds - Automatic pass/fail validation
3. Gradual Ramp-up - More realistic load patterns
4. Error Monitoring - Track failures, not just latency
5. JSON Reporting - Machine-readable results
6. Documentation - Clear test intentions

## Common Issues

High Response Times

- Check backend logs
- Monitor CPU/Memory
- Review database queries
- Check network latency

High Error Rate

- Verify endpoint availability
- Check request payload
- Review backend error logs
- Validate authentication

Inconsistent Results

- Run multiple times
- Vary test parameters
- Check external dependencies
- Monitor system resources

## What This Demonstrates

Expertise in:

- Performance testing strategy
- Load testing tool proficiency (k6)
- Metrics analysis and interpretation
- SLA definition and validation
- Test automation best practices
- CI/CD integration patterns
- Results reporting and analysis

## Next Steps

Potential Enhancements:

- Real-time dashboarding (Grafana)
- Historical trend analysis
- Automated alerting on SLA breach
- Performance regression detection
- Multi-region testing
- Custom metrics collection
- Database performance profiling

## Resources

- k6 Documentation: https://k6.io/docs/
- Load Testing Best Practices: https://k6.io/resources/
- JSONPlaceholder API: https://jsonplaceholder.typicode.com

## License

MIT

## Author

Mario Rodríguez - QA Automation Engineer

---

For questions or contributions: https://github.com/MarioGRodriguez28/performance-load-tests

---

Part of my [QA automation portfolio](https://github.com/MarioGRodriguez28/qa-portfolio-docs). More about my work at [mariogrodriguez.com](https://mariogrodriguez.com).
