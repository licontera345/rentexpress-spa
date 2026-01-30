import sessionController from "../controllers/SessionController.js";

/**
 * Layout privado (con autenticación)
 * SOLO renderiza HTML y gestiona event listeners
 */
export class PrivateLayout {
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
        this.renderSidebar();
        this.renderFooter();
    }

    /**
     * Renderizar el header privado
     */
    renderHeader() {
        const header = document.querySelector(this.headerSelector);
        if (!header) return;

        const user = sessionController.getLoggedInUser();
        const userType = user?.loginType === "employee" ? "Empleado" : "Usuario";
        const userName = user?.username || "Usuario";

        header.innerHTML = `
            <div class="header-brand">
                <img src="./img/android-chrome-192x192.png" alt="RentExpress Logo" class="header-logo">
                <h1>RentExpress</h1>
            </div>
            <nav class="header-nav-private">
                <div class="user-info">
                    <span class="user-badge">${userType}</span>
                    <span class="user-name">${userName}</span>
                </div>
                <a href="#" id="btnLogout" class="nav-link nav-link-danger">Cerrar Sesión</a>
            </nav>
        `;
    }

    /**
     * Renderizar el sidebar
     */
    renderSidebar() {
        const user = sessionController.getLoggedInUser();
        const isEmployee = user?.loginType === "employee";

        let sidebar = document.querySelector(this.sidebarSelector);
        
        // Crear sidebar si no existe
        if (!sidebar) {
            const main = document.querySelector("main");
            if (!main) return;

            sidebar = document.createElement("aside");
            sidebar.id = "sidebar";
            sidebar.className = "sidebar";
            main.parentNode.insertBefore(sidebar, main);
        }

        const menuItems = isEmployee ? this.getEmployeeMenu() : this.getUserMenu();

        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>Menú</h3>
            </div>
            <nav class="sidebar-nav">
                ${menuItems.map(item => `
                    <a href="${item.hash}" class="sidebar-link" data-route="${item.route}">
                        <span class="sidebar-icon">${item.icon}</span>
                        <span class="sidebar-text">${item.text}</span>
                    </a>
                `).join("")}
            </nav>
        `;
    }

    /**
     * Obtener menú para empleados
     */
    getEmployeeMenu() {
        return [
            { hash: "#home", route: "home", icon: "🏠", text: "Inicio" },
            { hash: "#catalog", route: "catalog", icon: "🚗", text: "Catálogo" },
            { hash: "#manage-vehicles", route: "manage-vehicles", icon: "⚙️", text: "Gestionar Vehículos" }
        ];
    }

    /**
     * Obtener menú para usuarios
     */
    getUserMenu() {
        return [
            { hash: "#home", route: "home", icon: "🏠", text: "Inicio" },
            { hash: "#catalog", route: "catalog", icon: "🚗", text: "Buscar Vehículos" }
        ];
    }

    /**
     * Renderizar el footer privado
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
                    <p>Panel de administración</p>
                </div>
                <div class="footer-section">
                    <h4>Soporte</h4>
                    <p>📧 soporte@rentexpress.com</p>
                    <p>📞 +34 900 123 456</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} RentExpress. Todos los derechos reservados.</p>
            </div>
        `;
    }

    /**
     * Configurar event listeners
     * @param {Function} onLogout - Callback para el botón de logout
     * @param {Object} router - Instancia del router para actualizar sidebar
     */
    setupEventListeners(onLogout, router) {
        // Listener para logout
        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout && onLogout) {
            // Eliminar listeners anteriores
            const newBtn = btnLogout.cloneNode(true);
            btnLogout.parentNode.replaceChild(newBtn, btnLogout);
            
            // Agregar nuevo listener
            newBtn.addEventListener("click", (e) => {
                e.preventDefault();
                onLogout();
            });
        }

        // Actualizar el estado activo del sidebar según la ruta actual
        if (router) {
            this.updateSidebarActiveState(router);
        }
    }

    /**
     * Actualizar el estado activo del sidebar
     */
    updateSidebarActiveState(router) {
        const currentHash = window.location.hash.slice(1) || 'home';
        
        document.querySelectorAll(".sidebar-link").forEach(link => {
            const route = link.dataset.route;
            if (route === currentHash) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    /**
     * Mostrar el layout
     */
    show() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        const sidebar = document.querySelector(this.sidebarSelector);
        
        if (header) header.style.display = "flex";
        if (footer) footer.style.display = "block";
        if (sidebar) sidebar.style.display = "block";
    }

    /**
     * Ocultar el layout
     */
    hide() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        const sidebar = document.querySelector(this.sidebarSelector);
        
        if (header) header.style.display = "none";
        if (footer) header.style.display = "none";
        if (sidebar) sidebar.style.display = "none";
    }
}