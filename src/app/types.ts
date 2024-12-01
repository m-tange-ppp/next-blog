export type PostType = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

export type AllBlogsType = {
  message: string;
  posts: PostType[];
};
