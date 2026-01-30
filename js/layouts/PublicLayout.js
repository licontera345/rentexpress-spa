/**
 * Layout público (sin autenticación)
 * SOLO renderiza HTML y gestiona event listeners
 */
export class PublicLayout {
    constructor() {
        this.headerSelector = "header";
        this.footerSelector = "footer";
        this.sidebarSelector = "#sidebar";
    }

    /**
     * Renderizar el layout completo
     */
    render() {
        this.renderHeader();
        this.renderFooter();
        this.removeSidebar(); // Asegurar que no hay sidebar en público
    }

    /**
     * Renderizar el header público
     */
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
                <a href="#catalog" class="nav-link">Catálogo</a>
                <a href="#" id="btnLogin" class="nav-link nav-link-primary">Iniciar Sesión</a>
            </nav>
        `;
    }

    /**
     * Renderizar el footer público
     */
    renderFooter() {
        let footer = document.querySelector(this.footerSelector);
        
        // Crear footer si no existe
        if (!footer) {
            footer = document.createElement("footer");
            const app = document.getElementById("app");
            if (app) {
                app.appendChild(footer);
            }
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

    /**
     * Eliminar sidebar si existe
     */
    removeSidebar() {
        const sidebar = document.querySelector(this.sidebarSelector);
        if (sidebar) {
            sidebar.remove();
        }
    }

    /**
     * Configurar event listeners
     * @param {Function} onLoginClick - Callback para el botón de login
     */
    setupEventListeners(onLoginClick) {
        const btnLogin = document.getElementById("btnLogin");
        
        if (btnLogin && onLoginClick) {
            // Eliminar listeners anteriores
            const newBtn = btnLogin.cloneNode(true);
            btnLogin.parentNode.replaceChild(newBtn, btnLogin);
            
            // Agregar nuevo listener
            newBtn.addEventListener("click", (e) => {
                e.preventDefault();
                onLoginClick();
            });
        }
    }

    /**
     * Mostrar el layout
     */
    show() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        
        if (header) header.style.display = "flex";
        if (footer) footer.style.display = "block";
    }

    /**
     * Ocultar el layout
     */
    hide() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        
        if (header) header.style.display = "none";
        if (footer) footer.style.display = "none";
    }
}