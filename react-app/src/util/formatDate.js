const formatDate = (dateObj) => {
    // dateObj input is JS Date object
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const month = months[dateObj.getMonth()];
    const dateNum = dateObj.getDate();
    const year = dateObj.getFullYear().toString().slice(2);

    return `${month} ${dateNum}, ${year}`
};

export default formatDate;
