import { CurrentUser } from "@/lib/authServer";
import React from "react";
import { UserInfo } from "../_components/UserInfo";

const SettingsPage = async () => {
  const user = await CurrentUser();
  return <UserInfo label="User Info" user={user} />;
};

export default SettingsPage;
