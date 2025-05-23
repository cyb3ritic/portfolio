
import React from "react";
import { Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CertificationCard from "./CertificationCard";

const certifications = [
  {
    title: "Cybersecurity: Vulnerability Assessment & Pen Testing (VAPT)",
    issuer: "Udemy",
    date: "February 2025",
    credentialLink: "https://ude.my/UC-b5eabe86-f454-4e38-9164-0680c43fd229",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/udemy_logo.jpeg",
  },
  {
    title: "Foundation Level Threat intelligence Analyst",
    issuer: "arcX",
    date: "February 2025",
    credentialLink: "https://arcx.io/verify-certificate?id=1bd44f31773a01f9b776ed9a9cff3b52479c540e&k=f8eae9f09e8d405889ea888b04fc4c0a",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/arcx_training_logo.jpeg",
  },
  {
    title: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "April 2023",
    // expiry: "July 2025",
    credentialLink: "https://codered.eccouncil.org/certificate/e42c9774-634c-4cf0-9c13-07222a120199",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/ec_council_logo.jpeg",
  }
];

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
