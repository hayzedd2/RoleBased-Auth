"use client";

import { RoleGate } from "@/components/auth/RoleGate";
import { FormSuccess } from "@/components/custom-components/FormSuccess";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUserRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  const userRole = useCurrentUserRole();
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-[1.3rem] font-semibold text-center">Admin Page</p>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message="You are an admin"/>

        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
