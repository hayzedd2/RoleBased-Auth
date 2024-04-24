import React from "react";
interface headerProps {
  label: string;
}
export const Header = ({ label }: headerProps) => {
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <h2 className="text-2xl font-[800] text-black">🔒 Auth</h2>
      <p>{label}</p>
    </div>
  );
};
