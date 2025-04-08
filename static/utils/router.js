// import Navbar from "../components/Navbar.js";
import Home from "../pages/Home.js";



const routes = [
  { path: "/", 
    name: "/",
    component: Home,
    meta:{requiresLogout:false}, 
  },

];

const router = new VueRouter({
  routes,
});


// frontend router protection

export default router;
