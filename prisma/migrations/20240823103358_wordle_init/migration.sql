-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "google_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "word" TEXT NOT NULL,
    "guesses" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL,
    "date_played" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "is_solution" BOOLEAN NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "games_played" INTEGER NOT NULL,
    "games_won" INTEGER NOT NULL,
    "current_streak" INTEGER NOT NULL,
    "max_streak" INTEGER NOT NULL,
    "guess_distribution" JSONB NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "words_word_key" ON "words"("word");

-- CreateIndex
CREATE UNIQUE INDEX "statistics_user_id_key" ON "statistics"("user_id");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
