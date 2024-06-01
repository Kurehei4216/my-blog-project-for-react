export const getDateFormatByFormat = (dateString, format) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    format: format,
    // "YYYY-MM-DD"
  });
};
