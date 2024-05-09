"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { Navbar } from "../_components/navbar";

const settingsPage = () => {
  const user = useCurrentUser();
  const onSignOut = () => {
    signOut();
  };
  return (
    <div>
      <Navbar />
      <button type="submit" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default settingsPage;
