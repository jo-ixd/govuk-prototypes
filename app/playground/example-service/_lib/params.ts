export type ServiceSearchParams = Record<string, string | string[] | null | undefined>;

export type Answers = {
  name: string;
  dob: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function firstParam(value: string | string[] | null): string {
  if (value === null) return "";
  if (Array.isArray(value)) return value.length > 0 ? value[0] : "";
  return value;
}

export function readAnswers(params: ServiceSearchParams): Answers {
  return {
    name: firstParam(params.name ?? null),
    dob: firstParam(params.dob ?? null),
  };
}

export function buildHref(path: string, answers: Answers): string {
  const parts: string[] = [];
  if (answers.name !== "") parts.push(`name=${encodeURIComponent(answers.name)}`);
  if (answers.dob !== "") parts.push(`dob=${encodeURIComponent(answers.dob)}`);
  return parts.length > 0 ? `${path}?${parts.join("&")}` : path;
}

export function formatDob(dob: string): string {
  const parts = dob.split("-");
  if (parts.length !== 3) return dob === "" ? "-" : dob;

  const day = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10);
  const year = Number.parseInt(parts[2], 10);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return dob;

  const monthName = month >= 1 && month <= 12 ? MONTHS[month - 1] : null;
  if (monthName === null) return dob;

  return `${day} ${monthName} ${year}`;
}

export function referenceNumber(name: string, dob: string): string {
  const source = `${name}|${dob}`;
  let hash = 5381;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 33 + source.charCodeAt(i)) % 2176782336; // 36^6
  }
  const code = hash.toString(36).toUpperCase().padStart(6, "0").slice(-6);
  return `APP-${code}`;
}
