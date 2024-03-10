import { ListCountryViewModel } from "@/services/countries.service";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Dl, DContainer, Dt, Dd } from "./ui/detail-field";
import Link from "next/link";
import Image from "next/image";

export function CountryList(params: {
  loading: boolean;
  error: boolean;
  dataSource: ListCountryViewModel[];
}) {
  if (params.loading) {
    return <span className="block text-center text-xl">Loading...</span>;
  }
  if (params.error) {
    return (
      <span className="block text-center text-xl">
        An error occurred, please try again later
      </span>
    );
  }
  if (!params.dataSource?.length) {
    return <span className="block text-center text-xl">No results found</span>;
  }
  return (
    <section className="grid grid-cols-1 justify-items-center gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {params.dataSource.map((item, index) => (
        <Card
          key={index}
          className="w-full max-w-[17rem] transform transition duration-300 hover:scale-105"
        >
          <Link href={`/country/${item.countryCode3}`}>
            <Image
              className="w-full max-w-fit"
              width={500}
              height={150}
              src={item.flagUrl}
              alt={item.flagAlt}
            ></Image>
            <CardHeader>
              <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Dl>
                <DContainer>
                  <Dt>Population:</Dt>
                  <Dd>{item.population}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Region:</Dt>
                  <Dd>{item.region}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Capital:</Dt>
                  <Dd>{item.capital}</Dd>
                </DContainer>
              </Dl>
            </CardContent>
          </Link>
        </Card>
      ))}
    </section>
  );
}
