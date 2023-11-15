import { useState, useEffect } from "react";
import { Modes } from "../constants/index";
import { useAppSelector } from "../store/hooks";

export const useMode = () => {
  const [mode, setMode] = useState<string>(Modes.SIGNUP);
  const { isUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isUser) {
      setMode(Modes.LOGIN);
      return;
    }
    setMode(Modes.SIGNUP);
  }, [isUser]);

  const handleMode = (variant: string) => {
    setMode(variant);
  };

  return { mode, handleMode };
};
