const formatNumberToCurrency = (number: number) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2, // Ensures at least two decimal places
        maximumFractionDigits: 2, // Ensures no more than two decimal places
    }).format(number);
    return formattedNumber.trim();
};

export default formatNumberToCurrency