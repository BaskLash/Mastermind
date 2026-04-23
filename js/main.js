/* =====================================================================
 * Mastermind — modern drag-and-drop edition
 * --------------------------------------------------------------------- */

const COLORS = [
  { id: "pink",   label: "Pink",   hex: "#ec4899" },
  { id: "red",    label: "Red",    hex: "#ef4444" },
  { id: "violet", label: "Violet", hex: "#a855f7" },
  { id: "blue",   label: "Blue",   hex: "#3b82f6" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
  { id: "black",  label: "Black",  hex: "#18181b" },
];

const MAX_ATTEMPTS = 10;
const SLOTS_PER_ROW = 4;

const state = {
  secret: [],
  attempt: 1,
  gameOver: false,
  won: false,
  guess: Array(SLOTS_PER_ROW).fill(null),
  history: [], // { guess: [ids], feedback: { correct, present } }
};

const colorById = (id) => COLORS.find((c) => c.id === id);

/* ---------------------------------------------------------------------
 * Secret code generation — 4 unique colors
 * ------------------------------------------------------------------- */
function generateSecret() {
  const pool = COLORS.map((c) => c.id);
  const code = [];
  while (code.length < SLOTS_PER_ROW) {
    const i = Math.floor(Math.random() * pool.length);
    code.push(pool.splice(i, 1)[0]);
  }
  return code;
}

/* ---------------------------------------------------------------------
 * DOM builders
 * ------------------------------------------------------------------- */
function makePeg(colorId, { draggable = false, className = "" } = {}) {
  const peg = document.createElement("div");
  peg.className = `peg ${className}`.trim();
  peg.style.setProperty("--peg-color", colorById(colorId).hex);
  peg.dataset.color = colorId;
  if (draggable) {
    peg.classList.add("draggable");
    peg.setAttribute("draggable", "true");
    peg.setAttribute("role", "button");
    peg.setAttribute("aria-label", `${colorById(colorId).label} peg`);
  }
  return peg;
}

function buildPalette() {
  const palette = document.getElementById("palette");
  palette.innerHTML = "";
  COLORS.forEach((c) => {
    const wrap = document.createElement("div");
    wrap.className = "palette-slot";
    wrap.dataset.paletteColor = c.id;

    const peg = makePeg(c.id, { draggable: true });
    peg.dataset.source = "palette";
    attachPegDrag(peg);
    wrap.appendChild(peg);
    palette.appendChild(wrap);
  });

  // Palette itself is a drop target for removing from slots
  palette.addEventListener("dragover", onPaletteDragOver);
  palette.addEventListener("dragleave", onPaletteDragLeave);
  palette.addEventListener("drop", onPaletteDrop);
}

function buildSecretCode() {
  const holder = document.getElementById("secretCode");
  holder.innerHTML = "";
  for (let i = 0; i < SLOTS_PER_ROW; i++) {
    const s = document.createElement("div");
    s.className = "secret-slot";
    s.innerHTML = '<i class="fa-solid fa-question text-xs"></i>';
    holder.appendChild(s);
  }
}

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const row = document.createElement("div");
    row.className = "row inactive";
    row.dataset.attempt = i;

    const idx = document.createElement("div");
    idx.className = "row-index";
    idx.textContent = String(i).padStart(2, "0");

    const slots = document.createElement("div");
    slots.className = "slots";
    for (let s = 0; s < SLOTS_PER_ROW; s++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.attempt = i;
      slot.dataset.index = s;
      attachSlotDnd(slot);
      slots.appendChild(slot);
    }

    const fb = document.createElement("div");
    fb.className = "feedback-grid";
    for (let f = 0; f < SLOTS_PER_ROW; f++) {
      const p = document.createElement("div");
      p.className = "fb-peg";
      fb.appendChild(p);
    }

    row.appendChild(idx);
    row.appendChild(slots);
    row.appendChild(fb);
    board.appendChild(row);
  }
  activateCurrentRow();
}

/* ---------------------------------------------------------------------
 * Current-row activation
 * ------------------------------------------------------------------- */
function activateCurrentRow() {
  document.querySelectorAll("#board .row").forEach((row) => {
    const n = Number(row.dataset.attempt);
    row.classList.toggle("active", n === state.attempt);
    row.classList.toggle("inactive", n !== state.attempt);
  });
  document.getElementById("attemptIndicator").textContent = String(state.attempt);
}

/* ---------------------------------------------------------------------
 * Drag and drop
 * ------------------------------------------------------------------- */
let dragCtx = null; // { color, source: 'palette'|'slot', fromAttempt, fromIndex, el }

function attachPegDrag(peg) {
  peg.addEventListener("dragstart", (e) => {
    if (state.gameOver) {
      e.preventDefault();
      return;
    }
    const source = peg.dataset.source;
    if (source === "slot") {
      const slot = peg.closest(".slot");
      if (Number(slot.dataset.attempt) !== state.attempt) {
        e.preventDefault();
        return;
      }
      dragCtx = {
        color: peg.dataset.color,
        source: "slot",
        fromAttempt: Number(slot.dataset.attempt),
        fromIndex: Number(slot.dataset.index),
        el: peg,
      };
    } else {
      dragCtx = {
        color: peg.dataset.color,
        source: "palette",
        el: peg,
      };
    }
    peg.classList.add("dragging");
    // Required to enable drag in Firefox
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", peg.dataset.color);
    } catch (_) { /* no-op */ }
  });

  peg.addEventListener("dragend", () => {
    peg.classList.remove("dragging");
    clearAllDropHover();
    dragCtx = null;
  });
}

function attachSlotDnd(slot) {
  slot.addEventListener("dragover", (e) => {
    if (!dragCtx) return;
    if (Number(slot.dataset.attempt) !== state.attempt) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    slot.classList.add("drop-hover");
  });
  slot.addEventListener("dragleave", () => {
    slot.classList.remove("drop-hover");
  });
  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    slot.classList.remove("drop-hover");
    if (!dragCtx || state.gameOver) return;
    if (Number(slot.dataset.attempt) !== state.attempt) return;
    handleDropOnSlot(Number(slot.dataset.index));
  });
}

function onPaletteDragOver(e) {
  if (!dragCtx || dragCtx.source !== "slot") return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  document.getElementById("palette").classList.add("drop-hover");
}

function onPaletteDragLeave() {
  document.getElementById("palette").classList.remove("drop-hover");
}

function onPaletteDrop(e) {
  e.preventDefault();
  document.getElementById("palette").classList.remove("drop-hover");
  if (!dragCtx || dragCtx.source !== "slot" || state.gameOver) return;
  // Remove from the originating slot
  state.guess[dragCtx.fromIndex] = null;
  renderCurrentGuess();
  refreshPalette();
  updateSubmitState();
}

function clearAllDropHover() {
  document.querySelectorAll(".drop-hover").forEach((el) => el.classList.remove("drop-hover"));
}

/* ---------------------------------------------------------------------
 * Drop logic
 *   - palette → empty slot: place
 *   - palette → filled slot: replace (old returns to palette)
 *   - slot → empty slot: move
 *   - slot → filled slot: swap
 * ------------------------------------------------------------------- */
function handleDropOnSlot(targetIndex) {
  const { color, source, fromIndex } = dragCtx;

  if (source === "palette") {
    // Replacing whatever is in the target slot (if any)
    state.guess[targetIndex] = color;
  } else {
    // slot → slot: move or swap
    if (targetIndex === fromIndex) return;
    const moving = state.guess[fromIndex];
    const existing = state.guess[targetIndex];
    state.guess[targetIndex] = moving;
    state.guess[fromIndex] = existing; // null if target was empty → becomes empty
  }
  renderCurrentGuess();
  refreshPalette();
  updateSubmitState();
}

/* ---------------------------------------------------------------------
 * Render helpers
 * ------------------------------------------------------------------- */
function renderCurrentGuess() {
  const slots = document.querySelectorAll(`#board .row[data-attempt="${state.attempt}"] .slot`);
  slots.forEach((slot, i) => {
    slot.innerHTML = "";
    const colorId = state.guess[i];
    if (colorId) {
      const peg = makePeg(colorId, { draggable: true, className: "pop" });
      peg.dataset.source = "slot";
      attachPegDrag(peg);
      slot.appendChild(peg);
      slot.classList.add("filled");
    } else {
      slot.classList.remove("filled");
    }
  });
}

function refreshPalette() {
  const placed = new Set(state.guess.filter(Boolean));
  document.querySelectorAll("#palette .palette-slot").forEach((wrap) => {
    const peg = wrap.querySelector(".peg");
    if (placed.has(wrap.dataset.paletteColor)) {
      peg.classList.add("hidden");
    } else {
      peg.classList.remove("hidden");
    }
  });
}

function updateSubmitState() {
  const full = state.guess.every((c) => c !== null);
  const submit = document.getElementById("submitBtn");
  const clear = document.getElementById("clearRowBtn");
  submit.disabled = !full || state.gameOver;
  clear.disabled = state.guess.every((c) => c === null) || state.gameOver;
}

/* ---------------------------------------------------------------------
 * Scoring — preserved from original logic
 * ------------------------------------------------------------------- */
function score(guess, secret) {
  const g = [...guess];
  const s = [...secret];
  let correct = 0;
  let present = 0;

  for (let i = 0; i < SLOTS_PER_ROW; i++) {
    if (g[i] === s[i]) {
      correct++;
      g[i] = null;
      s[i] = null;
    }
  }
  for (let i = 0; i < SLOTS_PER_ROW; i++) {
    if (g[i] !== null) {
      const idx = s.indexOf(g[i]);
      if (idx !== -1) {
        present++;
        s[idx] = null;
      }
    }
  }
  return { correct, present };
}

function renderFeedback(attempt, { correct, present }) {
  const row = document.querySelector(`#board .row[data-attempt="${attempt}"]`);
  const pegs = row.querySelectorAll(".fb-peg");
  let i = 0;
  for (let c = 0; c < correct; c++, i++) pegs[i].classList.add("correct");
  for (let p = 0; p < present; p++, i++) pegs[i].classList.add("present");
}

/* ---------------------------------------------------------------------
 * Submit, reset, end-of-game
 * ------------------------------------------------------------------- */
function freezeRow(attempt) {
  document
    .querySelectorAll(`#board .row[data-attempt="${attempt}"] .peg`)
    .forEach((peg) => {
      peg.classList.remove("draggable");
      peg.removeAttribute("draggable");
      peg.dataset.source = "frozen";
    });
}

function submitGuess() {
  if (state.gameOver) return;
  if (!state.guess.every(Boolean)) return;

  const result = score(state.guess, state.secret);
  renderFeedback(state.attempt, result);
  freezeRow(state.attempt);
  state.history.push({ guess: [...state.guess], feedback: result });

  if (result.correct === SLOTS_PER_ROW) {
    document.querySelector(`#board .row[data-attempt="${state.attempt}"]`).classList.add("solved");
    state.won = true;
    state.gameOver = true;
    revealSecret();
    showEndModal(true);
    return;
  }

  if (state.attempt >= MAX_ATTEMPTS) {
    state.gameOver = true;
    revealSecret();
    showEndModal(false);
    return;
  }

  // Advance to the next row
  state.attempt++;
  state.guess = Array(SLOTS_PER_ROW).fill(null);
  refreshPalette();
  activateCurrentRow();
  updateSubmitState();
}

function clearRow() {
  if (state.gameOver) return;
  state.guess = Array(SLOTS_PER_ROW).fill(null);
  renderCurrentGuess();
  refreshPalette();
  updateSubmitState();
}

function revealSecret() {
  const slots = document.querySelectorAll("#secretCode .secret-slot");
  slots.forEach((s, i) => {
    s.innerHTML = "";
    s.classList.add("revealed");
    const peg = makePeg(state.secret[i], { className: "pop sm" });
    s.appendChild(peg);
  });
}

/* ---------------------------------------------------------------------
 * Modals
 * ------------------------------------------------------------------- */
function showEndModal(won) {
  const modal = document.getElementById("endModal");
  const icon = document.getElementById("endIcon");
  const title = document.getElementById("endTitle");
  const sub = document.getElementById("endSubtitle");
  const reveal = document.getElementById("endReveal");

  if (won) {
    icon.className = "mx-auto w-16 h-16 rounded-full grid place-items-center mb-3 text-3xl bg-emerald-500/20 text-emerald-300";
    icon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    title.textContent = "You cracked the code!";
    sub.textContent = `Solved in ${state.attempt} ${state.attempt === 1 ? "try" : "tries"}.`;
  } else {
    icon.className = "mx-auto w-16 h-16 rounded-full grid place-items-center mb-3 text-3xl bg-rose-500/20 text-rose-300";
    icon.innerHTML = '<i class="fa-solid fa-face-frown"></i>';
    title.textContent = "Out of guesses";
    sub.textContent = "Here was the secret code:";
  }

  reveal.innerHTML = "";
  state.secret.forEach((id) => {
    const peg = makePeg(id, { className: "sm pop" });
    reveal.appendChild(peg);
  });

  modal.classList.add("modal-open");
}

function hideEndModal() {
  document.getElementById("endModal").classList.remove("modal-open");
}

function showInfoModal() {
  document.getElementById("infoModal").classList.add("modal-open");
}

function hideInfoModal() {
  document.getElementById("infoModal").classList.remove("modal-open");
}

/* ---------------------------------------------------------------------
 * Global handlers
 * ------------------------------------------------------------------- */
function replay() {
  hideEndModal();
  initGame();
}

function initGame() {
  state.secret = generateSecret();
  state.attempt = 1;
  state.gameOver = false;
  state.won = false;
  state.guess = Array(SLOTS_PER_ROW).fill(null);
  state.history = [];

  buildSecretCode();
  buildBoard();
  buildPalette();
  updateSubmitState();
}

document.addEventListener("DOMContentLoaded", () => {
  initGame();

  document.getElementById("submitBtn").addEventListener("click", submitGuess);
  document.getElementById("clearRowBtn").addEventListener("click", clearRow);
  document.getElementById("resetBtn").addEventListener("click", replay);
  document.getElementById("infoBtn").addEventListener("click", showInfoModal);
  document.getElementById("infoClose").addEventListener("click", hideInfoModal);
  document.getElementById("endClose").addEventListener("click", hideEndModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideInfoModal();
      hideEndModal();
    }
    if (e.key === "Enter" && !document.getElementById("submitBtn").disabled) {
      submitGuess();
    }
  });

  // Click outside to close modals
  [document.getElementById("endModal"), document.getElementById("infoModal")].forEach((m) => {
    m.addEventListener("click", (e) => {
      if (e.target === m) m.classList.remove("modal-open");
    });
  });
});

window.replay = replay;
