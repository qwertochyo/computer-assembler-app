const BuildsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="container mx-auto max-w-5xl px-5 lg:px-0">{children}</div>;
};

export default BuildsLayout;
