
const HumanReadableDate = (timestamp) => {
  const date = new Date(timestamp);
  // Format the date as desired (e.g "MM dd, yyyy HH:mm:ss")
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC", // Set the timezone if needed
    // You can customize the format as per your requirement
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
}
const computeDaysPassed = (dateString) => {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime();

  // Convert milliseconds to days
  const daysPassed = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return daysPassed;
};
const compareDate = (start, end) => {
    const firstDate = new Date(start);
    const secondDate = new Date(end);
    return firstDate < secondDate;
}
const isValidateTask = (task) => {
  return (
    task.title.trim() &&
    task.start_date.trim() &&
    task.end_date.trim() &&
    compareDate(task.start_date, task.end_date)
  );
};
export { isValidateTask, HumanReadableDate, computeDaysPassed };