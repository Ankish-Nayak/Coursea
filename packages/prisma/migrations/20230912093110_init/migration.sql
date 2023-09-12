-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_id_fkey";

-- CreateTable
CREATE TABLE "_CourseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToUser_AB_unique" ON "_CourseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToUser_B_index" ON "_CourseToUser"("B");

-- AddForeignKey
ALTER TABLE "_CourseToUser" ADD CONSTRAINT "_CourseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToUser" ADD CONSTRAINT "_CourseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
