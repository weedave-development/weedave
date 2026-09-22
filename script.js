const copyButton = document.getElementById('copy-discord');
const copyStatus = document.getElementById('copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('weedave__');
    copyButton.textContent = 'Username copied ✓';
    copyStatus.textContent = 'Paste weedave__ into Discord’s Add Friend field.';
  } catch {
    copyStatus.textContent = 'Copy manually: weedave__ — then add me on Discord.';
  }
});
