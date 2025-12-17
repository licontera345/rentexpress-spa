import sessionController from "../controllers/SessionController.js";

/**
 * Layout para páginas privadas (requieren autenticación)
 * Incluye: Header con logo + usuario + botón Logout, Footer, Menú lateral según rol
 */
export class PrivateLayout {
    constructor() {
        this.headerSelector = "header";
        this.footerSelector = "footer";
        this.sidebarSelector = "#sidebar";
    }

    render() {
        this.renderHeader();
        this.renderSidebar();
        this.renderFooter();
    }

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

    renderSidebar() {
        const user = sessionController.getLoggedInUser();
        const isEmployee = user?.loginType === "employee";

        let sidebar = document.querySelector(this.sidebarSelector);
        
        if (!sidebar) {
            const main = document.querySelector("main");
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

    getEmployeeMenu() {
        return [
            { hash: "#home", route: "home", icon: "🏠", text: "Inicio" },
            { hash: "#catalog", route: "catalog", icon: "🚗", text: "Catálogo" },
            { hash: "#manage-vehicles", route: "manage-vehicles", icon: "⚙️", text: "Gestionar Vehículos" },
            { hash: "#manage-rentals", route: "manage-rentals", icon: "📋", text: "Gestionar Alquileres" },
            { hash: "#reports", route: "reports", icon: "📊", text: "Reportes" }
        ];
    }

    getUserMenu() {
        return [
            { hash: "#home", route: "home", icon: "🏠", text: "Inicio" },
            { hash: "#catalog", route: "catalog", icon: "🚗", text: "Buscar Vehículos" },
            { hash: "#my-reservations", route: "my-reservations", icon: "📅", text: "Mis Reservas" },
            { hash: "#my-profile", route: "my-profile", icon: "👤", text: "Mi Perfil" }
        ];
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

    setupEventListeners(logoutCallback, router) {
        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout && logoutCallback) {
            btnLogout.addEventListener("click", (e) => {
                e.preventDefault();
                logoutCallback();
            });
        }

        // Resaltar ruta activa en el sidebar
        if (router) {
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
    }

    show() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        const sidebar = document.querySelector(this.sidebarSelector);
        if (header) header.style.display = "flex";
        if (footer) footer.style.display = "block";
        if (sidebar) sidebar.style.display = "block";
    }

    hide() {
        const header = document.querySelector(this.headerSelector);
        const footer = document.querySelector(this.footerSelector);
        const sidebar = document.querySelector(this.sidebarSelector);
        if (header) header.style.display = "none";
        if (footer) footer.style.display = "none";
        if (sidebar) sidebar.style.display = "none";
    }
}