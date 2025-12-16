import HomeView from "../views/HomeView.js";

const HomeController = {

    init() {
        HomeView.render();
        this.setupEventListeners();
    },
    setupEventListeners() {
 
    }
};

export default HomeController;