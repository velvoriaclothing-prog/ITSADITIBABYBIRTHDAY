import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff758c', '#ff7eb3', '#fbc2eb', '#fad0c4'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fbc2eb', '#a18cd1', '#fad0c4', '#ff9a9e'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffccd5', '#ffe3e8', '#fff0f3', '#f43f5e', '#fb7185'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#ffd166', '#ffb703', '#fb8500'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ff4d6d', '#ff758c', '#ffffff'],
  });
}

export function fireHeartConfetti() {
  const scalar = 2;
  const heart = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  });

  confetti({
    shapes: [heart],
    scalar,
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff4d6d', '#ff758c', '#ff8fa3', '#ffccd5'],
    zIndex: 9999
  });
}
