import { User } from "./user.types";

export interface Note {
  _id: string;
  userId: User;
  description: string;
  tags: string[];
  title: string;
}
