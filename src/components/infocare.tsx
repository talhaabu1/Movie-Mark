const InfoCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative border-y border-gray-200 bg-[repeating-linear-gradient(-45deg,_#f5f5f5_0px,_#f5f5f5_4px,_transparent_4px,_transparent_8px)] py-10">
      <div className="max-w-4xl mx-auto rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        {children}
      </div>
    </section>
  );
};

export default InfoCard;
