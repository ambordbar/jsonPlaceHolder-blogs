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
            className={` ${className}`}
        >
            {label}
        </button>
    );
};

