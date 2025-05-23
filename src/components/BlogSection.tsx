
import React, { useState } from "react";
import { LinkIcon } from "lucide-react";
import BlogCard from "./BlogCard";
import AnimatedSection from "./AnimatedSection";
import AsciiArt, { ASCII_ART } from "./AsciiArt";
import BlogModal from "./blogs/BlogModal";

interface BlogPost {
  title: string;
  description: string;
  platform: "HackTheBox" | "TryHackMe";
  difficulty: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  imageUrl: string;
  variant: "green" | "blue" | "purple";
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "HTB: Devvortex Writeup",
    description: "A step-by-step walkthrough of Hack The Box's Devvortex machine, featuring Joomla CMS exploitation.",
    platform: "HackTheBox" as const,
    difficulty: "Easy",
    date: "2024-08-5",
    readTime: "8 min read",
    tags: ["Web App", "CMS", "Joomla", "PrivEsc"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/devvortex",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/htb/machines/devvortex/devvortex_info.png",
    variant: "green" as const,
    content: "# HTB: Devvortex Writeup\n\nIn this walkthrough, I'll demonstrate how I exploited a vulnerable Joomla CMS installation to gain initial access, then leveraged a privilege escalation vulnerability to obtain root access on the Hack The Box Devvortex machine.\n\n## Initial Reconnaissance\n\nThe first step was to identify what services were running on the target..."
  },
  {
    title: "THM: Vulnversity Challenge",
    description: "Solving TryHackMe's Vulnversity room by exploiting file upload vulnerabilities and privilege escalation techniques.",
    platform: "TryHackMe" as const,
    difficulty: "Easy",
    date: "2024-08-22",
    readTime: "12 min read",
    tags: ["File Upload", "Web Exploitation", "Privilege Escalation", "Linux"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/vulnversity",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/thm/vulnversity/vulnversity_logo.png",
    variant: "blue" as const,
    content: "# TryHackMe: Vulnversity Challenge\n\nThis beginner-friendly room focuses on identifying and exploiting a file upload vulnerability in a university web application, followed by privilege escalation to gain root access.\n\n## Enumeration\n\nStarting with a comprehensive scan revealed a web server running on port 3333 with multiple endpoints. The internal file upload system was found to be vulnerable to reverse shell uploads after testing various file extensions..."
  },
  {
    title: "HTB: Busqueda — Exploiting Custom Search Engine",
    description: "A walkthrough of Hack The Box's Busqueda machine, focusing on exploiting a Python Flask web app and abusing Git configuration for privilege escalation.",
    platform: "HackTheBox" as const,
    difficulty: "Easy",
    date: "2024-08-06",
    readTime: "3 min read",
    tags: ["Web Exploitation", "Git", "Python Flask", "Privilege Escalation"],
    link: "https://blog.samipshah.com.np/posts/htb/machines/busqueda",
    imageUrl: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/htb/machines/busqueda/busqueda_info.png",
    variant: "purple" as const,
    content: "# HTB: Busqueda — Exploiting a Custom Search Engine\n\nThis write-up covers the exploitation of *Busqueda*, a Hack The Box machine featuring a vulnerable Python Flask web application and insecure Git configurations leading to root access.\n\n## Enumeration\n\nInitial scanning revealed a web app running on port 80, hosting a custom search engine. Further inspection exposed exposed Git directories and Flask debug mode, allowing for RCE..."
  }
];

const BlogSection: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AsciiArt art={ASCII_ART.BLOG} className="mb-4" />
          
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <LinkIcon className="mr-2 text-cyber-green" size={24} />
              <span className="cyber-text-gradient">Blog and Writeups</span>
            </h2>
            
            <p className="text-gray-300 mb-10 max-w-3xl">
              Explore my detailed writeups from Hack The Box, TryHackMe, and other platforms. 
              I document vulnerabilities, exploitation techniques, and defensive measures to share knowledge with the security community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div
                  key={post.title} 
                  className="cursor-pointer transform transition-all hover:scale-[1.02]"
                  onClick={() => setSelectedBlog(post)}
                >
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <a 
                href="https://blog.samipshah.com.np" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyber-green hover:underline"
              >
                View all blog posts
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </section>
  );
};

export default BlogSection;
