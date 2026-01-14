export const showNotification = (message) => {
  const notification = document.querySelector('.notification');
  notification.textContent = message;
  notification.classList.remove('hidden')
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
    notification.classList.add('hidden')
  })
}