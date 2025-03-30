export const truncateText = (text: string, maxLength: number = 250) => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
};
