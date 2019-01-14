// UI variables
const form = document.getElementById("addGuestForm");
const listNames = document.querySelector(".list-names");
const guestFirstName = document.getElementById("firstName");
const guestLastName = document.getElementById("lastName");
const clearBtn = document.querySelector(".clear-tasks");
var guestFullName;
// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getGuests);
  // add guest event
  form.addEventListener("submit", addGuest);
  // Remove guest event
  listNames.addEventListener("click", removeGuest);
  //Clear List
  clearBtn.addEventListener("click", clearList);
}

// Get Guests from LS
function getGuests() {
  let guests;
  if (localStorage.getItem("guests") === null) {
    guests = [];
  } else {
    guests = JSON.parse(localStorage.getItem("guests"));
  }
  guests.forEach(function(guest) {
    // Create li element
    const li = document.createElement("li");
    li.className = "d-flex justify-content-between";
    //li.className = "justify-content-between";

    //Create text node and append to li
    li.appendChild(document.createTextNode(guest));
    // create delete icon to remove guest.
    const removeIcon = document.createElement("a");
    removeIcon.className = "delete-item";

    removeIcon.innerHTML = `<i class="fas fa-user-slash"></i>`;
    li.appendChild(removeIcon);
    // append li to ul
    listNames.appendChild(li);
  });
}
//Add Guest
function addGuest(e) {
  if (guestFirstName.value === "" || guestLastName.value === "") {
    alert("Please enter a first name / last name");
  } else {
    guestFullName = guestFirstName.value + " " + guestLastName.value;

    // Create li element
    const li = document.createElement("li");
    li.className = "d-flex justify-content-between";
    //li.className = "justify-content-between";

    //Create text node and append to li
    li.appendChild(document.createTextNode(guestFullName));
    // create delete icon to remove guest.
    const removeIcon = document.createElement("a");
    removeIcon.className = "delete-item";

    removeIcon.innerHTML = `<i class="fas fa-user-slash"></i>`;
    li.appendChild(removeIcon);
    // append li to ul
    listNames.appendChild(li);

    // persist to local storage
    storeGuestInLocalStorage(guestFullName);

    // Clear input
    guestFirstName.value = "";
    guestLastName.value = "";
    e.preventDefault();
  }
}

// Remove from LS
function removeGuestFromLocalStorage(guestItem) {
  let guests;
  if (localStorage.getItem("guests") === null) {
    guests = [];
  } else {
    guests = JSON.parse(localStorage.getItem("guests"));
  }
  guests.forEach(function(guest, index) {
    if (guestItem.textContent === guest) {
      guests.splice(index, 1);
    }
  });
  localStorage.setItem("guests", JSON.stringify(guests));
}

// Store Task
function storeGuestInLocalStorage(guest) {
  let guests;
  if (localStorage.getItem("guests") === null) {
    guests = [];
  } else {
    guests = JSON.parse(localStorage.getItem("guests"));
  }
  guests.push(guest);
  localStorage.setItem("guests", JSON.stringify(guests));
}

//Remove guest
function removeGuest(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }

  // Remove from LS
  removeGuestFromLocalStorage(e.target.parentElement.parentElement);
}

//Clear list
function clearList() {
  while (listNames.firstChild) {
    listNames.removeChild(listNames.firstChild);
  }
  // Clear from LS
  clearGuestsFromLocalStorage();
}
// Clear guests from LS
function clearGuestsFromLocalStorage() {
  localStorage.clear();
}
