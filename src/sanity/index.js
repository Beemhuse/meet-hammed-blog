import { client } from "./client";

export const getUserByEmail = async (email) => {
    const query = '*[_type == "user" && email == $email][0]';
    const params = { email };
    try {
      const user = await client.fetch(query, params);
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  };
  