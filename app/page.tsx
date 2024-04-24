import { LoginButton } from "@/components/auth/LoginButton";
import MotionDiv from "@/components/custom-components/MotionDiv";
import { Button } from "@/components/ui/button";

export default function Home() {
  // const MotionButton = motion(Button)
  return (
    // <MotionDiv/>
    <main className="radialbg">
      <h1 className="text-[2.6rem] font-[800] text-white">Role based Auth</h1>
      <p className="text-white my-3">A simple Role based Auth Service</p>
      <LoginButton mode="modal">
        <Button size={"lg"}>Sign In</Button>
      </LoginButton>
    </main>
  );
}
