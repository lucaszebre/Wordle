-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "number" TEXT,
    "extraInfo" JSONB,
    "personality" JSONB,
    "hobbies" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVInfo" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CVInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LetterModel" (
    "id" TEXT NOT NULL,
    "modelContent" JSONB NOT NULL,

    CONSTRAINT "LetterModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplyHistory" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "version" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "ApplyHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MVPsubscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MVPsubscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "MVPsubscribers_email_key" ON "MVPsubscribers"("email");

-- AddForeignKey
ALTER TABLE "CVInfo" ADD CONSTRAINT "CVInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplyHistory" ADD CONSTRAINT "ApplyHistory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
