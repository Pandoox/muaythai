// ==== CONFIGURAÇÃO ====
// Troque o número abaixo pelo seu WhatsApp (só números, com DDI 55 + DDD)
const WHATSAPP_NUMBER = "5581996482912";

// Troque "img" pelo caminho real da sua foto (ex: "fotos/preto-dourado.jpg")
// Cada produto vira uma mensagem diferente automaticamente no WhatsApp
const produtos = [
  
      {
    nome: "Branco",
    tag: "Tradicional",
    img: "branco.png"
  },

    {
    nome: "Amarelo ",
    tag: "Tradicionala",
    img: "amarelo.png"
  },

    {
    nome: "Verde",
    tag: "Tradicional",
    img: "verde.png"
  },
  {
    nome: "Azul ",
    tag: "Tradicional",
    img: "azul.png"
  },
  {
    nome: "Azul & Branco",
    tag: "Tradicional - Duas cores",
    img: "azul-branco.png"
  },
  {
    nome: "Vermelho",
    tag: "Tradicional",
    img: "vermelho.png"
  },
  {
    nome: "Branco ",
    tag: "Tradicional",
    img: "branco.png"
  },
  {
    nome: "Laranja ",
    tag: "Tradicional",
    img: "vermelho-franja.jpg"
  },

];

const gallery = document.getElementById("gallery");

produtos.forEach((produto) => {
  const card = document.createElement("div");
  card.className = "card";

  const mensagem = encodeURIComponent(
    `Oi! Tenho interesse no prajied "${produto.nome}". Ainda tem disponível?`
  );
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`;

  card.innerHTML = `
    <img src="${produto.img}" alt="Protetor bucal ${produto.nome}" loading="lazy">
    <div class="card-overlay">
      <span class="card-name">${produto.nome}</span>
      <span class="card-tag">
        <svg viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/><path d="M16.02 3.2C9.1 3.2 3.5 8.8 3.5 15.7c0 2.29.6 4.44 1.66 6.3L3.2 28.8l6.97-1.83a12.4 12.4 0 0 0 5.85 1.49h.01c6.92 0 12.52-5.6 12.52-12.5 0-3.34-1.3-6.48-3.66-8.83a12.4 12.4 0 0 0-8.87-3.93zm0 22.6h-.01c-1.83 0-3.63-.49-5.2-1.42l-.37-.22-3.87 1.02 1.03-3.76-.24-.39a10.28 10.28 0 0 1-1.58-5.53c0-5.68 4.62-10.3 10.3-10.3a10.25 10.25 0 0 1 7.29 3.02 10.24 10.24 0 0 1 3.01 7.29c0 5.68-4.62 10.3-10.3 10.3z"/></svg>
        ${produto.tag}
      </span>
    </div>
  `;

  // clique leva pro WhatsApp
  card.addEventListener("click", () => {
    window.open(link, "_blank", "noopener");
  });

  // efeito de tilt 3D ao passar o mouse
  const maxTilt = 10;
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rotateX = (-py * maxTilt).toFixed(2);
    const rotateY = (px * maxTilt).toFixed(2);
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });

  // efeito de tilt no toque (celular) - segue o dedo enquanto arrasta levemente
  card.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rotateX = (-py * maxTilt).toFixed(2);
    const rotateY = (px * maxTilt).toFixed(2);
    card.classList.add("tilting");
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, { passive: true });

  card.addEventListener("touchend", () => {
    card.classList.remove("tilting");
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  });

  gallery.appendChild(card);
});
