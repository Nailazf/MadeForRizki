let current = 1;
const screens = [...document.querySelectorAll(".screen")];

function go(n) {
  screens.forEach((s) => s.classList.remove("active"));
  document.getElementById("s" + n).classList.add("active");
  current = n;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1800);
}

function unlockDiary() {
  const d = document.getElementById("diary");
  if (d.classList.contains("open")) return;
  d.classList.add("open");
  toast("Kunci terbuka ✦");
  setTimeout(() => go(3), 900);
}

/* DRAG & DROP FOR DESKTOP & MOBILE */
const board = document.getElementById("memoryBoard");
let activeItem = null;
let initialX, initialY;

document.querySelectorAll(".draggable").forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "");
    el.classList.add("dragging");
  });

  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });

  el.addEventListener("touchstart", touchStart, { passive: false });
  el.addEventListener("touchend", touchEnd, { passive: false });
  el.addEventListener("touchmove", touchMove, { passive: false });
});

board.addEventListener("dragover", (e) => e.preventDefault());
board.addEventListener("drop", (e) => {
  const item = document.querySelector(".dragging");
  if (!item) return;
  const r = board.getBoundingClientRect();
  item.style.left =
    Math.max(0, e.clientX - r.left - item.offsetWidth / 2) + "px";
  item.style.top =
    Math.max(0, e.clientY - r.top - item.offsetHeight / 2) + "px";
  item.style.transform = "rotate(" + (Math.random() * 16 - 8) + "deg)";
});

function touchStart(e) {
  activeItem = this;
  const touch = e.touches[0];
  initialX = touch.clientX - activeItem.offsetLeft;
  initialY = touch.clientY - activeItem.offsetTop;
}

function touchEnd() {
  activeItem = null;
}

function touchMove(e) {
  if (activeItem) {
    e.preventDefault();
    const touch = e.touches[0];
    const r = board.getBoundingClientRect();
    let x = touch.clientX - initialX;
    let y = touch.clientY - initialY;

    x = Math.max(0, Math.min(x, r.width - activeItem.offsetWidth));
    y = Math.max(0, Math.min(y, r.height - activeItem.offsetHeight));

    activeItem.style.left = x + "px";
    activeItem.style.top = y + "px";
  }
}

/* CAKE LOGIC */
function sliceCake() {
  const container = document.getElementById("cakeContainer");
  container.classList.add("sliced");
  document.querySelector(".slice-btn").classList.add("hidden");
  document.getElementById("cakeNext").classList.remove("hidden");
  toast("Cake sliced! Make a wish ✦");
}

/* WISHES LOGIC */
let wishes = 0;
function collectWish(el) {
  if (el.classList.contains("collected")) return;
  el.classList.add("collected");
  wishes++;
  document.getElementById("wishCount").textContent = wishes;
  toast(el.dataset.wish);
  if (wishes === 6) {
    setTimeout(
      () => document.getElementById("wishNext").classList.remove("hidden"),
      650
    );
  }
}

/* GIFT LOGIC */
let giftOpening = false;
function openGift() {
  if (giftOpening) return;
  giftOpening = true;
  const bar = document.getElementById("progressBar");
  const giftContainer = document.getElementById("giftContainer");
  let x = 0;

  const timer = setInterval(() => {
    x += 2;
    bar.style.width = x + "%";
    if (x >= 100) {
      clearInterval(timer);

      // Animasi kado menghilang lalu ucapan naik ke atas
      giftContainer.classList.add("fade-out");

      setTimeout(() => {
        giftContainer.classList.add("hidden");
        document.getElementById("finalMessage").classList.remove("hidden");
        toast("A little surprise for you ♡");
      }, 500);
    }
  }, 30);
}

function restart() {
  location.reload();
}
