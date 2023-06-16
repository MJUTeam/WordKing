export const dateToString = (date) => {
  let month = date.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  return date.getFullYear() + '-' + month + '-' + date.getDate();
};
