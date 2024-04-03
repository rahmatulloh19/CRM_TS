const Caption = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-8 py-6 bg-white">
      <h1 className="text-[#0061F7] text-4xl font-bold">{children}</h1>
    </div>
  );
};

export default Caption;
