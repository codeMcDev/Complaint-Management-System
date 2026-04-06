export function formatDate(date) {
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const newDate = new Date(date);
  return {
    formattedDate() {
      return newDate.toLocaleDateString(undefined, dateOptions);
    },
    formattedTime() {
      return newDate.toLocaleTimeString("en-US");
    },
  };
}
