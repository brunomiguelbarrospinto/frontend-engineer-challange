import dayjs from "dayjs";
import { default as relativeTime } from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getRelativeTime(date: string) {
  return dayjs(date).fromNow();
}
