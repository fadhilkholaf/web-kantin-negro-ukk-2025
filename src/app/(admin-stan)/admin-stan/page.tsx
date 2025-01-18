import Transaksi from "./_components/Transaksi";

const AdminStanPage = async () => {
  return (
    <main className="flex h-screen w-full flex-col gap-8 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>
      <main>
        <Transaksi />
      </main>
    </main>
  );
};

export default AdminStanPage;
