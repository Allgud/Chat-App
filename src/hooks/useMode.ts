import { useState } from "react";
import { Modes } from "../constants/index";

export const useMode = () => {
  const [mode, setMode] = useState<string>(Modes.SIGNUP);

  const handleMode = (variant: string) => {
    setMode(variant);
  };

  return { mode, handleMode };
};
