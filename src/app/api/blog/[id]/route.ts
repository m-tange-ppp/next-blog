import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ブログ詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const post = await prisma.post.findFirst({ where: { id }});
        return NextResponse.json({ message: "Success", post: post}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, { status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        const { title, description } = await req.json();

        await main();
        const post = await prisma.post.update({
            data: { title, description }, 
            where: { id }
        }, );
        return NextResponse.json({ message: "Success", post: post}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, { status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ記事削除API
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const post = await prisma.post.delete({ where: { id }});
        return NextResponse.json({ message: "Success", post: post}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error", error}, { status: 500});
    } finally {
        await prisma.$disconnect();
    }
};