import React from "react";

export default function Button(
  { children, className = "", ...props } // 👈 Accept className prop
) {
  return (
    <button
      className={`inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide bg-primary-600 text-white transition duration-200 bg-deep-purple-accent-400 rounded shadow-md hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none ${className}
        hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-primary
        `} // 👈 Add className prop
      {...props} // 👈 Spread props
    >
      {children}
    </button>
  );
}
