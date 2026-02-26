const traderAName = document.getElementById("traderAName");
const traderBName = document.getElementById("traderBName");
const traderAItem = document.getElementById("traderAItem");
const traderBItem = document.getElementById("traderBItem");
const proposeTradeBtn = document.getElementById("proposeTrade");
const acceptABtn = document.getElementById("acceptA");
const acceptBBtn = document.getElementById("acceptB");
const resetBtn = document.getElementById("reset");
const status = document.getElementById("status");

let proposalOpen = false;
let acceptedA = false;
let acceptedB = false;

function setStatus(message) {
  status.textContent = message;
}

function enableAcceptButtons(enabled) {
  acceptABtn.disabled = !enabled;
  acceptBBtn.disabled = !enabled;
}

function updateAcceptButtonStyles() {
  acceptABtn.classList.toggle("active", acceptedA);
  acceptBBtn.classList.toggle("active", acceptedB);
  acceptABtn.textContent = acceptedA ? "Accepted ✅" : "Accept Trade";
  acceptBBtn.textContent = acceptedB ? "Accepted ✅" : "Accept Trade";
}

function resetApprovals() {
  acceptedA = false;
  acceptedB = false;
  updateAcceptButtonStyles();
}

function executeTrade() {
  const aName = traderAName.value.trim();
  const bName = traderBName.value.trim();
  const aItem = traderAItem.value.trim();
  const bItem = traderBItem.value.trim();

  setStatus(`${aName} traded ${aItem} for ${bName}'s ${bItem}. Trade complete! 🎉`);

  traderAItem.value = bItem;
  traderBItem.value = aItem;

  proposalOpen = false;
  enableAcceptButtons(false);
  resetApprovals();
}

proposeTradeBtn.addEventListener("click", () => {
  const aName = traderAName.value.trim();
  const bName = traderBName.value.trim();
  const aItem = traderAItem.value.trim();
  const bItem = traderBItem.value.trim();

  if (!aName || !bName || !aItem || !bItem) {
    setStatus("Please fill in both names and both items before proposing a trade.");
    return;
  }

  proposalOpen = true;
  resetApprovals();
  enableAcceptButtons(true);
  setStatus(
    `${aName} offers ${aItem} for ${bName}'s ${bItem}. Both traders must click Accept Trade.`
  );
});

acceptABtn.addEventListener("click", () => {
  if (!proposalOpen) return;
  acceptedA = !acceptedA;
  updateAcceptButtonStyles();

  if (acceptedA && acceptedB) {
    executeTrade();
  }
});

acceptBBtn.addEventListener("click", () => {
  if (!proposalOpen) return;
  acceptedB = !acceptedB;
  updateAcceptButtonStyles();

  if (acceptedA && acceptedB) {
    executeTrade();
  }
});

resetBtn.addEventListener("click", () => {
  traderAName.value = "";
  traderBName.value = "";
  traderAItem.value = "";
  traderBItem.value = "";
  proposalOpen = false;
  enableAcceptButtons(false);
  resetApprovals();
  setStatus("Form reset. Enter both names and items to start a new trade.");
});

enableAcceptButtons(false);
updateAcceptButtonStyles();
