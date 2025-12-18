export class PublicLayout {
    constructor() {
        this.headerSelector = "header";
        this.footerSelector = "footer";
    }

    render() {
        this.renderHeader();
        this.renderFooter();
    }

    renderHeader() {
        const header = document.querySelector(this.headerSelector);
        if (!header) return;

        header.innerHTML = `
            <div class="header-brand">
                <img src="./img/android-chrome-192x192.png" alt="RentExpress Logo" class="header-logo">
                <h1>RentExpress</h1>
            </div>
            <nav>
                <a href="#home" class="nav-link">Inicio</a>
                <a href="#" id="btnLogin" class="nav-link nav-link-primary">Iniciar Sesión</a>
            </nav>
        `;
    }

    renderFooter() {
        let footer = document.querySelector(this.footerSelector);
        
        if (!footer) {
            footer = document.createElement("footer");
            document.getElementById("app").appendChild(footer);
        }

        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h3>RentExpress</h3>
                    <p>Tu solución de alquiler de vehículos de confianza</p>
                </div>
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p>📧 info@rentexpress.com</p>
                    <p>📞 +34 900 123 456</p>
                </div>
                <div class="footer-section">
                    <h4>Horario</h4>
                    <p>Lunes - Viernes: 8:00 - 20:00</p>
                    <p>Sábados: 9:00 - 14:00</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} RentExpress. Todos los derechos reservados.</p>
            </div>
        `;
    }

    setupEventListeners(loginController) {
        const btnLogin = document.getElementById("btnLogin");
        if (btnLogin && loginController) {
            btnLogin.addEventListener("click", (e) => {
                e.preventDefault();
                loginController.show();
            });
        }
    }

    show() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        if (header) header.style.display = "flex";
        if (footer) footer.style.display = "block";
    }

    hide() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        if (header) header.style.display = "none";
        if (footer) footer.style.display = "none";
    }
}