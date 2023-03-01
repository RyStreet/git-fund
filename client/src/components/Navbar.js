import React from "react"

function NavBar() {
    return(

        <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">GitFund</a>
          </div>
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            
            <li><a href="#">Profile</a></li>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Create Project</a></li>
          </ul>
        </div>
      </nav>

     
    
    )
};

export default NavBar;