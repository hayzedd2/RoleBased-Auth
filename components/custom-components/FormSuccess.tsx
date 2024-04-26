import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className=" bg-emerald-500/15 font-[500] p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FaRegCircleCheck className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
