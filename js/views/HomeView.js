export class HomeView {
    constructor() {
        this.containerSelector = "#home-view";
        this.$container = document.querySelector(this.containerSelector);
    }

    render() {
        if (!this.$container) return;
        this.$container.innerHTML = ``;
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}