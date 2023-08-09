import { parse } from "url";

export const getPathFromUrl = (urlString) => {
  const parsedUrl = parse(urlString); // Use the 'parse' function
  return parsedUrl.pathname;
};
