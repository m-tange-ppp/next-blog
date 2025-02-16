import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DB接続に失敗しました。");
  }
}

// ブログ全記事取得API
export const GET = async () => {
  try {
    await main();
    const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿API
export const POST = async (req: Request) => {
  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({
      data: {
        title,
        description,
        createdAt: new Date().toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        }),
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
