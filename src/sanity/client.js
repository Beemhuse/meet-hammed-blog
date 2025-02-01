import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "3kj9d6az",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});