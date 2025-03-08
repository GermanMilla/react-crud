import { format } from 'date-fns';

export default (input) => {

    let formattedKey = "";
    let formattedTime = "";
    let dateString = input.substring(0, 6);
    let timeString = input.substring(6, 12);

    for (let i = 0; i < dateString.length; i += 2) {
        formattedKey += dateString.substring(i, i + 2);
        formattedTime += timeString.substring(i, i + 2);
        if (i + 2 < dateString.length) {
            formattedKey += "-";
            formattedTime += ":";
        }
    }
    formattedKey = "20" + formattedKey + "T" + formattedTime;
    let parsedDate = new Date(formattedKey);
    parsedDate.setHours(parsedDate.getHours() + 3);

    return format(parsedDate, "yyyy.MM.dd  HH:mm:ss");
}
