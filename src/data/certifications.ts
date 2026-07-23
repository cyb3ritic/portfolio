export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialLink: string;
  logo: string;
  variant?: "green" | "blue" | "purple";
}

export const certifications: Certification[] = [
  {
    id: "vapt-udemy",
    title: "Cybersecurity: Vulnerability Assessment & Pen Testing (VAPT)",
    issuer: "Udemy",
    date: "February 2025",
    credentialLink: "https://ude.my/UC-b5eabe86-f454-4e38-9164-0680c43fd229",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/udemy_logo.jpeg",
    variant: "blue"
  },
  {
    id: "threat-intel-arcx",
    title: "Foundation Level Threat Intelligence Analyst",
    issuer: "arcX",
    date: "February 2025",
    credentialLink: "https://arcx.io/verify-certificate?id=1bd44f31773a01f9b776ed9a9cff3b52479c540e&k=f8eae9f09e8d405889ea888b04fc4c0a",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/arcx_training_logo.jpeg",
    variant: "purple"
  },
  {
    id: "ehe-eccouncil",
    title: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    date: "April 2023",
    credentialLink: "https://codered.eccouncil.org/certificate/e42c9774-634c-4cf0-9c13-07222a120199",
    logo: "https://raw.githubusercontent.com/cyb3ritic/images/refs/heads/master/banners/ec_council_logo.jpeg",
    variant: "green"
  }
];
