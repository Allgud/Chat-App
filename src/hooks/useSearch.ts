import { useState } from "react";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleCahnge = (text: string) => {
    setSearchValue(text)
  }

  return {
    searchValue,
    handleCahnge
  }
}