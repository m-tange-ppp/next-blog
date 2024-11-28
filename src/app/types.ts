import { NextResponse } from "next/server";

export type PostProps = {
    id: number;
    title: string;
    description: string;
    date: Date;
};

export type AllBlogsProps = {
    message: string;
    posts: PostProps[];
};
