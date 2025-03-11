"use client";
import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title?: string;
  description: string;
  action?: {
    label: string;
    href: string;
  }
}

const Card = ({ icon, title, action, description }: CardProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center hover:scale-105 transition-all border-none"
        style={{ 
          boxShadow: "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000",
        }}
    >
      {/* Icône */}
      <div className="flex items-center justify-center m-auto my-5 w-20 h-20 border border-red-600 rounded-full shadow-neon">
        {icon}
      </div>

      {/* Titre facultaif */}
      {title && <h3 className="text-xl font-bold">{title}</h3>}
      
      {/* Description */}
      <p className="text-gray-300 text-md my-5">{description}</p>
      
      {/* CTA facultatif */}
      {action && (
        <a
          href={action.href}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:scale-105 transition shadow-neon block mt-4"
        >
          {action.label}
        </a>
      )}
    </div>
  );
};

export default Card;
