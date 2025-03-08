const DateFromLog = (rawString) => {
    let formattedKey = "";
    let formattedTime = ""
    let dateString = rawString.substring(0, 6);
    let timeString = rawString.substring(6, 12);

    for (let i = 0; i < dateString.length; i += 2) {
        formattedKey += dateString.substring(i, i + 2);
        formattedTime += timeString.substring(i, i + 2);
        if (i + 2 < dateString.length) {
            formattedKey += "-";
            formattedTime += ":";
        }
    }

    formattedKey = "20" + formattedKey + "T" + formattedTime + "Z";
    const parsedDate = new Date(formattedKey);

    const laTime = parsedDate.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return laTime
};

export default DateFromLog;