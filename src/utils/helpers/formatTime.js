import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { de, fr } from "date-fns/locale";
import en from "date-fns/locale/en-US";

const time = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
  second: new Date().getSeconds(),
};
export const date = `${time.year}-${time.month}-${time.day}-${time.hour}-${time.minute}-${time.second}`;

export const createDate = () => {
  const time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
  };
  return `${time.year}-${time.month}-${time.day}-${time.hour}-${time.minute}-${time.second}`;
};

export const formatTimestamp = (date, origin, language) => {
  const convertedDate = {
    year: date.split("-")[0],
    month: date.split("-")[1],
    day: date.split("-")[2],
    minute: date.split("-")[3],
    seconds: date.split("-")[4],
  };
  return formatDistanceToNowStrict(
    new Date(convertedDate.year, convertedDate.month, convertedDate.day, convertedDate.minute, convertedDate.seconds),
    {
      addSuffix: origin === "post" ? true : false,
      locale: language === "fr" ? fr : language === "en" ? en : language === "de" && de,
    }
  );
};
