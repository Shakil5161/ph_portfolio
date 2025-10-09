-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
