
// Konami code sequence
const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const initKonamiCode = (callback: () => void) => {
  let konamiCodePosition = 0;

  const keydownHandler = (e: KeyboardEvent) => {
    // Get the key from the event
    const key = e.key;

    // Get the expected key from the konami code sequence
    const expectedKey = konamiCode[konamiCodePosition];

    // Check if the key matches what we expect
    if (key.toLowerCase() === expectedKey.toLowerCase()) {
      // Move to the next key in the sequence
      konamiCodePosition++;

      // If the sequence is complete, execute the callback
      if (konamiCodePosition === konamiCode.length) {
        callback();
        konamiCodePosition = 0; // Reset the position
      }
    } else {
      // If the key is incorrect, reset the sequence
      konamiCodePosition = 0;
    }
  };

  // Add the event listener
  document.addEventListener('keydown', keydownHandler);

  // Return a cleanup function
  return () => {
    document.removeEventListener('keydown', keydownHandler);
  };
};

export default initKonamiCode;
