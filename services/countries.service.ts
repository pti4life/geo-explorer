import useSWR from "swr";

type Country = {
  name: {
    official: string;
    common: string;
    nativeName: {
      [key in string]: { official: string; common: string };
    };
  };
  region: string;
  subregion: string;
  population: number;
  capital: string[];
  flags: {
    alt: string;
    png: string;
  };
  currencies: { [key in string]: { name: string; symbol: string } };
  languages: { [key in string]: string };
  /** Internet top level domains */
  tld: string[];
  /** ISO 3166-1 alpha-3 three-letter country codes */
  cca3: string;
  borders: string[];
};

type BaseCountryViewModel = {
  name: string;
  capital: string;
  population: string;
  flagUrl: string;
  flagAlt: string;
} & Pick<Country, "region">;

export type ListCountryViewModel = BaseCountryViewModel & {
  countryCode3: string;
};

type DetailCountryViewModel = BaseCountryViewModel &
  Pick<Country, "subregion"> & {
    topLevelDomain: string;
    currencies: string;
    languages: string;
    nativeName: string;
    borderCountries: { name: string; code3: string }[] | null;
  };

const baseCountryViewModelMap = (country: Country): BaseCountryViewModel => ({
  name: country.name.common,
  region: country.region,
  population: country.population.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  }),
  flagUrl: country.flags.png,
  flagAlt: country.flags.alt,
  capital: country.capital ? country.capital.join(", ") : "—",
});

const fetchCountryByCode = async (countryCode: string): Promise<Country> => {
  return fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then((response) => response.json())
    .then((countries) => countries[0]);
};

export const fetchCountry = (countryCode: string) =>
  fetchCountryByCode(countryCode)
    .then((country) => {
      if (!country.borders?.length) {
        return { country } as { country: Country; borderCountries: null };
      }
      return Promise.all(
        country.borders.map((countryCode) => fetchCountryByCode(countryCode)),
      ).then(
        (borderCountries) =>
          ({
            country,
            borderCountries: borderCountries.map((borderCountry) => ({
              name: borderCountry.name.common,
              code3: borderCountry.cca3,
            })),
          }) as {
            country: Country;
            borderCountries: DetailCountryViewModel["borderCountries"];
          },
      );
    })
    .then((countryWithBorderCountries) => {
      const country = countryWithBorderCountries.country;
      return {
        ...baseCountryViewModelMap(country),
        nativeName: country.name.nativeName
          ? Object.values(country.name.nativeName)
              .map((val) => val.common)
              .join(", ")
          : "—",
        subregion: country.subregion,
        topLevelDomain: country.tld.join(", "),
        borderCountries: countryWithBorderCountries.borderCountries ?? null,
        currencies: country.currencies
          ? Object.values(country.currencies)
              .map((val) => val.name)
              .join(", ")
          : "—",
        languages: country.languages
          ? Object.values(country.languages).join(", ")
          : "—",
      } as DetailCountryViewModel;
    });

/*

*/

export const useCountries = () => {
  const params = new URLSearchParams();
  [
    "name",
    "region",
    "capital",
    "population",
    "flags",
    "cca3",
    "languages",
  ].forEach((param) => params.append("fields", param));
  return useSWR(`https://restcountries.com/v3.1/all?${params}`, (url: string) =>
    fetch(url).then((res) =>
      res.json().then(
        (response: Country[]) =>
          response.map((country) => ({
            ...baseCountryViewModelMap(country),
            countryCode3: country.cca3,
          })) as ListCountryViewModel[],
      ),
    ),
  );
};
