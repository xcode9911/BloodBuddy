-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_gainerId_fkey";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_gainerId_fkey" FOREIGN KEY ("gainerId") REFERENCES "Gainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
