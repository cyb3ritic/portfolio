
import React, { lazy, Suspense, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { BookOpenIcon, FileTextIcon, Award } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

// Lazy load the CertificationCard component
const CertificationCard = lazy(() => import("@/components/CertificationCard"));

const LoadingCard = () => (
  <div className="cyber-card h-32 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-cyber-dark/60 rounded"></div>
      <div className="flex-grow">
        <div className="h-6 w-3/4 bg-cyber-dark/50 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-cyber-dark/50 rounded mb-4"></div>
        <div className="h-3 w-1/3 bg-cyber-dark/50 rounded"></div>
      </div>
    </div>
  </div>
);

interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialLink: string;
  logo?: string;
  description?: string;
  skills?: string[];
  delay: number;
}

const certifications: Certification[] = [
  {
    title: "Offensive Security Certified Professional",
    issuer: "Offensive Security",
    date: "September 2022",
    credentialLink: "#",
    description: "The OSCP certification validates the ability to use creativity and critical thinking to identify, exploit, and document vulnerabilities in systems and networks.",
    skills: ["Penetration Testing", "Exploitation", "Privilege Escalation", "Report Writing"],
    logo: "https://www.offensive-security.com/wp-content/uploads/2019/09/offsec-logo.png",
    delay: 200
  },
  {
    title: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "March 2021",
    expiry: "March 2024",
    credentialLink: "#",
    description: "The CEH certification demonstrates knowledge of ethical hacking techniques, tools, and methodologies used to assess and enhance security postures.",
    skills: ["Ethical Hacking", "Vulnerability Assessment", "Network Security", "Social Engineering"],
    logo: "https://www.eccouncil.org/wp-content/uploads/2021/11/ceh-logo.png",
    delay: 300
  },
  {
    title: "eWPT - Web Application Penetration Tester",
    issuer: "eLearnSecurity",
    date: "July 2022",
    credentialLink: "#",
    description: "The eWPT certification validates skills in web application penetration testing methodologies and the ability to identify and exploit web vulnerabilities.",
    skills: ["Web Application Security", "XSS", "SQL Injection", "CSRF", "Authentication Bypasses"],
    logo: "https://elearnsecurity.com/wp-content/uploads/2020/09/ewpt-badge.png",
    delay: 400
  },
  {
    title: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    date: "January 2023",
    expiry: "January 2026",
    credentialLink: "#",
    description: "The AWS Security Specialty certification demonstrates expertise in security practices for the AWS Cloud platform and in-depth knowledge of data protection mechanisms.",
    skills: ["Cloud Security", "Identity & Access Management", "Data Encryption", "Logging & Monitoring", "Incident Response"],
    logo: "https://images.credly.com/size/340x340/images/53acdae5-d69f-4dda-b650-d02ed7a50dd7/image.png",
    delay: 500
  }
];

const CertificationsSectionWrapper = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <BookOpenIcon className="mr-2 text-cyber-green" size={24} />
              <span className="cyber-text-gradient">Certifications & Training</span>
            </h2>

            <div ref={ref} className="grid md:grid-cols-2 gap-6 sm:grid-cols-1">
              {certifications.map((cert, index) => (
                <Suspense key={cert.title} fallback={<LoadingCard />}>
                  {inView && (
                    <AnimatedSection animation="fade-in" delay={cert.delay}>
                      <div 
                        className="cursor-pointer transition-transform hover:scale-[1.02]"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <CertificationCard
                          title={cert.title}
                          issuer={cert.issuer}
                          date={cert.date}
                          expiry={cert.expiry}
                          credentialLink={cert.credentialLink}
                          logo={cert.logo}
                        />
                      </div>
                    </AnimatedSection>
                  )}
                </Suspense>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="sm:max-w-xl bg-cyber-dark border border-cyber-green/30 max-h-[90vh] overflow-y-auto">
          {selectedCert && (
            <div className="p-4">
              <div className="flex items-start gap-4 mb-6">
                {selectedCert.logo && (
                  <img 
                    src={selectedCert.logo}
                    alt={selectedCert.issuer}
                    className="w-16 h-16 object-contain bg-white p-1 rounded"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold mb-1 text-cyber-green">{selectedCert.title}</h3>
                  <p className="text-cyber-blue">{selectedCert.issuer}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Issued</span>
                  <span className="text-gray-200">{selectedCert.date}</span>
                </div>
                
                {selectedCert.expiry && (
                  <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Expires</span>
                    <span className="text-gray-200">{selectedCert.expiry}</span>
                  </div>
                )}
                
                {selectedCert.description && (
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-sm text-gray-400 mb-2">Description</h4>
                    <p className="text-gray-300">{selectedCert.description}</p>
                  </div>
                )}
                
                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="bg-cyber-dark border border-cyber-blue/30 px-2 py-1 text-xs rounded text-cyber-blue"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-2">
                  <a 
                    href={selectedCert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyber-blue/20 border border-cyber-blue/40 px-4 py-2 rounded text-cyber-blue hover:bg-cyber-blue/30 transition-colors"
                  >
                    <FileTextIcon size={16} />
                    Verify Credential
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificationsSectionWrapper;
