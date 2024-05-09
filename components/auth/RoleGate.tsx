import { useCurrentUserRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { FormError } from "../custom-components/FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const userRole = useCurrentUserRole();
  if (userRole !== allowedRole) {
    return <FormError message="You do not have permission to view this!" />;
  }
  return <div>{children}</div>;
};
