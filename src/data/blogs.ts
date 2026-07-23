export interface BlogPost {
  id: string;
  title: string;
  description: string;
  platform: "HackTheBox" | "TryHackMe" | "Research";
  difficulty: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  imageUrl: string;
  variant: "green" | "blue" | "purple";
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "devvortex",
    title: "HTB: Devvortex Writeup",
    description: "A step-by-step walkthrough of Hack The Box's Devvortex machine, featuring Joomla CMS exploitation and privilege escalation.",
    platform: "HackTheBox",
    difficulty: "Easy",
    date: "2024-08-05",
    readTime: "8 min read",
    tags: ["Web App", "CMS", "Joomla", "PrivEsc"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/devvortex",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/htb/machines/devvortex/devvortex_info.png",
    variant: "green",
    content: "# HTB: Devvortex Writeup\n\nIn this walkthrough, I'll demonstrate how I exploited a vulnerable Joomla CMS installation to gain initial access, then leveraged a privilege escalation vulnerability to obtain root access on the Hack The Box Devvortex machine.\n\n## Initial Reconnaissance\n\nThe first step was to identify what services were running on the target using Nmap..."
  },
  {
    id: "vulnversity",
    title: "THM: Vulnversity Challenge",
    description: "Solving TryHackMe's Vulnversity room by exploiting file upload vulnerabilities and privilege escalation techniques.",
    platform: "TryHackMe",
    difficulty: "Easy",
    date: "2024-08-22",
    readTime: "12 min read",
    tags: ["File Upload", "Web Exploitation", "Privilege Escalation", "Linux"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/vulnversity",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/thm/vulnversity/vulnversity_logo.png",
    variant: "blue",
    content: "# TryHackMe: Vulnversity Challenge\n\nThis beginner-friendly room focuses on identifying and exploiting a file upload vulnerability in a university web application, followed by privilege escalation to gain root access.\n\n## Enumeration\n\nStarting with a comprehensive scan revealed a web server running on port 3333 with multiple endpoints..."
  },
  {
    id: "busqueda",
    title: "HTB: Busqueda — Custom Search Exploitation",
    description: "A walkthrough of Hack The Box's Busqueda machine, focusing on exploiting a Python Flask web app and abusing Git configuration.",
    platform: "HackTheBox",
    difficulty: "Easy",
    date: "2024-08-06",
    readTime: "3 min read",
    tags: ["Web Exploitation", "Git", "Python Flask", "Privilege Escalation"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/busqueda",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/htb/machines/busqueda/busqueda_info.png",
    variant: "purple",
    content: "# HTB: Busqueda — Exploiting a Custom Search Engine\n\nThis write-up covers the exploitation of *Busqueda*, a Hack The Box machine featuring a vulnerable Python Flask web application and insecure Git configurations leading to root access.\n\n## Enumeration\n\nInitial scanning revealed a web app running on port 80, hosting a custom search engine..."
  }
];
