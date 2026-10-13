import { services } from "@/content/services";

/** Shared between the client form and the API route so validation stays identical. */
export const serviceOptions = [...services.map((s) => s.title), "Something else or not sure yet"];

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  industry: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** International numbers: optional leading +, digits, spaces, dots, dashes, brackets, optional extension. */
const PHONE_RE = /^\+?[\d\s().\-]{6,25}(\s*(x|ext\.?)\s*\d{1,6})?$/i;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(raw: Record<string, unknown>): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const data: ContactInput = {
    name: str(raw.name),
    email: str(raw.email),
    phone: str(raw.phone),
    organization: str(raw.organization),
    industry: str(raw.industry),
    service: str(raw.service),
    message: str(raw.message),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Enter your name.";
  else if (data.name.length > 100) errors.name = "Name must be under 100 characters.";

  if (!EMAIL_RE.test(data.email) || data.email.length > 254)
    errors.email = "Enter an email address in the format name@example.com.";

  if (data.phone && (!PHONE_RE.test(data.phone) || data.phone.replace(/\D/g, "").length < 6))
    errors.phone = "Enter a phone number with digits only, plus an optional + and country code, or leave it empty.";

  if (data.organization.length < 2) errors.organization = "Enter the name of your business or organization. If you do not have one yet, write your own name.";
  else if (data.organization.length > 150) errors.organization = "Name must be under 150 characters.";

  if (data.industry.length < 2) errors.industry = "Enter your industry or type of business, for example \"online store\".";
  else if (data.industry.length > 100) errors.industry = "Industry must be under 100 characters.";

  if (!serviceOptions.includes(data.service)) errors.service = "Choose a service, or \"Something else or not sure yet\".";

  if (data.message.length < 20)
    errors.message = "Tell us a little more about your project (at least 20 characters).";
  else if (data.message.length > 5000)
    errors.message = "Your message must be under 5,000 characters.";

  return { data, errors };
}
