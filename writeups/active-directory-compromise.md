# Advanced Active Directory Compromise & BloodHound Analysis

Attack path analysis demonstrating potential lateral movement and privilege escalation through Kerberoasting and Active Directory ACL abuse in an authorized Active Directory environment.

## 1. Domain Enumeration

Initial mapping of domain controllers, users, groups, and trusts using BloodHound and PowerView.

```powershell
Invoke-BloodHound -CollectionMethod All -Domain corp.local
```

- **Domain Controller:** dc01.corp.local
- **Target Group:** Domain Admins

## 2. Exploitation & Lateral Movement

Identified service principal names (SPNs) for offline password-cracking assessment and analyzed vulnerable Active Directory access control lists (ACLs) that could enable privilege escalation.

```bash
impacket-GetUserSPNs corp.local/user:Password123 -dc-ip 10.10.10.5 -request
```

## 3. Privilege Escalation

Analyzed the identified attack paths and, where authorized, validated access to privileged credentials and resources.

```bash
impacket-secretsdump corp.local/administrator:Hash@10.10.10.5
```

Successful Domain Admin access should only be reported when independently validated through authorized testing and supporting evidence.

## 4. Remediation

- Enforce strong, unique passwords for service accounts.
- Use managed service accounts where appropriate.
- Audit and harden Active Directory ACLs to prevent unauthorized permission abuse.
- Apply least-privilege principles to service and administrative accounts.
