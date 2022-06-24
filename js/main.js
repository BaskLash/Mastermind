/* Array which will store the color code */
var colorcode = [];
/* To determine the index of the filled circle */
var IndexOfColorInArray = 0;
/* To check how many colors the user has already selected for the attempt */
var buttonClick = 0;
/* Is needed to determine if player has won or not */
var win = false;
/* Counts the needed attempts which the user need */
var attempts = 1;
/* Varible for right positions */
var rightPosition = 0;
/* Variable for not right position but in array */
var notRightPosition = 0;
/* Modal when you have won */
var winmodal = document.getElementById("youHaveWon");
/* Modal when you have lost */
var lostmodal = document.getElementById("youHaveLost");
/* All the colors */
var colors = ["pink", "red", "violet", "blue", "yellow", "black"];
/* Placeholder that helps to check if the random generated color is already in colorcode array */
var placeholder;
/* To store the amount of right positions */
var rightPositionCounter = 0;
/* To store the amount of colors that aren't in the right position */
var notRightPositionCounter = 0;
/* Select randomly 4 colors */
for (let i = 0; i < 4; i++) {
    placeholder = colors[Math.floor(Math.random() * colors.length)];
    while (colorcode.includes(placeholder)) {
        placeholder = colors[Math.floor(Math.random() * colors.length)];
    }
    colorcode.push(placeholder);
}
console.log("ColorCode " + colorcode);

/* Select all the elements from the id and check where something has been clicked */
document.getElementById("circle-options").addEventListener("click", (e) => {
    if (win == false && attempts < 11) {
        var element = e.target;
        if (element.tagName == "BUTTON") {

            /* Get color from selected color of button */
            var color = element.style.backgroundColor;
            element.style.visibility = "hidden";

            rightOrNotRight(color);

            putSelectedColorInCircle(color);

            buttonClick++;
            if (buttonClick == 4) {
                if (rightPosition == 4) {
                    console.log("Finally Rightposition: " + rightPosition, "in the code but not right position: " + notRightPosition);
                    rateing(attempts, rightPosition, notRightPosition);
                    winmodal.style.display = "block";
                    won = true;
                    attempts++;
                } else {
                    if (attempts == 10) {
                        rateing(attempts, rightPosition, notRightPosition);
                        showResult();
                        lostmodal.style.display = "block";
                        attempts++;
                    } else {
                        rateing(attempts, rightPosition, notRightPosition);
                        console.log("Finally Rightposition: " + rightPosition, "in the code but not right position: " + notRightPosition);
                        rightPosition = 0;
                        notRightPosition = 0;
                        attempts++;
                        buttonClick = 0;
                        IndexOfColorInArray = 0;
                    }
                }
            }
        }
    }
})

/* Check if color is in the right position or not */
function rightOrNotRight(color) {
    IndexOfColorInArray = colorcode.indexOf(color);
    console.log("ButtonIndex " + IndexOfColorInArray);
    console.log("ButtonClick " + buttonClick);
    if (colorcode.includes(color)) {
        if (buttonClick == IndexOfColorInArray) {
            /* In the right position */
            rightPosition++;
        } else {
            /* Not in the right position but in the code */
            notRightPosition++;
        }
    }
}

/* Set the color into the right circle */
function putSelectedColorInCircle(color) {
    elements = document.getElementsByClassName("attempt" + attempts);
    for (var i = 0; i < elements.length; i++) {
        if (i == buttonClick) {
            elements[i].style.backgroundColor = color;
        }
    }
}

/* If the user want to replay the game */
function replay() {
    window.location = window.location;
}

/* Show rating by filling the small circles */
function rateing(attempts, rightPosition, notRightPosition) {
    elements = document.getElementsByClassName("rate-circle" + attempts);
    console.log("Finally Rightposition by rating: " + rightPosition, "in the code but not right position: " + notRightPosition);
    for (var i = 0; i < elements.length; i++) {
        if (rightPosition > rightPositionCounter) {
            console.log("Inside while of rightposition: " + rightPosition + " " + rightPositionCounter);
            elements[i].style.backgroundColor = "black";
            rightPositionCounter++;
        } else if (notRightPosition > notRightPositionCounter) {
            console.log("Inside while of notRightPosition: " + notRightPosition + " " + notRightPositionCounter);
            elements[i].style.backgroundColor = "gray";
            notRightPositionCounter++;
        }
    }
    /* Show all colors to select */
    const circle_option_buttons = document.querySelectorAll(".circles");
    for (let i = 0; i < circle_option_buttons.length; i++) {
        circle_option_buttons[i].style.visibility = "visible";
    }
    rightPositionCounter = 0;
    notRightPositionCounter = 0;
}

/* Show the result */
function showResult() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("questionmark" + i).style.display = "none";
    }
    elements = document.getElementsByClassName("color-result");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = colorcode[i];
    }
}

/* To delete a color from field */
document.getElementById("delete").addEventListener("click", function() {
    if (attempts != 10 && win == false) {
        elements = document.getElementsByClassName("attempt" + attempts);
        for (var i = 0; i < elements.length; i++) {
            if (i == (buttonClick - 1)) {
                elementi = document.querySelectorAll(".circles");
                for (var z = 0; z < elementi.length; z++) {
                    console.log(elementi[z].style.backgroundColor);
                    if (elementi[z].style.backgroundColor == elements[i].style.backgroundColor) {
                        elementi[z].style.visibility = "visible";
                    }
                }
                elements[i].style.backgroundColor = "white";
                buttonClick--;
            }
        }
    }
})

// Get the <span> element that closes the modal
var winspan = document.getElementById("have_won_close");

// When the user clicks on <span> (x), close the modal
winspan.onclick = function() {
    winmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == winmodal) {
        winmodal.style.display = "none";
    }
}

// Get the <span> element that closes the modal
var lostspan = document.getElementById("have_lost_close");

// When the user clicks on <span> (x), close the modal
lostspan.onclick = function() {
    lostmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == lostmodal) {
        lostmodal.style.display = "none";
    }
}

/* Information-Modal */
// Get the modal
var modal = document.getElementById("informationModal");

// Get the button that opens the modal
var btn = document.getElementById("information");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}