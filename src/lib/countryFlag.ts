// Maps country names used by the Ergast/Jolpica API to ISO 3166-1 alpha-2 codes
const COUNTRY_CODES: Record<string, string> = {
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahrain: "BH",
  Belgium: "BE",
  Brazil: "BR",
  Canada: "CA",
  China: "CN",
  France: "FR",
  Germany: "DE",
  Hungary: "HU",
  India: "IN",
  Italy: "IT",
  Japan: "JP",
  Korea: "KR",
  Malaysia: "MY",
  Mexico: "MX",
  Monaco: "MC",
  Netherlands: "NL",
  Portugal: "PT",
  Qatar: "QA",
  Russia: "RU",
  "Saudi Arabia": "SA",
  Singapore: "SG",
  "South Africa": "ZA",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Thailand: "TH",
  Turkey: "TR",
  UAE: "AE",
  "United Arab Emirates": "AE",
  UK: "GB",
  "United Kingdom": "GB",
  USA: "US",
  "United States": "US",
  Vietnam: "VN",
};

// Returns the flag emoji for a country name, or null if the country is unknown
export function countryFlag(country?: string): string | null {
  const code = country ? COUNTRY_CODES[country] : undefined;
  if (!code) return null;
  return String.fromCodePoint(
    ...[...code].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}
