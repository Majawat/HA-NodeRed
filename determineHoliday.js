const currentYear = new Date().getFullYear();
var currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // Set time to midnight

var whichHoliday = getHoliday(currentDate);

msg.payload = whichHoliday;
return msg;

function countDateDiff(checkDate) {
    const startOfYear = new Date(checkDate.getFullYear(), 0, 1);
    const differenceInTime = checkDate.getTime() - startOfYear.getTime();
    const dayCount = Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
    return dayCount;
}

function getEasterDate(year) {
    const f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);

    let easter = new Date(year, month - 1, day);
    easter.setHours(0, 0, 0, 0); // Set time to midnight
    return easter;
}

function getNthWeekdayOfMonth(year, month, weekday, n) {
    let date = new Date(year, month - 1, 1);
    date.setHours(0, 0, 0, 0); // Set time to midnight
    let count = 0;
    while (count < n) {
        if (date.getDay() === weekday) count++;
        if (count < n) date.setDate(date.getDate() + 1);
    }
    return date;
}

function getLastWeekdayOfMonth(year, month, weekday) {
    let date = new Date(year, month, 0);
    date.setHours(0, 0, 0, 0); // Set time to midnight
    while (date.getDay() !== weekday) {
        date.setDate(date.getDate() - 1);
    }
    return date;
}

function createDate(year, month, day) {
    let date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0); // Set time to midnight
    return date;
}

function getHoliday(currentDate) {
    const easterDate = getEasterDate(currentYear);
    const twoWeeksBeforeEaster = new Date(easterDate.getTime());
    twoWeeksBeforeEaster.setDate(easterDate.getDate() - 14);
    twoWeeksBeforeEaster.setHours(0, 0, 0, 0); // Set time to midnight

    const holidays = [
        { name: "New Years", start: createDate(currentYear, 1, 1), end: createDate(currentYear, 1, 1) },
        { name: "New Years Eve", start: createDate(currentYear, 1, 1), end: createDate(currentYear, 1, 1) },
        { name: "MLK Day", start: getNthWeekdayOfMonth(currentYear, 1, 1, 3), end: getNthWeekdayOfMonth(currentYear, 1, 1, 3) },
        { name: "Valentines", start: createDate(currentYear, 2, 14), end: createDate(currentYear, 2, 14) },
        { name: "Presidents Day", start: getNthWeekdayOfMonth(currentYear, 2, 1, 3), end: getNthWeekdayOfMonth(currentYear, 2, 1, 3) },
        { name: "StPat", start: createDate(currentYear, 3, 17), end: createDate(currentYear, 3, 17) },
        { name: "Easter", start: twoWeeksBeforeEaster, end: easterDate },
        { name: "Memorial Day", start: getLastWeekdayOfMonth(currentYear, 5, 1), end: getLastWeekdayOfMonth(currentYear, 5, 1) },
        { name: "July 4th", start: createDate(currentYear, 7, 4), end: createDate(currentYear, 7, 5) },
        { name: "Labor Day", start: getNthWeekdayOfMonth(currentYear, 9, 1, 1), end: getNthWeekdayOfMonth(currentYear, 9, 1, 1) },
        { name: "Halloween", start: createDate(currentYear, 10, 31), end: createDate(currentYear, 10, 31) },
        { name: "Veterans Day", start: createDate(currentYear, 11, 11), end: createDate(currentYear, 11, 11) },
        { name: "Thanksgiving", start: getNthWeekdayOfMonth(currentYear, 11, 4, 4), end: getNthWeekdayOfMonth(currentYear, 11, 4, 4) },
        { name: "Christmas", start: createDate(currentYear, 12, 25), end: createDate(currentYear, 12, 25) },
    ];

    for (let holiday of holidays) {
        if (currentDate >= holiday.start && currentDate <= holiday.end) {
            return holiday.name;
        }
    }
    return "Everyday";
}
