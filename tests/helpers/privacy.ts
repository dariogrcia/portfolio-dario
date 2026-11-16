// Exactly nine national digits, with common Spanish grouping. Unicode word
// boundaries avoid matching fragments of asset hashes, IDs, dates or years.
export const spanishPhonePattern =
  /(?<![\p{L}\p{N}_])(?:\+34[ .-]?)?[6-9](?:\d{8}|\d{2}(?:[ .-]\d{3}){2}|\d{2}(?:[ .-]\d{2}){3})(?![\p{L}\p{N}_])/u;
