import { handleGenericError } from "@/lib/errorHandler";
import axios from "axios";

/**
 * Perform a POST request.
 *
 * @param {string} endpoint - The API endpoint to send the POST request to.
 * @param {Object} data - The request payload.
 * @returns {Promise<any>} - The response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    // Handle the error and throw a standardized error
    throw handleGenericError(error);
  }
};
