import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { getSearchUser, cleanSearchedFlag } from "../store/slices/chatSlice";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (text: string) => {
    dispatch(cleanSearchedFlag());
    setSearchValue(text);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleSubmit = (code: string) => {
    if (code === "Enter" || code === "NumpadEnter") {
      dispatch(getSearchUser({ text: searchValue }));
    }
  };

  return {
    searchValue,
    handleChange,
    handleSubmit,
    clearSearch,
  };
};
