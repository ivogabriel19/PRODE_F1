document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".dropdown-toggle");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = button.getAttribute("data-target");
      const menu = document.getElementById(targetId);

      // Cerrar otros menús
      document.querySelectorAll(".dropdown-menu").forEach((drop) => {
        if (drop !== menu) drop.classList.remove("active");
      });

      // Alternar visibilidad del menú actual
      menu.classList.toggle("active");
    });
  });

  // Cerrar menús al hacer clic fuera
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("active");
    });
  });
});
