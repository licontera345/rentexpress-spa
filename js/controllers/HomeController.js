export class HomeController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
    }

    init() {
        this.view.render(); // Ahora sí existe y es seguro llamarlo
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }
}