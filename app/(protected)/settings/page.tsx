import { CurrentUser } from "@/lib/authServer";
import React from "react";
import { SettingsForm } from "@/components/auth/SettingsForm";

const SettingsPage = async () => {
  const user = await CurrentUser();
  return <SettingsForm/>;
};

export default SettingsPage;
