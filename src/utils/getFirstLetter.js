export const getFirstLetter = (word) => {
    if (typeof word !== "string" || !word.trim()) {
      throw new Error("Input must be a non-empty string");
    }
    return word.trim()[0];
  };
  