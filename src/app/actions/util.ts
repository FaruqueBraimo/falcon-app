import moment from "moment";
import { FaCloudMoon } from "react-icons/fa";

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

// let weatherIcon = new Map<string, any>([
//   ["clear", ""],
//   ["key2", <FaCloudMoon />],
// ]);

function getWeatherIcone() {}

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

const getDayTime = (date: string) => {
  var now = new Date(Number(date) * 1000);
  return `${weekday[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
};

const getDay = (date: string) => {
  var now = new Date(Number(date) * 1000);
  return `${weekday[now.getDay()]}`;
};

const getTime = (date: string) => {
  var now = new Date(Number(date) * 1000);
  return `${now.getHours()}:${now.getMinutes()}`;
};

const getDate = (date: string) => {
  var now = new Date(Number(date) * 1000);
  return `${now.toLocaleDateString("en-US")}`;
};
export { getDayTime, getExtensionAmount, getDate, getTime, getDay };
