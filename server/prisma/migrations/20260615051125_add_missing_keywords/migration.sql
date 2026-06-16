/*
  Warnings:

  - Added the required column `missingKeywords` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeAnalysis" ADD COLUMN     "missingKeywords" JSONB NOT NULL;
