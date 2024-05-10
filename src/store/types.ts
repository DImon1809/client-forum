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
  posts: any[];
  following: any[];
  likes: any[];
  comments: any[];
  isFollowing?: boolean;
}
