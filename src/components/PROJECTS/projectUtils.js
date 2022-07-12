const currentDateTime = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getmonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hour = today.getESTHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let time = hour + ":" + min + ":" + sec;
  today = mm + "/" + dd + "/" + yyyy + "at" + time;
};

module.exports = {
  currentDateTime,
};
