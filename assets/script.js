// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var saveBtn = $('.saveBtn');
var eventText = $('.description');

var currentDay;
var currentTime;
var timeList = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var timeText= $(".description");

//displays the current date at the top of the page
function currentDayJs() {
  var currentDay = dayjs().format('dddd MMM D, YYYY');
  var currentHour = dayjs().format('hh:mm a');
  $('#currentDay').text(currentDay);
  console.log(currentDay, currentHour);
};

//makes the hourly blocks gray for past, red for present and green for future
function setColor() {
  timeText.each(function (i) {
    currentTime = parseInt(dayjs().format('H'));
    var blockTime = $(this).attr('id').split('-')[1];
    console.log(i, currentTime);
    console.log(i, blockTime)

    if (currentTime < blockTime) {
      $(this).removeClass('past present');
      $(this).addClass('future');
    }
    else if (currentTime === blockTime) {
      $(this).removeClass('past future');
      $(this).addClass('present');
    }
    else if (currentTime > blockTime) {
      $(this).removeClass('present future');
      $(this).addClass('past');
    }
    else {console.log('Invalid');
  }
  })
};

$(function () {
  currentDayJs();
  setColor();
  setInterval(currentDayJs, 60000);
  console.log(currentDayJs);
});

saveBtn.each(function(i) {
  $(this).click(function (event) {
    console.log("here", timeText[i].getAttribute('id').split('-')[1])
    console.log("clicked")
    console.log(eventText.value);
    var addedEvent = {
      text: eventText[1].value,
      time: timeText[i].getAttribute('id').split('-')[1]
    };
    setLocalStorage(addedEvent)
    console.log('saved');
  })
});

function setLocalStorage(elementToAdd) {
  var currentStorage = getLocalStorage();
  localStorage.setItem('event', JSON.stringify(currentStorage));
  };
  
  function getLocalStorage() {
    $('timeText').each(function(i) {
      eventText= (localStorage.getItem[1].value);
      console.log("get" + eventText);
    })
  };
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

//funcion if else

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
