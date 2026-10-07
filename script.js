// ================================
// EDWSAN — configuración rápida
// Cambia este número por tu WhatsApp.
// Formato internacional SIN +, espacios ni guiones.
// Ejemplo Colombia: 573001234567
// ================================
const WHATSAPP_NUMBER = "573001234567";

const waMessage = (product = "") =>
  encodeURIComponent(
    product
      ? `Hola EDWSAN 👋 Estoy interesado en la camiseta "${product}". ¿Me pueden dar disponibilidad y tallas?`
      : "Hola EDWSAN 👋 Quiero conocer los productos disponibles."
  );

function setWhatsAppLinks() {
  const generalUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage()}`;
  document.querySelectorAll(".whatsapp-main, .floating-wa").forEach(link => {
    link.href = generalUrl;
  });

  document.querySelectorAll(".product-wa").forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage(link.dataset.product)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });
}
setWhatsAppLinks();

// Menú móvil
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
document.querySelectorAll("nav a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

// Animaciones al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Reseñas — se guardan en el navegador (localStorage)
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

const defaultReviews = [
  {
    name: "Cliente EDWSAN",
    rating: 5,
    text: "El diseño se siente diferente y la camiseta quedó muy brutal. La volvería a comprar."
  },
  {
    name: "Comunidad EDWSAN",
    rating: 5,
    text: "Me gustó la estética de la marca y la atención. Se nota que hay una idea detrás."
  }
];

function getReviews() {
  const saved = localStorage.getItem("edwsanReviews");
  return saved ? JSON.parse(saved) : defaultReviews;
}

function renderReviews() {
  const reviews = getReviews();
  reviewList.innerHTML = "";

  reviews.slice().reverse().forEach(review => {
    const article = document.createElement("article");
    article.className = "review";

    const top = document.createElement("div");
    top.className = "review-top";

    const left = document.createElement("div");
    const name = document.createElement("div");
    name.className = "review-name";
    name.textContent = review.name;

    const date = document.createElement("div");
    date.className = "review-date";
    date.textContent = review.date || "Cliente EDWSAN";

    left.append(name, date);

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.textContent = "★".repeat(Number(review.rating)) + "☆".repeat(5 - Number(review.rating));

    top.append(left, stars);

    const text = document.createElement("p");
    text.textContent = review.text;

    article.append(top, text);
    reviewList.appendChild(article);
  });
}

reviewForm.addEventListener("submit", event => {
  event.preventDefault();

  const reviews = getReviews();
  reviews.push({
    name: document.getElementById("reviewName").value.trim(),
    rating: Number(document.getElementById("reviewRating").value),
    text: document.getElementById("reviewText").value.trim(),
    date: new Date().toLocaleDateString("es-CO")
  });

  localStorage.setItem("edwsanReviews", JSON.stringify(reviews));
  reviewForm.reset();
  renderReviews();
  alert("¡Gracias por dejar tu reseña! 🖤");
});

renderReviews();


// ===== EDWSAN INTERACTIVE HOVER =====

// Purple ambient cursor glow on desktop.
if (window.matchMedia("(pointer:fine)").matches) {
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  let gx = window.innerWidth / 2;
  let gy = window.innerHeight / 2;
  let tx = gx, ty = gy;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function animateGlow() {
    gx += (tx - gx) * 0.13;
    gy += (ty - gy) * 0.13;
    glow.style.left = gx + "px";
    glow.style.top = gy + "px";
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Product cards follow the mouse very slightly for a premium 3D feel.
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotateY = ((x / r.width) - .5) * 5;
      const rotateX = ((y / r.height) - .5) * -5;

      card.style.setProperty("--mx", `${(x / r.width) * 100}%`);
      card.style.setProperty("--my", `${(y / r.height) * 100}%`);
      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Hero shirt gently tilts toward the pointer.
  const heroArt = document.querySelector(".hero-art");
  const shirt = document.querySelector(".shirt-card");

  if (heroArt && shirt) {
    heroArt.addEventListener("mousemove", (e) => {
      const r = heroArt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      shirt.style.transform =
        `rotate(${4 + x * 4}deg) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-8px)`;
    });

    heroArt.addEventListener("mouseleave", () => {
      shirt.style.transform = "";
    });
  }
}
