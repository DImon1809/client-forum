export interface IUser {
  id: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createAt: Date;
  updateAt: Date;
  bio?: string;
  location?: string;
  posts: IPost[];
  followers: IFollows[];
  following: IFollows[];
  likes: ILike[];
  comments: IComment[];
  isFollowing?: boolean;
}

export interface IFollows {
  id: string;
  followerId: string;
  followingId: string;
  following: IUser;
  followers: IUser;
}

export interface IPost {
  id: string;
  author: IUser;
  content: string;
  authorId: string;
  likes: ILike[];
  comments: IComment[];
  likedByUser: boolean;
  createdAt: Date;
}

export interface ILike {
  id: string;
  userId: string;
  postId: string;
}

export interface IComment {
  id: string;
  content: string;
  user: IUser;
  userId: string;
  postId: string;
}
