import moment from "moment";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const million = 1000000;
const billion = 1000000000;
const trillion = 1000000000000;

const getDayTime = (date: string) => {
  const now = moment(date, "HH:mm").toDate();
  getExtensionAmount("100");
  return `${weekday[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
};

const getExtensionAmount = (value: string) => {
  const currentValue = Number(value);
  if (currentValue >= trillion) {
    return (currentValue / trillion).toFixed(2) + " trillion";
  } else if (currentValue >= billion) {
    return (currentValue / billion).toFixed(2) + " billion";
  } else if (currentValue >= million) {
    return (currentValue / million).toFixed(2) + " million";
  }
  return currentValue.toString();
};

export { getDayTime, getExtensionAmount };
