import { format } from 'date-fns';

const FormatTime = (timestamp) => {
    if (typeof timestamp === "undefined") return "";
    const parsedDate = new Date("2023-01-01T" + timestamp);
    return format(parsedDate, "hh:mm a");
}

export default FormatTime;