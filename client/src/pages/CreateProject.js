import React from "react";

function CreateProject() {
  return (
    <div>
        <h1>Post New Project</h1>
        <form>
          <div>
            <input id="project-title" type="text" name="project-title" placeholder="What is your project title?"/>
          </div> 

          <div>
            <input id="project-description" type="text" name="project-description" placeholder="What is your project title?"/>
          </div>  

          <div>
            <input id="project-collab" type="text" name="project-collab" placeholder="Optional: What kind of collaboration is needed?"/>
          </div>     

          <div>
            <label for="needed-funding">How much funding is needed?</label>
            <input id="needed-funding" type="number" name="needed-funding"/>
          </div>    

          <div>
            <label>Languages used:</label>
            <input id="project-languages" type="text" name="project-languages"/>
          </div>
        </form>
    </div>
  )
};

export default CreateProject;