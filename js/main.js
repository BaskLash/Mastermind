/* Array to store the color code */
var colorcode = [];
/* To check how many colors the user has already selected for the attempt */
var buttonClick = 0;
/* Tracks if player has won */
var win = false;
/* Counts the attempts */
var attempts = 1;
/* Variable for right positions */
var rightPosition = 0;
/* Variable for colors in code but not in right position */
var notRightPosition = 0;
/* Array to store user's current attempt */
var userAttempt = [];
/* Modal when you have won */
var winmodal = document.getElementById("youHaveWon");
/* Modal when you have lost */
var lostmodal = document.getElementById("youHaveLost");
/* All available colors */
var colors = ["pink", "red", "violet", "blue", "yellow", "black"];
/* Placeholder for random color selection */
var placeholder;
/* To store the amount of right positions */
var rightPositionCounter = 0;
/* To store the amount of colors that aren't in the right position */
var notRightPositionCounter = 0;

/* Generate random color code with 4 unique colors */
for (let i = 0; i < 4; i++) {
  placeholder = colors[Math.floor(Math.random() * colors.length)];
  while (colorcode.includes(placeholder)) {
    placeholder = colors[Math.floor(Math.random() * colors.length)];
  }
  colorcode.push(placeholder);
}
console.log("Color Code " + colorcode);

/* Handle color selection */
document.getElementById("circle-options").addEventListener("click", (e) => {
  if (win == false && attempts < 11) {
    var element = e.target;
    if (element.tagName == "BUTTON") {
      var color = element.style.backgroundColor;
      element.style.visibility = "hidden";

      rightOrNotRight(color);
      putSelectedColorInCircle(color);

      buttonClick++;
      if (buttonClick == 4) {
        validateAttempt();
        if (rightPosition == 4) {
          rateing(attempts, rightPosition, notRightPosition);
          winmodal.style.display = "block";
          win = true;
          attempts++;
        } else {
          rateing(attempts, rightPosition, notRightPosition);
          if (attempts == 10) {
            showResult();
            lostmodal.style.display = "block";
            attempts++;
          } else {
            rightPosition = 0;
            notRightPosition = 0;
            attempts++;
            buttonClick = 0;
            userAttempt = [];
            const circle_option_buttons = document.querySelectorAll(".circles");
            for (let btn of circle_option_buttons) {
              btn.style.visibility = "visible";
            }
          }
        }
      }
    }
  }
});

/* Store the selected color in userAttempt */
function rightOrNotRight(color) {
  userAttempt.push(color);
}

/* Validate the user's attempt */
function validateAttempt() {
  let tempColorCode = [...colorcode];
  let tempAttempt = [...userAttempt];
  rightPosition = 0;
  notRightPosition = 0;

  // First pass: Check for correct position (black pegs)
  for (let i = 0; i < 4; i++) {
    if (tempAttempt[i] === tempColorCode[i]) {
      rightPosition++;
      tempColorCode[i] = null;
      tempAttempt[i] = null;
    }
  }

  // Second pass: Check for correct color, wrong position (gray pegs)
  for (let i = 0; i < 4; i++) {
    if (tempAttempt[i] !== null) {
      const index = tempColorCode.indexOf(tempAttempt[i]);
      if (index !== -1) {
        notRightPosition++;
        tempColorCode[index] = null;
      }
    }
  }
  console.log(
    "Right Position: " + rightPosition,
    "Wrong Position: " + notRightPosition
  );
}

/* Set the color into the correct circle */
function putSelectedColorInCircle(color) {
  let elements = document.getElementsByClassName("attempt" + attempts);
  elements[buttonClick].style.backgroundColor = color;
}

/* Replay the game */
function replay() {
  window.location = window.location;
}

/* Display rating by filling the small circles */
function rateing(attempts, rightPosition, notRightPosition) {
  let elements = document.getElementsByClassName("rate-circle" + attempts);
  for (let i = 0; i < elements.length; i++) {
    if (rightPosition > rightPositionCounter) {
      elements[i].style.backgroundColor = "black";
      rightPositionCounter++;
    } else if (notRightPosition > notRightPositionCounter) {
      elements[i].style.backgroundColor = "gray";
      notRightPositionCounter++;
    }
  }
  rightPositionCounter = 0;
  notRightPositionCounter = 0;
}

/* Show the result */
function showResult() {
  for (var i = 1; i < 5; i++) {
    document.getElementById("questionmark" + i).style.display = "none";
  }
  let elements = document.getElementsByClassName("color-result");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = colorcode[i];
  }
}

/* Delete a color from the field */
document.getElementById("delete").addEventListener("click", function () {
  if (attempts != 10 && win == false && buttonClick > 0) {
    buttonClick--;
    let elements = document.getElementsByClassName("attempt" + attempts);
    elements[buttonClick].style.backgroundColor = "white";

    let deletedColor = userAttempt.pop();

    const colorButtons = document.querySelectorAll(".circles");
    for (let btn of colorButtons) {
      if (btn.style.backgroundColor === deletedColor) {
        btn.style.visibility = "visible";
        break;
      }
    }
  }
});

/* Modal close handlers */
var winspan = document.getElementById("have_won_close");
winspan.onclick = function () {
  winmodal.style.display = "none";
};

var lostspan = document.getElementById("have_lost_close");
lostspan.onclick = function () {
  lostmodal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == winmodal || event.target == lostmodal) {
    event.target.style.display = "none";
  }
};

/* Information Modal */
var modal = document.getElementById("informationModal");
var btn = document.getElementById("information");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
