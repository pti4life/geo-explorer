"use client";

import { Header } from "@/components/header";
import { Search } from "@/components/search";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mt-10">
        <h1 className="sr-only">Country list page</h1>
        <div className="flex gap-4 flex-wrap justify-between">
          <Search
            placeholder="Search for a country"
            className="max-w-[22rem]"
          />
          <Select defaultValue="">
            <SelectTrigger className="max-w-[10rem]">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="america">America</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </main>
    </>
  );
}
