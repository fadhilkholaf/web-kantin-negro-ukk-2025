-- CreateTable
CREATE TABLE "UserStan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stanId" TEXT NOT NULL,

    CONSTRAINT "UserStan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserStan" ADD CONSTRAINT "UserStan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStan" ADD CONSTRAINT "UserStan_stanId_fkey" FOREIGN KEY ("stanId") REFERENCES "Stan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
