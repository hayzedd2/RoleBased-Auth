import { CurrentUser } from "@/lib/authServer";
import React from "react";
import { UserInfo } from "../_components/UserInfo";

const serverPage = async () => {
  const user = await CurrentUser();
  return <UserInfo label="User Server Info" user={user} />;
};

export default serverPage;
