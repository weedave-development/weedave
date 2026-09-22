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


// Discord's public invite endpoint includes offline members in this total.
async function loadMemberCount(element) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const code = encodeURIComponent(element.dataset.discordInvite);
    const response = await fetch('https://discord.com/api/v10/invites/' + code + '?with_counts=true', {
      signal: controller.signal,
      credentials: 'omit'
    });
    if (!response.ok) throw new Error('Discord count unavailable');
    const invite = await response.json();
    const count = invite.approximate_member_count;
    if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid member count');
    element.textContent = '≈ ' + new Intl.NumberFormat('en-GB').format(count) + ' Discord ' + (count === 1 ? 'member' : 'members');
    element.title = 'Approximate total members, including offline members. Updated on page load.';
  } catch {
    element.textContent = 'Discord member count unavailable';
  } finally {
    clearTimeout(timeout);
  }
}

document.querySelectorAll('[data-discord-invite]').forEach(loadMemberCount);
