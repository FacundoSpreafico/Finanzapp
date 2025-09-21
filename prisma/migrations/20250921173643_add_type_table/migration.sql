/*
  Warnings:

  - You are about to drop the column `type` on the `categories` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "color" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categories_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_categories" ("color", "createdAt", "id", "name", "updatedAt", "userId") SELECT "color", "createdAt", "id", "name", "updatedAt", "userId" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "types_description_key" ON "types"("description");
