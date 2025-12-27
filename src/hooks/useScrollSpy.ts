import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 0) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
      }
    );

    const elements = sectionIds.map((id) => document.getElementById(id));

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (observer) {
        elements.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      }
    };
  }, [sectionIds, offset]);

  return activeSection;
};
