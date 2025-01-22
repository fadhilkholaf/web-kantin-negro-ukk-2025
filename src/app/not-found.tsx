import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-neutral/10 text-center text-primary">
      <div className="bg-white p-2">
        <div className="flex flex-col gap-4 border-4 border-double border-primary p-2">
          <header>
            <h1 className="font-italiana text-3xl font-bold tracking-wider">
              Not Found
            </h1>
          </header>
          <main>
            <p>The page you searching for is not found!</p>
          </main>
          <footer className="pt-2">
            <Link
              href="/"
              className="block w-full rounded-full border border-primary px-2 py-1 hover:bg-primary hover:text-white"
            >
              Back to home
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
