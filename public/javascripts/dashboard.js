const addBtn = document.querySelector(".add-btn");
const addSubmitBtn = document.querySelector(".add-submit-btn");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");

// add new trip
const addTrip = (event) => {
  event.preventDefault();
  const errDiv = document.querySelector(".error-msg");
  const trip = document.querySelector("#trip-entry");

  fetch("/dashboard/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: trip.value }),
  })
    .then((response) => {
      if (response.ok) {
        trip.value = "";
        errDiv.classList.add("hidden");
        location.reload();
      } else {
        errDiv.classList.remove("hidden");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addTripModal = () => {
  modalContainer.classList.remove("hidden");
};

// hide modal
const hideModal = (event) => {
  event.preventDefault();
  modalContainer.classList.add("hidden");
};

// stop click on modal from bubbling to hideModal
const preventBubble = (event) => {
  event.stopPropagation();
};

// event listeners
addBtn.addEventListener("click", addTripModal);
addSubmitBtn.addEventListener("click", addTrip);
modal.addEventListener("click", preventBubble);
modalContainer.addEventListener("click", hideModal);
