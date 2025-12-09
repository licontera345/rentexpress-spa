const HomeView = {

    container: "#home-view",

    render() {
        const c = document.querySelector(this.container);
        if (!c) {
            return;
        }

        const html = `
            <div class="home-intro">
                <h2>Bienvenido a RentExpress</h2>
                <p>Consulta el catálogo público de vehículos disponibles.</p>
            </div>
        `;

        c.innerHTML = html;
    }
};

export default HomeView;