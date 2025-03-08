import { auth, updateValue } from '../../firebase/config';

export default async (input) => {
    let { participantId, timeslot, action, value, userId } = input;
    if (!userId) userId = auth.currentUser.uid;

    const dateBasis = new Date();
    const dateString = ("00" + dateBasis.getUTCFullYear()).slice(-2) +
        ("00" + (dateBasis.getUTCMonth() + 1)).slice(-2) +
        ("00" + dateBasis.getUTCDate()).slice(-2) +
        ("00" + dateBasis.getUTCHours()).slice(-2) +
        ("00" + dateBasis.getUTCMinutes()).slice(-2) +
        ("00" + dateBasis.getUTCSeconds()).slice(-2) +
        dateBasis.getUTCMilliseconds();

    const logId = dateString + makeid(1);
    const path = "/log/" + logId;

    const data = {
        u: userId,
        a: parseInt(action),
        v: value
    }

    if (participantId) data['p'] = parseInt(participantId);

    updateValue(path, data)
}

function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
