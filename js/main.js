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

var colorcode = [];
var buttonIndex = 0;
var buttonClick = 0;

var colors = ["pink", "red", "lightblue", "blue", "yellow", "orange"];
for (let i = 0; i < 6; i++) {
    colorcode.push(colors[Math.floor(Math.random() * colors.length)]);
}


/* When the website has been loaded */
document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {

    }
});

document.getElementById("circle-options").addEventListener("click", (e) => {
    var element = e.target;
    if (element.tagName == "BUTTON") {
        var color = element.style.backgroundColor;

        if (colorcode.includes(color)) {
            if (color == "pink") {
                buttonIndex = colorcode.indexOf("pink");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
            if (color == "red") {
                buttonIndex = colorcode.indexOf("red");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
            if (color == "lightblue") {
                buttonIndex = colorcode.indexOf("lightblue");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
            if (color == "blue") {
                buttonIndex = colorcode.indexOf("blue");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
            if (color == "yellow") {
                buttonIndex = colorcode.indexOf("yellow");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
            if (color == "orange") {
                buttonIndex = colorcode.indexOf("orange");
                if (buttonClick == buttonIndex) {
                    alert("right position");
                } else {
                    alert("not in the right position but in the code");
                }
            }
        } else {
            alert("Not in the code");
        }

        if (color == "pink") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "pink";
                }
            }
        } else if (color == "red") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "red";
                }
            }
        } else if (color == "lightblue") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "lightblue";
                }
            }
        } else if (color == "blue") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "blue";
                }
            }
        } else if (color == "yellow") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "yellow";
                }
            }
        } else if (color == "orange") {
            elements = document.getElementsByClassName("attempt1");
            for (var i = 0; i < elements.length; i++) {
                if (i == buttonClick) {
                    elements[i].style.backgroundColor = "orange";
                }
            }
        }
        buttonClick++;
    }
})