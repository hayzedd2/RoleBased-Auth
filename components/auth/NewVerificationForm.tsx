"use client";

import { CardWrapper } from "./CardWrapper";
import { RotatingLines } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../custom-components/FormSuccess";
import { FormError } from "../custom-components/FormError";
import { useTransition } from "react";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = searchParams.get("token");
  console.log(token);
  const onSubmit = useCallback(() => {
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
    setSuccess("");
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        {isPending ? (
          <RotatingLines
            visible={true}
            width="26"
            strokeWidth="4"
            strokeColor="black"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        ) : (
          <>
            <FormSuccess message={success} />
            <FormError message={error} />
          </>
        )}
      </div>
    </CardWrapper>
  );
};
