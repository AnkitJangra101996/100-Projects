const Background = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[120px]" />
    </div>
  );
};

export default Background;
