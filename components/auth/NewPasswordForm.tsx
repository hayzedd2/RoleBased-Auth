"use client";
import * as z from "zod";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, ResetSchema } from "@/schema";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../custom-components/FormError";
import { FormSuccess } from "../custom-components/FormSuccess";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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

                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            {!isPending ? (
              <p>Reset password</p>
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
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
