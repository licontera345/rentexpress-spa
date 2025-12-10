import HomeView from "../views/homeView.js";

const HomeController = {

    init() {
        HomeView.render();
        this.setupEventListeners();
    },
    setupEventListeners() {
 
    }
};

export default HomeController;