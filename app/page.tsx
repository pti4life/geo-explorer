"use client";

import { CountryList } from "@/components/country-list";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDebounce } from "@/lib/client-utils";
import { useCountries } from "@/services/countries.service";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useCountries();

  const [searchCountry, setSearchCountry] = useState("");
  const [region, setRegion] = useState("empty");
  const [results, setResults] = useState([] as typeof data);

  // select issue: https://github.com/radix-ui/primitives/issues/1658
  const [selectOpen, setSelectOpen] = useState(false);

  const onFilter = () => {
    if (!data) {
      return;
    }
    let dataSource = [...data];
    if (region && region !== "empty") {
      dataSource = dataSource.filter((country) => country.region === region);
    }
    if (searchCountry) {
      dataSource = dataSource.filter((country) =>
        country.name
          .toLocaleLowerCase()
          .includes(searchCountry.toLocaleLowerCase()),
      );
    }
    setResults(dataSource);
  };
  const debouncedValue = useDebounce(searchCountry, 600);
  useEffect(() => onFilter(), [debouncedValue]);
  useEffect(() => onFilter(), [data]);
  useEffect(() => onFilter(), [region]);

  return (
    <>
      <Header />
      <main className="container mb-16 mt-10">
        <h1 className="sr-only">Country list page</h1>
        <section className="mb-10 flex flex-wrap justify-between gap-4">
          <div className="relative w-[22rem]">
            <Search className="absolute left-4 top-[calc(50%_-_0.5rem)] h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(val) => setSearchCountry(val.target.value)}
              placeholder="Search for a country..."
              className="h-12 w-full pl-16"
            />
          </div>
          <Select
            defaultValue={region}
            onValueChange={(val) => setRegion(val)}
            open={selectOpen}
            onOpenChange={() => {
              setTimeout(() => {
                setSelectOpen(!selectOpen);
              });
            }}
          >
            <SelectTrigger className="h-12 max-w-[12rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empty">Filter by Region</SelectItem>
              <SelectItem value="Africa">Africa</SelectItem>
              <SelectItem value="Americas">America</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
              <SelectItem value="Antarctic">Antarctic</SelectItem>
            </SelectContent>
          </Select>
        </section>
        <CountryList dataSource={results!} error={error} loading={isLoading} />
      </main>
    </>
  );
}
