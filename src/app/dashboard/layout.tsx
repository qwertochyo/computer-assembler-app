import type { ReactNode } from "react";

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className="container mx-auto max-w-5xl mt-8">{children}</div>;
};

export default DashboardLayout;
