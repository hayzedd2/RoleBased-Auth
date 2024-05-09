import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="radialbg">
      <Navbar />
      <div className="my-5">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
