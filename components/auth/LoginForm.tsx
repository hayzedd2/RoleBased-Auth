"use client";
import * as z from "zod";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../custom-components/FormError";
import { FormSuccess } from "../custom-components/FormSuccess";
import { login } from "@/actions/login";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFcator, setShowTwoFactor] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
        if (data?.twofactor) {
          setShowTwoFactor(true);
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFcator && (
              // <FormField
              //   control={form.control}
              //   name="code"
              //   render={({ field }) => (
              //     <FormItem>
              //       <FormLabel>Two-factor code</FormLabel>
              //       <FormControl>
              //         <InputOTP maxLength={6} {...field} disabled={isPending}>
              //           <InputOTPGroup>
              //             <InputOTPSlot index={0} />
              //             <InputOTPSlot index={1} />
              //             <InputOTPSlot index={2} />
              //             <InputOTPSeparator />
              //             <InputOTPSlot index={3} />
              //             <InputOTPSlot index={4} />
              //             <InputOTPSlot index={5} />
              //           </InputOTPGroup>
              //         </InputOTP>
              //       </FormControl>
              //       <FormMessage />
              //     </FormItem>
              //   )}
              // ></FormField>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            )}

            {!showTwoFcator && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="johndoe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className={poppins.className}
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        className="px-0"
                        size={"sm"}
                        variant={"link"}
                        asChild
                      >
                        <Link href={"/auth/reset"}>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? (
              showTwoFcator ? (
                <p>Confirm</p>
              ) : (
                <p>Login</p>
              )
            ) : (
              <RotatingLines
                visible={true}
                width="24"
                strokeWidth="3"
                strokeColor="white"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            )}
            {/* {showTwoFcator ? "Confirm" : "Login"} */}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
