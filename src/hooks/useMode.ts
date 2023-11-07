import { useState } from "react";

export const useMode = () => {
  const [mode, setMode] = useState("login");

  const handleMode = (variant: string) => {
    setMode(variant);
  };

  return { mode, handleMode };
};