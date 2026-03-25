export const isLatinText = (text: string): boolean => {
  if (!text) return false;

  // Regex này bao gồm:
  // a-zA-Z: Chữ cái tiếng Anh cơ bản
  // \u00C0-\u00FF: Latin-1 Supplement (các ký tự cơ bản có dấu)
  // \u0100-\u017F: Latin Extended-A
  // \u0180-\u024F: Latin Extended-B
  // \u1E00-\u1EFF: Latin Extended Additional (Quan trọng cho tiếng Việt đầy đủ dấu)
  const latinRegex =
    /[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]/;

  return latinRegex.test(text);
};

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-z0-1\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};
