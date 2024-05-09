"use client";
import React from "react";
import { UserInfo } from "../_components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const serverPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="User Client Info" user={user} />;
};

export default serverPage;
