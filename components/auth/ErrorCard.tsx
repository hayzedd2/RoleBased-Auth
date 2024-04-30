import { CardWrapper } from "./CardWrapper"
import { BsExclamationTriangle } from "react-icons/bs"

export const ErrorCard = () => {
  return (
   <CardWrapper headerLabel="" backButtonHref="/auth/login" backButtonLabel="Back to login" >
     <div className=" bg-destructive/15 font-[500] p-3  rounded-md flex items-center justify-center w-full gap-x-2 text-sm text-destructive">
      <BsExclamationTriangle className="w-4 h-4" />
      <p>Oops! Something went wrong</p>
    </div>
   </CardWrapper>
  )
}
