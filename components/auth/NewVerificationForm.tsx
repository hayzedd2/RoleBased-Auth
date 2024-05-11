"use client";

import { CardWrapper } from "./CardWrapper";
import { RotatingLines } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../custom-components/FormSuccess";
import { FormError } from "../custom-components/FormError";
import { Button } from "../ui/button";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return null;
    if (!token) {
      setError("Invalid Token!");
      return;
    }
    startTransition(() => {
      newVerification(token)
        .then((data) => (setSuccess(data.success), setError(data.error)))
        .catch(() => {
          setError("An Error occured");
        });
    });
  }, [token, success, error]);
  // useEffect(() => {
  //   onSubmit();
  // }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm your email"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        {!success &&
          !error &&
          (isPending ? (
            <Button className="w-full">
              <RotatingLines
                visible={true}
                width="24"
                strokeWidth="3"
                strokeColor="white"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </Button>
          ) : (
            <Button className="w-full" onClick={onSubmit}>
              Confirm Email
            </Button>
          ))}
        <>
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </>
      </div>
    </CardWrapper>
  );
};
