import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { fetchCountry } from "@/services/countries.service";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DContainer, Dd, Dl, Dt } from "@/components/ui/detail-field";

export default async function CountryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const country = await fetchCountry(params.id);
  return (
    <>
      <Header />
      <main className="container mb-16 mt-16">
        <Button className="mb-10" asChild variant="outline">
          <Link className="w-[8rem]" href="/">
            <MoveLeft className="mr-2 h-6 w-6"></MoveLeft>Back
          </Link>
        </Button>
        <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <Image
            width={500}
            height={150}
            src={country.flagUrl}
            alt={country.flagAlt}
          ></Image>
          <div className="flex flex-col">
            <h1 className="mb-6 text-2xl font-bold">{country.name}</h1>
            <div className="flex w-full flex-col justify-between gap-x-2 gap-y-8 sm:flex-row">
              <Dl>
                <DContainer>
                  <Dt>Native name:</Dt>
                  <Dd>{country.nativeName}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Population:</Dt>
                  <Dd>{country.population}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Region:</Dt>
                  <Dd>{country.region}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Sub Region:</Dt>
                  <Dd>{country.subregion}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Capital:</Dt>
                  <Dd>{country.capital}</Dd>
                </DContainer>
              </Dl>
              <Dl>
                <DContainer>
                  <Dt>Top Level Domain:</Dt>
                  <Dd>{country.topLevelDomain}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Currencies:</Dt>
                  <Dd>{country.currencies}</Dd>
                </DContainer>
                <DContainer>
                  <Dt>Languages:</Dt>
                  <Dd>{country.languages}</Dd>
                </DContainer>
              </Dl>
            </div>
            {country.borderCountries?.length && (
              <DContainer className="mt-8 flex flex-col items-start gap-x-1 gap-y-4 lg:flex-row lg:items-center">
                <Dt className="text-nowrap">Border Countries:</Dt>
                <Dd className="flex flex-wrap gap-4">
                  {country.borderCountries.map((borderCountry) => (
                    <Button
                      asChild
                      key={borderCountry.code3}
                      variant="outline"
                      size="sm"
                    >
                      <Link href={`/country/${borderCountry.code3}`}>
                        {borderCountry.name}
                      </Link>
                    </Button>
                  ))}
                </Dd>
              </DContainer>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
