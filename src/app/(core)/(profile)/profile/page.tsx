import { Metadata } from "next";
import { notFound } from "next/navigation";

import { findUserProfile } from "@/database/user";
import { auth } from "@/lib/auth";

import SiswaForm from "./_components/SiswaForm";
import AdminStanForm from "./_components/AdminStanForm";
import UserForm from "./_components/UserForm";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const userProfile = await findUserProfile({ id: session.user.id });

  return (
    <main className="flex min-h-screen w-full flex-col gap-4 px-4 py-32 lg:px-8">
      {userProfile && (
        <>
          {userProfile.role === "siswa" ? (
            <SiswaForm siswa={userProfile.siswa ?? undefined} />
          ) : (
            <AdminStanForm stan={userProfile.stan ?? undefined} />
          )}
          <UserForm user={userProfile} />
        </>
      )}
    </main>
  );
};

export default ProfilePage;
