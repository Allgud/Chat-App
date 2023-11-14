import { ReactNode } from "react";

export type AuthFormProps = {
  mode: string;
  handleMode: (arg1: string) => void;
};

export type SearchProps = {
  value: string;
  onChange: (arg1: string) => void;
};

export type ContactProps = {
  avatar?: string;
  username: string;
  lastMessage: string;
};

export type ChatProps = {
  avatar?: string;
  username: string;
  messages?: string[];
};

export type RouteProps = {
  children: ReactNode;
};

export type MessageProps = {
  author: string;
};

export type UserProps = {
  displayName?: string;
  email: string;
  password: string;
  avatar: Blob;
};

export interface IUser {
  displayName: string,
  email: string,
  id: string,
  photoUrl: string
}
