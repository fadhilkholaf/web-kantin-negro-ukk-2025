import { redirect } from "next/navigation";

import { findUserProfile } from "@/database/user";
import { auth } from "@/lib/auth";
import SiswaForm from "./_components/SiswaForm";
import AdminStanForm from "./_components/AdminStanForm";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const userProfile = await findUserProfile({ id: session.user.id });

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {userProfile &&
        (userProfile.role === "siswa" ? (
          <SiswaForm siswa={userProfile.siswa ?? undefined} />
        ) : (
          <AdminStanForm stan={userProfile.stan ?? undefined} />
        ))}
    </main>
  );
};

export default ProfilePage;
