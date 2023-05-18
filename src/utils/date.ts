export const parseDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate() + 1;
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}
