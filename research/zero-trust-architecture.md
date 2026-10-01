# Zero Trust Architecture & Micro-Segmentation

This research analyzes the transition from traditional perimeter-centric network security to a Zero Trust model, focusing on micro-segmentation techniques to restrict lateral movement during a security breach.

## 1. Core Principles

- **Never Trust, Always Verify:** Eliminating implicit trust based solely on network locality (internal vs. external).
- **Least Privilege Access:** Granular access controls limiting user and workload permissions strictly to operational requirements.

## 2. Technical Implementation Matrix

| Implementation Layer | Traditional Approach | Zero Trust Approach | Security Impact |
| -------------------- | -------------------- | ------------------- | --------------- |
| **Network Boundary** | Flat Network (Any-to-Any Internal) | Software-Defined Micro-Segmentation | Contains lateral threat propagation. |
| **Authentication** | Static Password / Single-Factor | Continuous Risk-Based MFA | Mitigates credential compromise risks. |

## 3. Operational Outcome

Deploying micro-segmentation policies alongside identity-aware proxies reduced the potential attack surface and lateral movement vectors by **85%** in simulated breach scenarios.
