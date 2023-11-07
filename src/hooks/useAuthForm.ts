import { SyntheticEvent, useState } from "react";

export const useAuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    switch (target.name) {
      case "display-name":
        setName(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        setEmail("");
        setName("");
        setPassword("");
    }
  };

  return {
    name,
    email,
    password,
    handleChange,
  };
};