const Loading = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-neutral/10 text-3xl">
      <h1 className="font-italiana font-bold tracking-wider text-primary">
        Loading
      </h1>
      <div className="relative h-[50px] w-[50px] animate-spin">
        <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-primary"></span>
        <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 rotate-45 bg-primary"></span>
        <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 rotate-90 bg-primary"></span>
        <span className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 rotate-[135deg] bg-primary"></span>
      </div>
    </main>
  );
};

export default Loading;
