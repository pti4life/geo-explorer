"use client";
import { forwardRef } from "react";
import { Input, InputProps } from "./ui/input";

const Search = forwardRef<HTMLInputElement, InputProps>(
  function Search(props, ref) {
    function handleSearch(term: string) {
      console.log(term);
    }
    return (
      <Input
        {...props}
        ref={ref}
        onChange={(e) => handleSearch(e.target.value)}
      />
    );
  },
);

Input.displayName = "Search";

export { Search };
