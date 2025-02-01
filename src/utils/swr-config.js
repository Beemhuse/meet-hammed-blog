import { client } from "@/sanity/client";
import { SWRConfig } from "swr";


const customFetcher = async (query, ...args) => {
  try {

    if (typeof query !== "string") {
      throw new Error("The first argument of the fetcher must be a valid query string");
    }

    const result = await client.fetch(query, ...args);
    return result;
  } catch (error) {
    console.error("Custom Fetcher Error:", error);
    throw error;
  }
};
export const SWRProvider = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: customFetcher,
      revalidateOnFocus: false,
      dedupingInterval: 2000, 
      errorRetryCount: 1,    
    }}
  >
    {children}
  </SWRConfig>
);
