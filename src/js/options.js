import '../css/options.css';

const $form = document.querySelector('form');
const $message = document.querySelector('.message');

function showMessage(message, duration) {
  $message.textContent = message;
  if (duration) {
    setTimeout(() => {
      $message.textContent = '';
    }, duration);
  }
}

chrome.storage.sync.get('colorsDisabled', result => {
  $form.colors.checked = !(result || {}).colorsDisabled;
});

$form.addEventListener('submit', e => {
  e.preventDefault();

  const colorsDisabled = !$form.colors.checked;

  showMessage('Saving...');
  $form.save.disabled = true;

  chrome.storage.sync.set({ colorsDisabled }, () => {
    showMessage('Saved!', 1000);
    $form.save.disabled = false;
  });
});
