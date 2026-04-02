# Linux Privilege Escalation – Basic Checklist

## 1. System Information
- uname -a
- hostnamectl
- cat /etc/os-release

## 2. User & Groups
- id
- whoami
- groups
- sudo -l

## 3. SUID/SGID Files
- find / -perm -4000 2>/dev/null
- find / -perm -2000 2>/dev/null

## 4. Cron Jobs
- cat /etc/crontab
- ls -la /etc/cron.*

## 5. Writable Paths
- find / -writable 2>/dev/null

## 6. Capabilities
- getcap -r / 2>/dev/null
