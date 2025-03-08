function BMICalculator(ft, inches, weight) {
    //weight (lb) / [height(in)^2] x 703
    let totalHeight = parseFloat(ft) * 12 + parseFloat(inches);
    const pow = Math.pow(totalHeight, 2);

    return (parseFloat(weight) / pow * 703).toFixed(2)

};

export default BMICalculator;