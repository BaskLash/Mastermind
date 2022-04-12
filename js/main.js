/* Array to store the color code */
var colorcode = [];
/* To determine the index of the filled circle */
var buttonIndex = 0;
/*  */
var buttonClick = 0;
/* Is needed to determine if player has won or not */
var win = false;
/* Counts the needed attempts which the user need */
var attempts = 1;
/* Varible for right positions */
var rightPosition = 0;
/* Variable for not right position but in array */
var notRightPosition = 0;
/* All the colors */
var colors = ["pink", "red", "lightblue", "blue", "yellow", "orange"];
/* Select randomly 4 colors */
for (let i = 0; i < 5; i++) {
    colorcode.push(colors[Math.floor(Math.random() * colors.length)]);
}
/* Select all the elements from the id and check where something has been clicked */
document.getElementById("circle-options").addEventListener("click", (e) => {
    if (win == false) {
        var element = e.target;
        if (element.tagName == "BUTTON") {
            /* Get color from selected color of button */
            var color = element.style.backgroundColor;

            /* Check if selected color is in array */
            if (colorcode.includes(color)) {
                if (color == "pink") {
                    buttonIndex = colorcode.indexOf("pink");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
                if (color == "red") {
                    buttonIndex = colorcode.indexOf("red");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
                if (color == "lightblue") {
                    buttonIndex = colorcode.indexOf("lightblue");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
                if (color == "blue") {
                    buttonIndex = colorcode.indexOf("blue");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
                if (color == "yellow") {
                    buttonIndex = colorcode.indexOf("yellow");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
                if (color == "orange") {
                    buttonIndex = colorcode.indexOf("orange");
                    if (buttonClick == buttonIndex) {
                        /* In the right position */
                        rightPosition++;
                    } else {
                        /* Not in the right position but in the code */
                        notRightPosition++;
                    }
                }
            }
            /* When the color is not in the code */
            else {

            }

            /* Set the color to the right circle */
            if (color == "pink") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "pink";
                    }
                }
            } else if (color == "red") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "red";
                    }
                }
            } else if (color == "lightblue") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "lightblue";
                    }
                }
            } else if (color == "blue") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "blue";
                    }
                }
            } else if (color == "yellow") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "yellow";
                    }
                }
            } else if (color == "orange") {
                elements = document.getElementsByClassName("attempt" + attempts);
                for (var i = 0; i < elements.length; i++) {
                    if (i == buttonClick) {
                        elements[i].style.backgroundColor = "orange";
                    }
                }
            }
            buttonClick++;
            if (buttonClick == 4) {
                if (rightPosition == 4) {
                    won = true;
                } else {
                    if (attempts == 7) {
                        showResult();
                    } else {
                        rightPosition = 0;
                        notRightPosition = 0;
                        attempts++;
                        buttonClick = 0;
                    }
                }
            }
        }
    }
})

/* Show the result */
function showResult() {
    elements = document.getElementsByClassName("color-result");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = colorcode[i];
    }
}

/* Information-Modal */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

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