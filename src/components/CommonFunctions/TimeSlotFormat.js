import { format, parse } from 'date-fns';



const TimeSlotFormat = (timeslot) => {
    if (typeof timeslot === "undefined") return "";
    const formattedslot = `${timeslot.substring(0, 4)}-${timeslot.substring(4, 6)}-${timeslot.substring(6, 8)}T${timeslot.substring(9, 11)}:${timeslot.substring(11, 13)}`;
    const parsedDate = new Date(formattedslot);
    return format(parsedDate, "yyyy-MM-dd hh:mm a");
}


export default TimeSlotFormat;