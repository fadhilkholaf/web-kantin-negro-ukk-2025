import Transaksi from "./_components/Transaksi";

const AdminStanPage = async () => {
  return (
    <main className="flex min-h-screen w-full flex-col gap-8 px-4 py-32 lg:px-8">
      <header className="flex flex-col text-primary">
        <h1 className="font-italiana text-3xl font-bold tracking-wider">
          Dashboard
        </h1>
        <p className="flex flex-wrap items-center gap-4">
          Data pemasukan bulanan
          <span className="text-xs text-red-500">
            klik untuk detail pemasukan
          </span>
        </p>
      </header>
      <main>
        <Transaksi />
      </main>
    </main>
  );
};

export default AdminStanPage;
