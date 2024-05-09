import { useSession } from "next-auth/react";

export const useCurrentUserRole = () => {
  const userRole = useSession();

  return userRole.data?.user.role;
};
