export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  github: string;
  demo?: string;
  variant: "green" | "blue" | "purple";
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "pentestpal",
    title: "PentestPal",
    description: "A modular Python CLI framework that streamlines penetration testing with automated tools, tab-completion, and detailed reporting for security professionals.",
    detailedDescription: "PentestPal automates common pentesting workflows including reconnaissance, XSS testing, SQL injection probing, CSRF vulnerability checking, and SSRF verification. Features modular tool architecture, interactive prompt with tab completion, colored logging, and automated HTML/Markdown report generation.",
    tags: ["Python", "Web Security", "OWASP", "Automation", "CLI"],
    github: "https://github.com/cyb3ritic/ComputerSecurityProject",
    variant: "green",
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/pentestpal_banner.png",
    featured: true
  },
  {
    id: "websleuth",
    title: "WebSleuth",
    description: "A modular bash based website reconnaissance tool that automates intelligence gathering and analysis for ethical hackers and security researchers.",
    detailedDescription: "WebSleuth aggregates passive and active OSINT tools into a unified CLI pipeline. Performs subdomain enumeration, WHOIS/DNS lookups, tech stack detection (Wappalyzer CLI), port scanning, and directory bruteforce with feroxbuster integration.",
    tags: ["Bash", "Web Security", "OWASP", "Reconnaissance", "OSINT"],
    github: "https://github.com/cyb3ritic/websleuth",
    variant: "blue",
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/websleuth_banner.png",
    featured: true
  },
  {
    id: "pysniffer-x",
    title: "PySniffer-X",
    description: "A professional-grade packet sniffer offering live capture, deep inspection, real-time analysis, and Wireshark integration for network analysis and cybersecurity education.",
    detailedDescription: "PySniffer-X provides deep packet inspection (DPI) for TCP, UDP, ICMP, and HTTP/DNS protocols. Features payload decoding, packet filtering syntax, PCAP file export, anomaly detection alerts, and an intuitive terminal interface built with Python and Scapy.",
    tags: ["Python", "Packet Sniffer", "Network Security", "DPI", "Wireshark", "Scapy"],
    github: "https://github.com/cyb3ritic/PySniffer-X",
    variant: "purple",
    image: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/pysniffer_banner.png",
    featured: true
  }
];
