import { services } from "@/content/services";

/** Shared between the client form and the API route so validation stays identical. */
export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

export const businessTypeOptions = [
  "Hospital",
  "Pharmacy",
  "Dental Clinic",
  "Medical Clinic",
  "Healthcare CRM / Software Company",
  "Law Firm",
  "Gym / Fitness Studio",
  "Other",
];

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  businessType: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-.\s\d]{7,25}$/;

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
    businessType: str(raw.businessType),
    service: str(raw.service),
    message: str(raw.message),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Please enter your name.";
  else if (data.name.length > 100) errors.name = "Name must be under 100 characters.";

  if (!EMAIL_RE.test(data.email) || data.email.length > 254)
    errors.email = "Please enter a valid email address.";

  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";

  if (data.organization.length < 2) errors.organization = "Please enter your business or organization name.";
  else if (data.organization.length > 150) errors.organization = "Name must be under 150 characters.";

  if (!businessTypeOptions.includes(data.businessType)) errors.businessType = "Please choose your type of business.";

  if (!serviceOptions.includes(data.service)) errors.service = "Please choose a service.";

  if (data.message.length < 20)
    errors.message = "Please tell us a bit more (at least 20 characters).";
  else if (data.message.length > 5000)
    errors.message = "Your message must be under 5,000 characters.";

  return { data, errors };
}
