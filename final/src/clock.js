const clock = document.querySelector(".time");

function getTime() {
  const toDay = new Date();
  const day = Math.floor(toDay / 1000 / 60 / 60 / 24);
  const hour = Math.floor((toDay / 1000 / 60 / 60) % 24);
  const minute = Math.floor((toDay / 1000 / 60) % 60);
  const seconds = Math.floor((toDay / 1000) % 60);
  clock.innerHTML = `${
    hour < 10 ? `0${hour}` : hour
  } : 
  ${minute < 10 ? `0${minute}` : minute}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
