var isGridBoxActive = false; 
var mousePos = { x: 0, y: 0 }; 

function togglePopups() {
    const gridBox1 = document.getElementById('gridBox');
    const gridBox2 = document.getElementById('gridBox2');

    if (gridBox1.style.display === "none" && gridBox2.style.display === "none") {
        openPopup(gridBox1);
        openPopup(gridBox2);
        isGridBoxActive = true;
    } else {
        closePopup(gridBox1);
        closePopup(gridBox2);
        isGridBoxActive = false;
    }
}

function openPopup(popup) {
    popup.style.display = "block";
    popup.querySelector('.gridGrabber').addEventListener("mousedown", startDrag);
}

function closePopup(popup) {
    popup.style.display = "none";
    popup.querySelector('.gridGrabber').removeEventListener("mousedown", startDrag);
}

function startDrag(e) {
    // Store the initial mouse position
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    const popup = e.target.closest('.gridGrabber').parentElement;

    // Calculate the offset of the popup
    const rect = popup.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Add mousemove and mouseup event listeners
    const onMouseMove = (e) => dragPopup(e, popup, offsetX, offsetY);
    const onMouseUp = () => stopDrag(onMouseMove, onMouseUp);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function dragPopup(e, popup, offsetX, offsetY) {
    // Update the popup's position using left and top
    popup.style.left = (e.clientX - offsetX) + "px";
    popup.style.top = (e.clientY - offsetY) + "px";
}

function stopDrag(mouseMoveListener, mouseUpListener) {
    // Remove mousemove and mouseup event listeners
    document.removeEventListener("mousemove", mouseMoveListener);
    document.removeEventListener("mouseup", mouseUpListener);
}

// Initialize popups as hidden
document.getElementById('gridBox').style.display = "none";
document.getElementById('gridBox2').style.display = "none";

// The existing code for the grid functionality
window.addEventListener('keydown', onKeyDown);
var gridSpaceX = 10; 
var gridSpaceY = 10;
var gridOn = true;
var gridSnap = true;

// initialization
var gridBox = document.getElementById("gridBox");
var gridGrabber = document.getElementById("gridGrabber");
var tempGridDim = 0; // temp storage for number box
var mousePosGrid = {x: 0, y: 0}; // storage used when box dragging 

// grid toggle
var showGridBoxed = document.getElementById("showGridBoxed");
showGridBoxed.addEventListener('click', (event) => {
    gridOn = showGridBoxed.checked;
    updateShowGridStatus();
});    

function toggleShowGrid() {
    gridOn = !gridOn;
    updateShowGridStatus();
}

function updateShowGridStatus() {
    showGridBoxed.checked = gridOn;
}

// snap toggle
var snapGridBoxed = document.getElementById("snapGridBoxed");
snapGridBoxed.addEventListener('click', (event) => {
    gridSnap = snapGridBoxed.checked;
    updateSnapGridStatus();
});    

function toggleSnapGrid() {
    gridSnap = !gridSnap;
}

function updateSnapGridStatus() {
    snapGridBoxed.checked = gridSnap;
}

function updateGridConfigBox() {
    showGridBoxed.checked = gridOn;
    document.getElementById("gridNumberBox0").value = gridSpaceX;
    document.getElementById("gridNumberBox1").value = gridSpaceY;
    snapGridBoxed.checked = gridSnap;
}

// open, close and drag info box
function openGridBox() {
    updateGridConfigBox();
    gridBox.style.display = "block";
    isGridBoxActive = true;
}

function closeGridBox() {
    updateGridConfigBox();
    gridBox.style.display = "none";
    isGridBoxActive = false;
}

// defocus text input box on press enter
function onKeyDown(evt) {
    if (isGridBoxActive) {
        if (evt.keyCode === 13) { // enter
            if (document.activeElement.className === "gridNumberBox") {
                document.activeElement.blur();
            }
        }
    }
}

// accept only int input to dim box
function storePreviousGridNumberBox() {
    tempGridDim = document.activeElement.value;
}

function checkGridNumberBox(val) {
    var tempBox = document.getElementById("gridNumberBox" + val);
    if (!(/^\d+$/.test(tempBox.value))) {
        tempBox.value = tempGridDim;
    }
}
