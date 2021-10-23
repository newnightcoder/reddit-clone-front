import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import fr from "date-fns/locale/fr";

export const formatTimestamp = (date) => {
  const convertedDate = {
    year: date.split("-")[0],
    month: date.split("-")[1],
    day: date.split("-")[2],
    minute: date.split("-")[3],
    seconds: date.split("-")[4],
  };
  return formatDistanceToNowStrict(
    new Date(
      convertedDate.year,
      convertedDate.month,
      convertedDate.day,
      convertedDate.minute,
      convertedDate.seconds
    ),
    { addSuffix: true, locale: fr }
  );
};
