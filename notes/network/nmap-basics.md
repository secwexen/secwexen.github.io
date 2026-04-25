# Nmap Basics

## What

Used Nmap to identify open ports and running services on a target.

## Commands

- Basic: nmap <target>
- Service detection: nmap -sV <target>
- Aggressive: nmap -A <target>

## Scan Types

### -sS vs -sT

- **-sS (SYN scan)**: half-open, faster, stealthier, needs root  
- **-sT (TCP connect)**: full handshake, slower, easier to detect, no root needed  

### -A includes

- OS detection (-O)  
- Version detection (-sV)  
- Script scan (-sC)  
- Traceroute  

## Example

Target: scanme.nmap.org

nmap -sV scanme.nmap.org

Result:

- 22/tcp open ssh
- 80/tcp open http

## Key Insight

Open ports indicate active services.
Service detection is critical for further enumeration and potential exploitation.

## Notes

- -sV reveals service versions
- Some scans require root privileges
- Firewalls may filter or alter results
