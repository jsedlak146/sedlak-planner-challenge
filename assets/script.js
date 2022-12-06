//These are all of the variables I will be needing
var saveBtn = $(".saveBtn");
var eventText = $(".description");

var currentDay;
var currentTime;
var timeList = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var timeText = $(".description");

//displays the current date at the top of the page
function currentDayJs() {
  var currentDay = dayjs().format("dddd MMM D, YYYY");
  var currentHour = dayjs().format("hh:mm a");
  $("#currentDay").text(currentDay);
  console.log(currentDay, currentHour);
}

//makes the hourly blocks gray for past, red for present and green for future
function setColor() {
  timeText.each(function (i) {
    currentTime = parseInt(dayjs().format("H"));
    var blockTime = $(this).attr("id").split("-")[1];
    console.log(i, currentTime);
    console.log(i, blockTime);

    if (currentTime < blockTime) {
      $(this).removeClass("past present");
      $(this).addClass("future");
    } else if (currentTime === blockTime) {
      $(this).removeClass("past future");
      $(this).addClass("present");
    } else if (currentTime > blockTime) {
      $(this).removeClass("present future");
      $(this).addClass("past");
    } else {
      console.log("Invalid");
    }
  });
}

//calling all of my created functions to run them
$(function () {
  currentDayJs();
  setColor();
  setInterval(currentDayJs, 60000);
  console.log(currentDayJs);
});

//button to save your plans
saveBtn.each(function (i) {
  $(this).click('on', function (event) {
    var hourToAdd = timeText[i].getAttribute("id").split("-")[1];
    console.log("hour", hourToAdd);
    var textToAdd = $(this).parent().children()[1].value;
    console.log(textToAdd)
    setLocalStorage(textToAdd, hourToAdd-9);
  });
});

//local storage function to save your plans in their allocated time, check in console
function setLocalStorage(elementToAdd, indexToSet) {
  var currentStorage = getLocalStorage();
  currentStorage[indexToSet] = elementToAdd;
  localStorage.setItem("event", JSON.stringify(currentStorage));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('event')) || [];
}

