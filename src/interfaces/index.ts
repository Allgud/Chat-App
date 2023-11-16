import { ReactNode } from "react";

export type AuthFormProps = {
  mode: string;
  handleMode: (arg1: string) => void;
};

export type SearchProps = {
  value: string;
  onChange: (arg1: string) => void;
  onSubmit: (arg1: string) => void;
  onClear: () => void;
};

export type ContactProps = {
  avatar: string;
  username: string;
  lastMessage?: string;
  userId: string;
  onClick: (args: {[key: string]: string}) => void
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

export type LoaderProps = {
  isVisible: boolean;
};

export type SidebarNavProps = {
  displayName: string;
  imgUrl: string;
};

export interface ICurrentChat {
  chatId: string,
  timestamp: { [key: string]: number },
  userInfo: { [key: string]: string },
}
