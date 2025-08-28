const balanceElement = document.getElementById("balance");

const modal = document.getElementById("modal");

const modalType = document.getElementById("modal-type");
const modalAmount = document.getElementById("modal-amount");
const modalDescription = document.getElementById("modal-desc");

const historyList = document.getElementById("history");

let modalStatus = 0;

let financeHistory = [];

let balance = 0.0;

function toggleModal() {
  if (modalStatus) {
    modal.classList.add("hidden");
    modalStatus = 0;
    return;
  }

  modal.classList.remove("hidden");
  modalStatus = 1;
}

function save() {
  const dateObj = new Date();
  const date = dateObj.toLocaleDateString("tr-TR"); // "28.08.2025" şeklinde verir

  const type = modalType.value;
  const amount = modalAmount.value;
  const description = modalDescription.value;

  if (amount.trim() == "") {
    return;
  }

  financeHistory.unshift({
    date: date,
    type: type,
    amount: amount,
    description: description,
  });

  switch (type) {
    case "in":
      balance += parseFloat(amount);
      break;
    case "out":
      balance -= parseFloat(amount);
      break;
  }

  modalAmount.value = "";
  modalDescription.value = "";

  toggleModal();
  saveToStorage();
  render();
}


function saveToStorage() {
  localStorage.setItem("balance", JSON.stringify(balance));
  localStorage.setItem("history", JSON.stringify(financeHistory));
}

function loadFromStorage() {
  let jsonBalance = localStorage.getItem("balance");
  let jsonHistory = localStorage.getItem("history");

  if (jsonBalance) {
    balance = JSON.parse(jsonBalance);
  }

  if (jsonBalance) {
    financeHistory = JSON.parse(jsonHistory);
  }
}

function render() {
  balanceElement.innerHTML = `${balance.toFixed(2)}₺`;

  historyList.innerHTML = "";
  financeHistory.forEach(function (v) {
    historyList.innerHTML += `
      <li class="${v.type}">
        <p><strong>Date:</strong> ${v.date}</p>
        <p><strong>Amount:</strong> ${v.amount}</p>
        <p>
          <strong>Note:</strong> ${v.description}
        </p>
      </li>
    `;
  });
}

window.onload = function () {
  loadFromStorage();
  render();
};
