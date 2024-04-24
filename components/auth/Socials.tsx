"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Socials = () => {
  return (
    <div className="w-full flex items-center justify-center gap-x-2">
      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={() => {}}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>

      <Button
        variant={"outline"}
        className="w-full"
        size={"lg"}
        onClick={() => {}}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
