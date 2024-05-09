interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <div className="radialbg">{children}</div>;
};

export default ProtectedLayout;
