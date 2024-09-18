-- CreateTable
CREATE TABLE "Profile" (
    "profileId" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);
