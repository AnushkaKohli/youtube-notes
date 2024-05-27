export const convertSecondsToTimeString = (timestamp: number) => {
  if (isNaN(timestamp) || timestamp < 0) {
    return "Invalid time";
  }

  const hours = Math.floor(timestamp / 3600);
  const remainingSeconds = Math.floor(timestamp % 3600);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = Math.floor(remainingSeconds % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${hoursStr} hrs ${minutesStr} min ${secondsStr} sec`;
};

export const formatDate = (date: Date) => {
  const day = new Date().getDate().toString().padStart(2, "0");
  const month = new Date().toLocaleString("en-US", { month: "short" }); // 'May'
  const year = new Date().getFullYear().toString().slice(-2); // Extract last two digits

  return `${day} ${month} ’${year}`;
};

export const convertTimestampToSeconds = (timestamp: string) => {
  const [hours, rest] = timestamp.split(" hrs ");
  const [minutes, seconds] = rest.split(" min ");
  const totalSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  return totalSeconds;
};
