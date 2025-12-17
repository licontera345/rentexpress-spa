import { PublicLayout } from "./PublicLayout.js";
import { PrivateLayout } from "./PrivateLayout.js";

export class LayoutManager {
    constructor(loginController, router) {
        this.publicLayout = new PublicLayout();
        this.privateLayout = new PrivateLayout();
        this.loginController = loginController;
        this.router = router;
        this.currentLayout = null;
    }

    switchToPublic() {
        if (this.currentLayout === 'public') return;
        if (this.currentLayout === 'private') {
            this.privateLayout.hide();
        }

        this.publicLayout.render();
        this.publicLayout.setupEventListeners(this.loginController);
        this.publicLayout.show();

        this.currentLayout = 'public';
  
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-with-sidebar");
            main.classList.add("main-full-width");
        }
    }

    switchToPrivate() {
        if (this.currentLayout === 'private') {
            this.privateLayout.setupEventListeners(
                () => this.handleLogout(), 
                this.router
            );
            return;
        }

        if (this.currentLayout === 'public') {
            this.publicLayout.hide();
        }

        this.privateLayout.render();
        this.privateLayout.setupEventListeners(
            () => this.handleLogout(), 
            this.router
        );
        this.privateLayout.show();

        this.currentLayout = 'private';
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-full-width");
            main.classList.add("main-with-sidebar");
        }
    }

    handleLogout() {
        if (this.loginController) {
            this.loginController.handleLogout();
        }
    }

    updateLayout(isAuthenticated) {
        if (isAuthenticated) {
            this.switchToPrivate();
        } else {
            this.switchToPublic();
        }
    }
}