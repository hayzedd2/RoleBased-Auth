"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import {signIn} from "next-auth/react"
import { FaGithub } from "react-icons/fa";
import { defaultRedirectRoute } from "@/routes";

export const Socials = () => {
  const onClick = (provider : "google" | "github")=>{
    signIn(provider,{
      callbackUrl : defaultRedirectRoute
    })
  }
  return (
    <div className="w-full flex items-center justify-center gap-x-2">
      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>

      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
