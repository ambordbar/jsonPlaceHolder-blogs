"use client";

import { useEffect, useState } from "react";
import close from "../../../public/svg/close.svg"
import Image from "next/image";

interface InputField {
    name: string;
    type: "text" | "email" | "password" | "number";
    placeholder?: string;
}

interface ModalProps {
    isOpen: boolean;
    formName: string;
    onClose: () => void;
    onSubmit: (formData: Record<string, string>) => void;
    inputFields: InputField[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, formName, onClose, onSubmit, inputFields }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false);
            setFormData({});
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    const isFormValid = inputFields.every((field) => formData[field.name]?.trim());

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`relative bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300
            ${isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}>
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-bold ">{formName}</h2>
                    <button onClick={onClose} className=" text-gray-500 hover:text-red-500">
                        <Image src={close} alt="Not Liked" width={14} height={14} className='transition-all duration-500 transform scale-100 hover:scale-110' />
                    </button>
                </div>
                {inputFields.map((field, index) => (
                    <div className="text-gray-700" key={index}>
                        <label className="block mb-1 text-sm font-medium">{field.name}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder || field.name}
                            className="w-full p-2 mb-3 border border-gray-300 rounded placeholder:text-md placeholder:text-gray-300"
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <div className="flex justify-between mt-4">
                    <button
                        className={`px-4 py-2 rounded text-white transition mx-auto w-full ${isFormValid ? "bg-blue-500 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
                            }`}
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
