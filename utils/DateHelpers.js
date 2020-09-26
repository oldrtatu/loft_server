const DateHelpers = {};

/**
 * @param date -> Date to increment
 * @param period -> period to add
 * @param periodUnit -> period's Unit {DAYS, WEEKS, MONTHS, YEARS}
 */
DateHelpers.addPeriodTodate = (date, period, periodUnit) => {
  switch (periodUnit) {
    case "DAYS":
      return DateHelpers.addDays(date, period);
    case "WEEKS":
      return DateHelpers.addWeeks(date, period);
    case "MONTHS":
      return DateHelpers.addMonths(date, period);
    case "YEARS":
      return DateHelpers.addYears(date, period);
    default:
      return date;
  }
};
DateHelpers.formatDate=(date)=> {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

DateHelpers.addDays = (date, days) => {
  let d = new Date(date);
  return new Date(d.setDate(d.getDate() + days));
};

DateHelpers.addWeeks = (date, weeks) => {
  return DateHelpers.addDays(date, weeks * 7);
};

DateHelpers.addMonths = (date, months) => {
  let d = new Date(date);
  return new Date(d.setMonth(d.getMonth() + months));
};

DateHelpers.addYears = (date, years) => {
  let d = new Date(date);
  return new Date(d.setFullYear(d.getFullYear() + years));
};

module.exports = DateHelpers;
