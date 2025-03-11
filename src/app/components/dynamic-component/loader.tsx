import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50 }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-950 z-50">
      <div
        className={`border-4 border-t-customCyen rounded-full animate-spin`}
        style={{ width: size, height: size, borderWidth: size / 10 }}
      ></div>
    </div>
  );
};

export default Loader;
