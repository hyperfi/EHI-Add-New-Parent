
const Navbar = {
  template: `
    <nav  class="h2 navbar navbar-expand-sm navbar-dark " >

      <img src="/static/images/logo.jpg" alt="" width="50" height="50" style="position: absolute;left: 10px; top:10px">
      
      
      <div class="container-fluid d-flex justify-content-center gap-5">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav  mx-auto">
                <li class="nav-item"  >
                    <router-link to="/" ><button type="button" class="btn btn-bg-custom shadow">Home</button></router-link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
  `,

  data() {
    return {
      LoginState: { true: "&#128994", false: "&#128997" }
    }
  },


  methods: {}
 
};


export default Navbar;
