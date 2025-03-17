"use client";

import { useEffect, useState } from "react";
import close from "../../../../public/svg/close.svg";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  formName: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  formName,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`relative bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300
            ${isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold text-customBorderColor">
            {formName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <Image
              src={close}
              alt="Close"
              width={14}
              height={14}
              className="transition-all duration-500 transform scale-100 hover:scale-110"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
