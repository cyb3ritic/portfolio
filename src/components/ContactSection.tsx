import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CyberButton from "./CyberButton";
import AnimatedSection from "./AnimatedSection";
import { MessageSquare } from "lucide-react";
import AsciiArt, { ASCII_ART } from "./AsciiArt";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const SERVICE_ID = "service_62bswkk";
const TEMPLATE_ID = "template_taab8ah";
const PUBLIC_KEY = "JIS1fPtvdAXDmL7OZ";

const ContactSection = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string) => {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  };

  // Validate form fields
  const validateForm = () => {
    if (!form.name.trim()) {
      return { isValid: false, message: "🙃 Hey there! Don't forget to tell us your name." };
    }
    if (!form.email.trim()) {
      return { isValid: false, message: "📧 Oops! We need your email to get back to you." };
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(form.email.trim())) {
      return { isValid: false, message: "🤔 Hmm... That doesn't look like a valid email address." };
    }
    if (!form.subject.trim()) {
      return { isValid: false, message: "📝 What's the subject of your message? Please fill it in!" };
    }
    if (!form.message.trim()) {
      return { isValid: false, message: "✍️ Got a message for us? We'd love to hear it! Please write something." };
    }
    return { isValid: true, message: "" };
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      toast({
        title: "Form Error",
        description: validation.message,
        variant: "destructive", // Changed from "purple"
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      name: sanitizeInput(form.name.trim()),
      email: sanitizeInput(form.email.trim()),
      subject: sanitizeInput(form.subject.trim()),
      message: sanitizeInput(form.message.trim()),
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast({
          title: "🎉 Woohoo! Your message has been sent successfully!",
          description: "Thanks for reaching out! I'll get back to you soon.",
          variant: "default", // Changed from "cyber-green"
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        formRef.current?.reset();
      })
      .catch(() => {
        toast({
          title: "😕 Uh-oh! Something went wrong.",
          description: "Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <AsciiArt art={ASCII_ART.CONTACT} className="mb-4" />
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <MessageSquare className="mr-2 text-cyber-purple" size={24} />
              <span className="cyber-text-gradient">Contact Me</span>
            </h2>
            <Card className="bg-cyber-dark border border-cyber-purple/30 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-xl text-cyber-purple">Send a Secure Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" id="contact-form" autoComplete="off">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1 text-gray-300">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-cyber-black border-cyber-purple/30 focus:border-cyber-purple"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1 text-gray-300">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-cyber-black border-cyber-purple/30 focus:border-cyber-purple"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm mb-1 text-gray-300">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      className="bg-cyber-black border-cyber-purple/30 focus:border-cyber-purple"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm mb-1 text-gray-300">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      className="bg-cyber-black border-cyber-purple/30 focus:border-cyber-purple"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <CyberButton variant="purple" type="submit" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </CyberButton>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="cyber-card card-purple border-cyber-purple/20 text-center p-6">
                <h3 className="text-cyber-purple text-lg mb-2">Email</h3>
                <p className="text-gray-300">cy3ritic@gmail.com</p>
              </div>
              <div className="cyber-card card-blue border-cyber-blue/20 text-center p-6">
                <h3 className="text-cyber-blue text-lg mb-2">Github</h3>
                <p className="text-gray-300">@cyb3ritic</p>
              </div>
              <div className="cyber-card card-green border-cyber-green/20 text-center p-6">
                <h3 className="text-cyber-green text-lg mb-2">Linkedin</h3>
                <p className="text-gray-300">@cyb3ritic</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
