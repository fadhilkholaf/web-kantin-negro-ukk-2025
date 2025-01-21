import { findSiswa } from "@/database/siswa";
import { auth } from "@/lib/auth";

import Header from "./Header";

export const revalidate = 0;

const Navbar = async () => {
  const session = await auth();

  let siswa;

  if (session) {
    siswa = await findSiswa({ userId: session.user.id });
  }

  return (
    <div>
      <Header session={session} foto={siswa?.foto} />
    </div>
  );
};

export default Navbar;
