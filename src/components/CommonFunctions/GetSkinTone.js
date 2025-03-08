function GetSkinTone(participant) {
    const skintone = parseInt(participant['skintone']);

    let skinRange = '';
    if (skintone >= 1 && skintone <= 2) {
        skinRange = '1-2';
    } else if (skintone >= 3 && skintone <= 4) {
        skinRange = '3-4';
    } else if (skintone >= 5 && skintone <= 6) {
        skinRange = '5-6';
    } else if (skintone >= 7 && skintone <= 8) {
        skinRange = '7-8';
    } else if (skintone >= 9 && skintone <= 10) {
        skinRange = '9-10';
    }

    return { skintone: skintone, skinRange: skinRange };

}
export default GetSkinTone;