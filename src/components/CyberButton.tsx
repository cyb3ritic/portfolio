
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-cyber-dark border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black glow glow-green dark:bg-cyber-dark dark:border-cyber-green dark:text-cyber-green dark:hover:bg-cyber-green dark:hover:text-black light:bg-gray-100 light:border-cyber-green/70 light:text-cyber-dark light:hover:bg-cyber-green/70 light:hover:text-white",
        blue:
          "bg-cyber-dark border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black glow glow-blue dark:bg-cyber-dark dark:border-cyber-blue dark:text-cyber-blue dark:hover:bg-cyber-blue dark:hover:text-black light:bg-gray-100 light:border-cyber-blue/70 light:text-cyber-dark light:hover:bg-cyber-blue/70 light:hover:text-white",
        purple:
          "bg-cyber-dark border border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-black glow glow-purple dark:bg-cyber-dark dark:border-cyber-purple dark:text-cyber-purple dark:hover:bg-cyber-purple dark:hover:text-black light:bg-gray-100 light:border-cyber-purple/70 light:text-cyber-dark light:hover:bg-cyber-purple/70 light:hover:text-white",
        ghost:
          "hover:bg-cyber-dark/50 hover:text-cyber-green dark:hover:bg-cyber-dark/50 dark:hover:text-cyber-green light:hover:bg-gray-200 light:hover:text-cyber-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CyberButton: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export default CyberButton;
