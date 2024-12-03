document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Créer des flocons
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❅';

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's'; // Entre 2 et 5 secondes
    snowflake.style.opacity = Math.random();

    body.appendChild(snowflake);

    // Retirer le flocon après l'animation
    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  // Générer des flocons de neige toutes les 300ms
  setInterval(createSnowflake, 300);
});
