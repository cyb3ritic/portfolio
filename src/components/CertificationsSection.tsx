
import React from "react";
import { Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CertificationCard from "./CertificationCard";

import { certifications } from "@/data/certifications";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Award className="mr-2 text-cyber-blue" size={24} />
              <span className="cyber-text-gradient">Certifications</span>
            </h2>
            
            <p className="text-gray-300 mb-10 max-w-3xl">
              Professional certifications and qualifications that validate my expertise in cybersecurity 
              and ethical hacking. These represent my commitment to continuous learning and professional growth.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={cert.title}
                  title={cert.title}
                  issuer={cert.issuer}
                  date={cert.date}
                  // expiry={cert.expiry}
                  credentialLink={cert.credentialLink}
                  logo={cert.logo}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
