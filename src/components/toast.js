import React from "react";

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="toast toast-bottom toast-right z-[600]">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
