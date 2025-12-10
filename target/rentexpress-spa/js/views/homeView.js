const HomeView = {

    container: "#home-view",

    render() {
        const c = document.querySelector(this.container);
        if (!c) {
            return;
        }

        const html = ` `;

        c.innerHTML = html;
    }
};

export default HomeView;