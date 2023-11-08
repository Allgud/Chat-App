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
