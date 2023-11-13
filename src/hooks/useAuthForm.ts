import { ChangeEvent, SyntheticEvent, useState } from "react";

export const useAuthForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<Blob>()

  const handleChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    switch (target.name) {
      case "display-name":
        setDisplayName(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        setEmail("");
        setDisplayName("");
        setPassword("");
    }
  };

  const addAvatar = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    if (target.files) {
      const file = target.files[0]
      setAvatar(file)
    }
    
  }

  return {
    displayName,
    email,
    password,
    handleChange,
    addAvatar,
    avatar
  };
};
