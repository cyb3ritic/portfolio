import React, { useState, useEffect } from "react";
import { Users, Quote, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useTilt } from "@/hooks/useTilt";

const testimonials = [
  {
    name: "Sahil Kumar Gupta",
    role: "Web Developer, Freelance",
    text: "Working with cyb3ritic was a game changer for our infrastructure. Their thorough assessments helped us patch critical issues before they could be exploited.",
    avatar: "https://avatars.githubusercontent.com/u/100503629?v=4",
  },
  {
    name: "Sajjad Shaik",
    role: "SecOps Lead, Freelance",
    text: "Incredible attention to detail and skillset in both red and blue teaming. Highly recommend for any organization serious about security.",
    avatar: "https://avatars.githubusercontent.com/u/144129332?v=4",
  },
  {
    name: "Priya Sharma",
    role: "Pentester, Freelance",
    text: "I learned so much from their mentorship and open source tools. Always approachable, always innovating.",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=00FF41&color=0D0D0D&bold=true",
  },
];

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  avatar: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, text, avatar, delay }) => {
  const { tiltStyle, isHovered, handlers } = useTilt({ maxTilt: 20, scale: 1.02 });
  const [isVisible, setIsVisible] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div 
      ref={ref}
      className={`cyber-card card-green p-6 flex flex-col items-center text-center cyber-card-3d transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`} 
      style={{
        ...tiltStyle,
        transition: `opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
        willChange: 'transform',
      }}
      {...handlers}
    >
      <img 
        src={avatar} 
        alt={name} 
        className={`w-14 h-14 rounded-full border-2 border-cyber-green mb-4 transition-all duration-300 ${
          isHovered ? 'shadow-glow-green scale-110' : ''
        }`}
        loading="lazy"
      />
      <p className="text-gray-200 italic mb-4 flex-1 relative px-2">
        <Quote 
          className={`absolute left-0 -top-4 text-cyber-green opacity-40 transition-all ${
            isHovered ? 'animate-pulse scale-110' : ''
          }`} 
          size={18} 
        />
        "{text}"
      </p>
      <div className={`text-sm font-bold mt-2 text-cyber-green transition-transform duration-300 ${
        isHovered ? 'scale-105' : ''
      }`}>
        {name}
      </div>
      <div className="text-xs text-gray-400">{role}</div>
      <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={`text-cyber-green transition-all ${
              isHovered ? 'animate-pulse scale-110' : 'opacity-80'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold flex items-center mb-10">
          <span className="cyber-text-gradient mr-2 flex items-center">
            <Users size={24} className="text-cyber-green mr-2" />
            Testimonials
          </span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              text={t.text}
              avatar={t.avatar}
              delay={idx * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}