export interface Skill {
  name: string;
  level: number; // 1 to 5
  variant: "tool" | "language" | "technique";
}

export const toolsAndFrameworks: Skill[] = [
  { name: "Burp Suite", level: 5, variant: "tool" },
  { name: "Metasploit", level: 4, variant: "tool" },
  { name: "Nmap", level: 5, variant: "tool" },
  { name: "Wireshark", level: 4, variant: "tool" },
  { name: "Hydra", level: 4, variant: "tool" },
  { name: "John the Ripper", level: 3, variant: "tool" },
  { name: "Hashcat", level: 3, variant: "tool" },
  { name: "SearchSploit", level: 4, variant: "tool" },
  { name: "Gobuster/Feroxbuster", level: 5, variant: "tool" },
  { name: "Sublist3r/Amass", level: 4, variant: "tool" },
  { name: "BeautifulSoup", level: 5, variant: "tool" },
  { name: "Selenium", level: 4, variant: "tool" },
  { name: "Scapy", level: 4, variant: "tool" },
  { name: "Docker", level: 3, variant: "tool" }
];

export const languagesAndTech: Skill[] = [
  { name: "Python", level: 5, variant: "language" },
  { name: "Bash", level: 4, variant: "language" },
  { name: "PowerShell", level: 3, variant: "language" },
  { name: "JavaScript", level: 3, variant: "language" },
  { name: "SQL", level: 4, variant: "language" },
  { name: "C/C++", level: 3, variant: "language" }
];

export const securityExpertise: Skill[] = [
  { name: "Web App Pentesting", level: 5, variant: "technique" },
  { name: "CTF (Web Exploitation)", level: 5, variant: "technique" },
  { name: "API Security", level: 4, variant: "technique" },
  { name: "Network Security", level: 4, variant: "technique" },
  { name: "OSINT", level: 4, variant: "technique" },
  { name: "Cryptography", level: 3, variant: "technique" }
];
