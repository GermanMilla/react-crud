
import { ref as storeRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/config';


const uploadICFSignature = async (imgData, id, subpath) => {
    const byteChars = atob(imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
    let byteArrays = [];

    for (let offset = 0; offset < byteChars.length; offset += 512) {
        const slice = byteChars.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const imageBlob = new Blob(byteArrays, { type: 'image/png' });
    const storageRef = storeRef(storage, `participants/${id}/${subpath}/${id}_${subpath}.png`);

    return uploadBytesResumable(storageRef, imageBlob)
        .then(() => getDownloadURL(storageRef))
        .then(url => {
            let formattedUrl = url.split(`https://firebasestorage.googleapis.com/v0/b/blackburn-la.appspot.com/o/participants%2F${id}%2F${subpath}%2F${id}_${subpath}.png?`)[1];
            return formattedUrl; // Return the formatted URL
        });
};

export default uploadICFSignature;
