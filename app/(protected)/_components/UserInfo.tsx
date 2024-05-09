import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  const childClassname: string =
    "truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md";
  const parentClassname: string =
    "flex flex-row items-center justify-between rounded-lg border shadow-sm p-3";
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-[1.3rem] font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={parentClassname}>
          <p className="text-sm font-medium">userId</p>
          <p className={childClassname}>{user?.id}</p>
        </div>
        <div className={parentClassname}>
          <p className="text-sm font-medium">Name</p>
          <p className={`${childClassname} capitalize`}>{user?.name}</p>
        </div>
        <div className={parentClassname}>
          <p className="text-sm font-medium">Email</p>
          <p className={childClassname}>{user?.email}</p>
        </div>
        <div className={parentClassname}>
          <p className="text-sm font-medium">Role</p>
          <p className={childClassname}>{user?.role}</p>
        </div>
        <div className={parentClassname}>
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <p className={childClassname}>{user?.isTwoFactorEnabled ? "ON" : "OFF"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
