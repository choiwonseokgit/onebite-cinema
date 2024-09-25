"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const [searchVal, setSearchVal] = useState("");

  const handleChangeSearchVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = () => {
    if (!searchVal || q === searchVal) return;
    router.push(`/search?q=${searchVal}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    setSearchVal(q || "");
  }, [q]);

  return (
    <div>
      <input
        type="text"
        value={searchVal}
        onChange={handleChangeSearchVal}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>검색</button>
    </div>
  );
}
