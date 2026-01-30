/**
 * Vista de la página de inicio
 * SOLO renderiza HTML, NO tiene lógica de negocio
 */
export class HomeView {
    constructor() {
        this.containerSelector = "#home-view";
        this.$container = document.querySelector(this.containerSelector);
    }

    /**
     * Renderizar la página de inicio
     * @param {Object} data - { title: string, subtitle: string }
     */
    render(data = {}) {
        if (!this.$container) return;

        const { title = 'Bienvenido a RentExpress', subtitle = 'Tu solución de alquiler de vehículos' } = data;

        this.$container.innerHTML = `
            <div class="home-hero">
                <div class="home-content">
                    <h1 class="home-title">${title}</h1>
                    <p class="home-subtitle">${subtitle}</p>
                    <div class="home-features">
                        <div class="feature-card">
                            <span class="feature-icon">🚗</span>
                            <h3>Amplia flota</h3>
                            <p>Vehículos modernos y bien mantenidos</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">📍</span>
                            <h3>Múltiples sedes</h3>
                            <p>Recoge y devuelve donde prefieras</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">⚡</span>
                            <h3>Proceso rápido</h3>
                            <p>Reserva en minutos</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    show() {
        if (this.$container) {
            this.$container.style.display = "block";
        }
    }

    hide() {
        if (this.$container) {
            this.$container.style.display = "none";
        }
    }
}