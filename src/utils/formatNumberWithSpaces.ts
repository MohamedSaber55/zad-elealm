const formatNumberWithSpaces = (num: number) => {
    const formattedNumber = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedNumber;
};
export default formatNumberWithSpaces;