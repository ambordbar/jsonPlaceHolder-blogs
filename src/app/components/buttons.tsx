'use client'
import React from "react";

interface ButtonProps {
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
}

export default function buttons({ label, onClick, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-gray-900 text-white p-2 rounded-full ${className}`}
        >
            {label}
        </button>
    );
};

