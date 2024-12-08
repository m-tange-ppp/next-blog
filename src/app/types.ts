export type PostType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updateAt: Date;
};

export type AllBlogsType = {
  message: string;
  posts: PostType[];
};
