
import React, { useState } from 'react';

const Footer = ({ onEasterEggClick }: { onEasterEggClick: () => void }) => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm mb-4">
          © {new Date().getFullYear()}{" "}
          <a href="https://samipshah.com.np">cyb3ritic</a> • Ethically
          hacking since 2023
        </p>

        <p className="text-gray-600 text-xs">
          <span className="font-mono">
            // Hint: Try the Konami code for a surprise
          </span>
        </p>

        <div
          className="h-4 w-4 mx-auto mt-4 cursor-pointer"
          onClick={onEasterEggClick}
          aria-hidden="true"
        />
      </div>
    </footer>
  );
};

export default Footer;
