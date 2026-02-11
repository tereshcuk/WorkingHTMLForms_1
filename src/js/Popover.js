export default class Popover {
  constructor(btnId, popoverId) {
    this.btn = document.getElementById(btnId);
    this.popover = document.getElementById(popoverId);
    this.isShown = false;
    this.btn.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.popover.style.display = "block";
    const rect = this.btn.getBoundingClientRect();

    const topPosition = Math.round(rect.top - this.popover.offsetHeight) - 15;
    const leftPosition =
      Math.round(rect.left + rect.width / 2 - this.popover.offsetWidth / 2) - 8;

    this.popover.style.top = `${topPosition}px`;
    this.popover.style.left = `${leftPosition}px`;
    this.isShown = true;
  }

  hide() {
    this.popover.style.display = "none";
    this.isShown = false;
  }
}


