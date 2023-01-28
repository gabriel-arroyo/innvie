export const getCurrentDate = (date = new Date()) => {
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return currentDate;
};
export const getTomorrowDate = (date = new Date()) => {
  date.setDate(date.getDate() + 1);
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return currentDate;
};

export const getDaysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = Math.abs(end - start);
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  if (Number.isNaN(days)) return 0;
  return days;
};

export function getStatus(startDate, endDate) {
  const today = new Date();
  if (startDate > today) {
    return "Pending";
  }
  if (startDate <= today && endDate >= today) {
    return "Open";
  }
  return "Done";
}
