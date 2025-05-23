
import React, { lazy, Suspense, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import AsciiArt, { ASCII_ART } from "@/components/AsciiArt";
import CyberButton from "@/components/CyberButton";
import { FileTextIcon, ArrowRightIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import BlogModal from "@/components/blogs/BlogModal";

// Lazy load the BlogCard component
const BlogCard = lazy(() => import("@/components/BlogCard"));

const LoadingCard = () => (
  <div className="cyber-card h-64 animate-pulse">
    <div className="h-6 w-3/4 bg-cyber-dark/50 rounded mb-4"></div>
    <div className="h-4 w-1/4 bg-cyber-dark/50 rounded mb-4"></div>
    <div className="h-4 w-full bg-cyber-dark/50 rounded mb-2"></div>
    <div className="h-4 w-3/4 bg-cyber-dark/50 rounded mb-4"></div>
    <div className="h-3 w-1/5 bg-cyber-dark/50 rounded inline-block mr-2"></div>
    <div className="h-3 w-1/5 bg-cyber-dark/50 rounded inline-block mr-2"></div>
    <div className="h-3 w-1/5 bg-cyber-dark/50 rounded inline-block"></div>
    <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between">
      <div className="h-3 w-1/6 bg-cyber-dark/50 rounded"></div>
      <div className="h-3 w-1/4 bg-cyber-dark/50 rounded"></div>
    </div>
  </div>
);

interface BlogPost {
  title: string;
  description: string;
  platform: "HackTheBox" | "TryHackMe";
  difficulty: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  variant: "green" | "blue" | "purple";
  imageUrl: string;
  imageAlt: string;
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Breaking Into Pandora's Box",
    description: "A journey through a Linux machine featuring custom web applications, privilege escalation via sudo misconfiguration, and lateral movement techniques.",
    platform: "HackTheBox",
    difficulty: "Medium",
    date: "Apr 2024",
    readTime: "15 min read",
    tags: ["Web App", "Privilege Escalation", "Linux", "SUID"],
    link: "#",
    variant: "green",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Server room with glowing green lights",
    content: "# Breaking Into Pandora's Box\n\nIn this walkthrough, I'll take you through my methodology for compromising a Linux server through a series of vulnerabilities. The machine featured custom web applications with SQL injection points, a vulnerable file upload mechanism, and a sudo misconfiguration that allowed for privilege escalation.\n\n## Initial Reconnaissance\n\nFirst, I conducted a thorough port scan using `nmap` to identify open services..."
  },
  {
    title: "Cracking the CyberCorp Network",
    description: "Exploring Active Directory enumeration, Kerberoasting, and advanced Windows privilege escalation techniques in this corporate environment.",
    platform: "HackTheBox",
    difficulty: "Hard",
    date: "Mar 2024",
    readTime: "20 min read",
    tags: ["Active Directory", "Windows", "Kerberos", "PowerShell"],
    link: "#",
    variant: "blue",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Computer showing code with focus on security aspects",
    content: "# Cracking the CyberCorp Network\n\nThis hard-rated Windows machine simulated a corporate environment with Active Directory misconfigurations and weak credential policies. The challenge involved..."
  },
  {
    title: "IoT Device Exploitation",
    description: "Analyzing and exploiting vulnerabilities in an IoT-based smart home system. Features firmware analysis and custom exploit development.",
    platform: "TryHackMe",
    difficulty: "Easy",
    date: "Feb 2024",
    readTime: "12 min read",
    tags: ["IoT", "Firmware", "Reverse Engineering", "Binary"],
    link: "#",
    variant: "purple",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "IoT devices connected in a smart home environment",
    content: "# IoT Device Exploitation\n\nIn this walkthrough, I analyze the firmware of a vulnerable IoT device and demonstrate how attackers can leverage these vulnerabilities to gain control..."
  },
  {
    title: "Web Application Mayhem",
    description: "A step-by-step walkthrough of exploiting SQL injection, broken authentication, and file upload vulnerabilities in a modern web application.",
    platform: "TryHackMe",
    difficulty: "Medium",
    date: "Jan 2024",
    readTime: "18 min read",
    tags: ["Web Security", "SQLi", "File Upload", "Authentication"],
    link: "#",
    variant: "green",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Web application security concept with code editor open",
    content: "# Web Application Mayhem\n\nThis writeup walks through exploiting multiple vulnerabilities in a web application including SQL injection, broken authentication mechanisms, and unsafe file upload functionality..."
  }
];

const BlogSectionWrapper = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-cyber-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AsciiArt art={ASCII_ART.TERMINAL} className="mb-4" />

          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <FileTextIcon className="mr-2 text-cyber-green" size={24} />
              <span className="cyber-text-gradient">Hack & Learn</span>
            </h2>

            <p className="text-gray-300 mb-8 max-w-2xl">
              Deep dive into my detailed writeups and walkthroughs for various machines
              from HackTheBox and TryHackMe. Each article breaks down the methodology,
              tools used, and lessons learned.
            </p>

            <div ref={ref} className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((blog, idx) => (
                <Suspense key={blog.title} fallback={<LoadingCard />}>
                  {inView && (
                    <div 
                      className="cursor-pointer transform transition-all hover:scale-[1.02]"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <BlogCard
                        title={blog.title}
                        description={blog.description}
                        platform={blog.platform}
                        difficulty={blog.difficulty}
                        date={blog.date}
                        readTime={blog.readTime}
                        tags={blog.tags}
                        link={blog.link}
                        variant={blog.variant}
                        imageUrl={blog.imageUrl}
                        imageAlt={blog.imageAlt}
                      />
                    </div>
                  )}
                </Suspense>
              ))}
            </div>

            <div className="mt-10 text-center">
              <CyberButton
                variant="ghost"
                className="group inline-flex items-center gap-2"
              >
                <span>View All Articles</span>
                <ArrowRightIcon
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </CyberButton>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyber-green/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyber-blue/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />
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

export default BlogSectionWrapper;
