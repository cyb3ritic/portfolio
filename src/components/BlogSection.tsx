
import React, { useState } from "react";
import { LinkIcon } from "lucide-react";
import BlogCard from "./BlogCard";
import AnimatedSection from "./AnimatedSection";
import AsciiArt, { ASCII_ART } from "./AsciiArt";
import BlogModal from "./blogs/BlogModal";

import { blogPosts, BlogPost } from "@/data/blogs";

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
