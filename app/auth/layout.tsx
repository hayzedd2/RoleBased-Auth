import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="radialbg">{children}</section>;
};

export default AuthLayout;
