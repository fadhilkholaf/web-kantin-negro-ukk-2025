import Image from "next/image";

const Gallery = () => {
  return (
    <section className="flex h-screen w-full flex-col bg-neutral/10">
      <header className="flex h-1/3 flex-col items-center justify-center gap-4 px-4 text-center font-italiana text-primary lg:px-8">
        <h1 className="text-[12vw] lg:text-[8vw]">For Your Pleasure</h1>
        <p className="text-xl font-bold tracking-wide">
          We serve the best stand service and delicious menus for you.
        </p>
      </header>
      <main className="flex h-2/3 items-center justify-end gap-[25px] overflow-hidden">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-shrink-0 animate-slider gap-[25px]">
            {Array.from({ length: 10 }).map((_, j) => (
              <Image
                key={j}
                src="/images/dummy.jpg"
                alt="Image Gallery"
                width={300}
                height={300}
                priority
                className="w-[300px] flex-shrink-0 border border-primary object-cover p-2"
                style={{
                  transform: `translate(0px,${Math.sin(j * 2) * 50}px) rotate(${Math.cos(j * 2) * 3}deg)`,
                }}
              />
            ))}
          </div>
        ))}
      </main>
    </section>
  );
};

export default Gallery;
