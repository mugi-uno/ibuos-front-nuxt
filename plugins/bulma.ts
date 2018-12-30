document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body')!.addEventListener('click', (event: any) => {
    const burger: any = document.querySelector('.navbar-burger');
    const targetId = burger.dataset.target;
    const target = document.getElementById(targetId);

    if (burger === event.target) {
      burger.classList.toggle('is-active');
      target!.classList.toggle('is-active');
    } else {
      burger.classList.remove('is-active');
      target!.classList.remove('is-active');
    }
  });
});
