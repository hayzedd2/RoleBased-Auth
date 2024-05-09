import { signOut } from "next-auth/react";
import React from "react";

interface logoutButtonProps {
  children?: React.ReactNode;
}
const LogoutButton = ({ children }: logoutButtonProps) => {
  const onSignOut = () => {
    signOut();
  };
  return (
    <span onClick={onSignOut} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
