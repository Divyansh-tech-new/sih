import React from "react";

// Simple sidebar components for the layout
export const SidebarProvider = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export const Sidebar = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SidebarHeader = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SidebarContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex-1 p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};