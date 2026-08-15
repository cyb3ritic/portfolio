export interface Achievement {
  id: string;
  title: string;
  category: "CTF" | "Disclosure" | "Research" | "Community";
  platformOrOrg: string;
  date: string;
  badge?: string;
  metric?: string;
  description: string;
  link?: string;
  variant: "green" | "blue" | "purple";
}

export const ctfRankings = [
  {
    platform: "Hack The Box",
    rank: "Top 1000 Global",
    username: "cyb3ritic",
    profileUrl: "https://app.hackthebox.com/profile/cyb3ritic",
    badgeUrl: "https://www.hackthebox.eu/badge/image/cyb3ritic",
    accent: "green" as const,
    highlights: ["Multiple Pro Lab Machine Pwns", "Web Exploitation & PrivEsc Specialist"]
  },
  {
    platform: "TryHackMe",
    rank: "Top 1% Rank",
    username: "cyb3ritic",
    profileUrl: "https://tryhackme.com/p/cyb3ritic",
    badgeUrl: "https://tryhackme-badges.s3.amazonaws.com/cyb3ritic.png",
    accent: "blue" as const,
    highlights: ["Web Security Path Completed", "Red Teaming & Offensive Security Labs"]
  }
];

export const achievements: Achievement[] = [
  // {
  //   id: "htb-top-1000",
  //   title: "Hack The Box - Top 1000 Global Ranking",
  //   category: "CTF",
  //   platformOrOrg: "Hack The Box",
  //   date: "2024",
  //   metric: "Top 1000",
  //   description: "Ranked among the top 1000 security researchers globally on Hack The Box, demonstrating consistent problem-solving skills across web exploitation, kernel privilege escalation, and active directory labs.",
  //   link: "https://app.hackthebox.com",
  //   variant: "green"
  // },
  {
    id: "pentestpal-release",
    title: "PentestPal Security Toolkit Release",
    category: "Research",
    platformOrOrg: "Open Source",
    date: "2024",
    metric: "100% Open Source",
    description: "Designed and released PentestPal, a modular Python penetration testing CLI framework supporting automated OWASP Top 10 vulnerability checks and reporting.",
    link: "https://github.com/cyb3ritic/ComputerSecurityProject",
    variant: "purple"
  },
  // {
  //   id: "vapt-cert",
  //   title: "Vulnerability Assessment & Pen Testing Certification",
  //   category: "Research",
  //   platformOrOrg: "Udemy",
  //   date: "Feb 2025",
  //   metric: "Certified",
  //   description: "Validated hands-on expertise in network auditing, web application penetration testing methodology, and risk mitigation.",
  //   link: "https://ude.my/UC-b5eabe86-f454-4e38-9164-0680c43fd229",
  //   variant: "purple"
  // },
  {
    id: "blog-research",
    title: "Technical Research & Machine Writeups",
    category: "Community",
    platformOrOrg: "blog.samipshah.com.np",
    date: "Ongoing",
    metric: "Author & Maintainer",
    description: "Publishing detailed step-by-step walkthroughs, POCs, and mitigation strategies for web applications and Linux privilege escalation pathways.",
    link: "https://blog.samipshah.com.np",
    variant: "green"
  }
];
