/*
  Warnings:

  - Added the required column `creator_user_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "creator_user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
