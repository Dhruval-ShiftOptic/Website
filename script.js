const variants = {
  mini: {
    name: "NetSentinel Mini",
    price: 100,
    description: "Small-office network visibility",
    paymentLink: "https://buy.stripe.com/3cI7sLchQ7e06NX7Fq5sA00"
  },
  pro: {
    name: "NetSentinel Pro",
    price: 200,
    description: "Performance metrics and history",
    paymentLink: "https://buy.stripe.com/7sY3cv6Xwaqcb4d3pa5sA01"
  },
  ultra: {
    name: "NetSentinel Ultra",
    price: 299,
    description: "Factory Mode and cloud monitoring",
    paymentLink: "https://buy.stripe.com/9B6eVd3Lkaqc0pz1h25sA02"
  }
};

const cart = new Map();
const salesEmail = "dhruval.shiftoptic@yahoo.com";
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItems = document.querySelector("[data-cart-items]");
const cartEmpty = document.querySelector("[data-cart-empty]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");

function money(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function setQuantity(key, quantity) {
  if (quantity <= 0) {
    cart.delete(key);
  } else {
    cart.set(key, quantity);
  }
  renderCart();
}

function addToCart(key) {
  cart.set(key, (cart.get(key) || 0) + 1);
  renderCart();
  openCart();
}

function renderCart() {
  const entries = [...cart.entries()];
  cartItems.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  entries.forEach(([key, quantity]) => {
    const item = variants[key];
    totalItems += quantity;
    totalPrice += item.price * quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <small>${item.description}</small>
        <small>${money(item.price)} each</small>
      </div>
      <div class="qty-controls" aria-label="${item.name} quantity controls">
        <button type="button" aria-label="Decrease ${item.name} quantity">-</button>
        <strong>${quantity}</strong>
        <button type="button" aria-label="Increase ${item.name} quantity">+</button>
      </div>
    `;

    const [decrease, increase] = row.querySelectorAll("button");
    decrease.addEventListener("click", () => setQuantity(key, quantity - 1));
    increase.addEventListener("click", () => setQuantity(key, quantity + 1));
    cartItems.appendChild(row);
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = money(totalPrice);
  cartEmpty.classList.toggle("show", entries.length === 0);
}

document.querySelector("[data-open-cart]").addEventListener("click", openCart);
document.querySelector("[data-close-cart]").addEventListener("click", closeCart);
cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
});

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.add));
});

document.querySelectorAll("[data-buy]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = variants[button.dataset.buy].paymentLink;
  });
});

document.querySelector("[data-quick-buy]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  window.location.href = variants[form.get("variant")].paymentLink;
});

document.querySelector("[data-checkout]").addEventListener("click", () => {
  if (cart.size === 0) return;
  const entries = [...cart.entries()];
  if (entries.length === 1 && entries[0][1] === 1) {
    window.location.href = variants[entries[0][0]].paymentLink;
    return;
  }

  const lines = [...cart.entries()].map(([key, quantity]) => {
    const item = variants[key];
    return `${quantity} x ${item.name} - ${money(item.price * quantity)}`;
  });
  const total = [...cart.entries()].reduce((sum, [key, quantity]) => sum + variants[key].price * quantity, 0);
  const subject = encodeURIComponent("NetSentinel order request");
  const body = encodeURIComponent(`Hello Shiftoptic LLC,\n\nI would like to order:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\n\nPlease contact me with next steps.`);
  window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
});

document.querySelector("[data-lead-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent("NetSentinel inquiry");
  const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message") || "I am interested in NetSentinel."}`);
  window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
});

function drawNetworkMap() {
  const canvas = document.getElementById("network-map");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const center = { x: width / 2, y: height / 2 };
  const nodes = [
    { x: 74, y: 58, label: "PLC", color: "#56d173" },
    { x: 132, y: 162, label: "POS", color: "#00a991" },
    { x: 314, y: 48, label: "CAM", color: "#f3b536" },
    { x: 362, y: 154, label: "IoT", color: "#00a991" },
    { x: 224, y: 174, label: "AP", color: "#e85656" }
  ];
  let frame = 0;

  function render() {
    frame += 0.02;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#101820";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(157, 240, 222, 0.1)";
    context.lineWidth = 1;

    for (let x = 0; x < width; x += 28) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += 28) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    nodes.forEach((node, index) => {
      const y = node.y + Math.sin(frame * 2 + index) * 4;
      context.strokeStyle = "rgba(0, 169, 145, 0.42)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(center.x, center.y);
      context.lineTo(node.x, y);
      context.stroke();
      context.fillStyle = node.color;
      context.beginPath();
      context.arc(node.x, y, 13, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#dffcf7";
      context.font = "700 12px system-ui";
      context.textAlign = "center";
      context.fillText(node.label, node.x, y + 31);
    });

    context.fillStyle = "#56d173";
    context.beginPath();
    context.arc(center.x, center.y, 18, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#101820";
    context.font = "900 12px system-ui";
    context.textAlign = "center";
    context.fillText("NET", center.x, center.y + 4);
    requestAnimationFrame(render);
  }
  render();
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal, .feature-card, .price-card, .capability-list article");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    observer.observe(item);
  });
}

function initCardTilt() {
  const cards = document.querySelectorAll(".feature-card, .price-card, .dashboard-preview");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

async function initHeroThreeScene() {
  const mount = document.getElementById("hero-3d");
  if (!mount) return;

  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const boxMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x132129,
      metalness: 0.42,
      roughness: 0.32,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22
    });
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x00a991 });
    const accentMaterial = new THREE.MeshBasicMaterial({ color: 0x56d173 });
    const device = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.35, 0.42), boxMaterial);
    device.position.set(2.2, -0.1, 0);
    device.rotation.set(-0.16, -0.45, 0.08);
    group.add(device);

    for (let i = 0; i < 8; i += 1) {
      const port = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.04), i % 3 === 0 ? accentMaterial : glowMaterial);
      port.position.set(1.28 - i * 0.25, -0.62, 0.24);
      device.add(port);
    }

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf3b536 });
    const nodes = [];
    const lines = new THREE.Group();
    group.add(lines);
    const nodePositions = [
      [-3.2, 1.55, -0.2],
      [-2.15, -1.45, 0.2],
      [-0.7, 1.0, -0.3],
      [0.15, -1.1, 0.15],
      [3.8, 1.05, -0.2]
    ];

    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? 0.15 : 0.11, 24, 24), index === 0 ? accentMaterial : nodeMaterial);
      node.position.set(position[0], position[1], position[2]);
      nodes.push(node);
      group.add(node);

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(position[0], position[1], position[2]),
        new THREE.Vector3((position[0] + 2.2) / 2, position[1] * 0.28, -0.6),
        new THREE.Vector3(2.2, -0.1, 0)
      ]);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 40, 0.012, 8, false),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0x00a991 : 0x56d173, transparent: true, opacity: 0.46 })
      );
      lines.add(tube);
    });

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00a991, transparent: true, opacity: 0.17, side: THREE.DoubleSide });
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55 + i * 0.62, 0.009, 8, 96), ringMaterial);
      ring.position.copy(device.position);
      ring.rotation.set(1.2, 0.25, 0.1);
      group.add(ring);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1.45));
    const light = new THREE.PointLight(0x9df0de, 18, 18);
    light.position.set(1.8, 2.5, 4);
    scene.add(light);

    function resize() {
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || 620;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", resize);
    resize();

    function animate(time) {
      const seconds = time * 0.001;
      group.rotation.y = Math.sin(seconds * 0.34) * 0.16;
      group.rotation.x = Math.sin(seconds * 0.27) * 0.05;
      device.position.y = -0.1 + Math.sin(seconds * 1.2) * 0.08;
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(seconds * 2 + index) * 0.16);
      });
      lines.children.forEach((line, index) => {
        line.material.opacity = 0.28 + Math.sin(seconds * 1.8 + index) * 0.14;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  } catch (error) {
    mount.classList.add("three-fallback");
    drawHeroFallback(mount);
  }
}

function drawHeroFallback(mount) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  mount.appendChild(canvas);

  function resize() {
    canvas.width = mount.clientWidth || window.innerWidth;
    canvas.height = mount.clientHeight || 620;
  }

  function render(time) {
    const width = canvas.width;
    const height = canvas.height;
    const t = time * 0.001;
    context.clearRect(0, 0, width, height);
    context.globalAlpha = 0.7;
    context.lineWidth = 1.5;

    const cx = width * 0.68;
    const cy = height * 0.43;
    const nodes = [
      [cx - 280, cy - 130],
      [cx - 180, cy + 120],
      [cx + 70, cy - 160],
      [cx + 250, cy + 80],
      [cx + Math.sin(t) * 35, cy + 20]
    ];

    context.strokeStyle = "rgba(0, 169, 145, 0.32)";
    nodes.forEach(([x, y], index) => {
      context.beginPath();
      context.moveTo(cx, cy);
      context.bezierCurveTo((x + cx) / 2, y + Math.sin(t + index) * 30, (x + cx) / 2, cy, x, y);
      context.stroke();
    });

    context.save();
    context.translate(cx, cy);
    context.rotate(Math.sin(t) * 0.08);
    context.transform(1, -0.12, -0.18, 0.86, 0, 0);
    context.fillStyle = "rgba(16, 24, 32, 0.9)";
    context.shadowColor = "rgba(0, 169, 145, 0.35)";
    context.shadowBlur = 36;
    context.fillRect(-130, -60, 260, 120);
    context.shadowBlur = 0;
    context.fillStyle = "#9df0de";
    context.font = "800 22px system-ui";
    context.fillText("NetSentinel", -96, -18);
    context.fillStyle = "#00a991";
    for (let i = 0; i < 8; i += 1) {
      context.fillRect(-96 + i * 24, 34 + Math.sin(t * 2 + i) * 4, 12, 12);
    }
    context.restore();

    nodes.forEach(([x, y], index) => {
      context.fillStyle = index === 4 ? "#56d173" : index === 2 ? "#f3b536" : "#00a991";
      context.beginPath();
      context.arc(x, y + Math.sin(t * 2 + index) * 8, 10 + Math.sin(t + index) * 2, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(render);
}

drawNetworkMap();
renderCart();
initRevealAnimations();
initCardTilt();
initHeroThreeScene();
