
// First, we need to import all the classes that will be used in this program.
const inquirer = require('inquirer');
const fs = require('fs');

const { Manager } = require('./lib/Manager');
const { Engineer } = require('./lib/Engineer');
const { Intern } = require('./lib/Intern');
const { Employee } = require('./lib/Employee');

const githubUrl = "https://github.com/"

function Team(manager) {
  this.manager = manager;
  this.employees = []
  this.employees.push(manager);

  this.addEmployees = function(employee) {
    this.employees.push(employee);
  }
}

let team = null;

function generateCards() {
  let cardsString = "";
  
  for (let i = 0; i < team.employees.length; i++) {
    const employee = team.employees[i];

    // If it is the first card in the row
    let useOffset = i != 0 || i%4 == 0 ? " offset-1" : "";

    if(employee instanceof Manager) {
      cardsString += `
<div class="col-2${useOffset}">
  <div class="card" style="width: 18rem;">
    <div class="card-body text-center">
      <h5 class="card-title">Name: ${employee.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.id}</h6>
      <a href="mailto:${employee.email}?subject=Subject&body=message%20goes%20here">Email: ${employee.email}</a>
      <p>Office Number: ${employee.officeNumber}</p>
    </div>
  </div>
</div>
    `;
    } else if (employee instanceof Engineer) {
      cardsString += `
<div class="col-2${useOffset}">
  <div class="card" style="width: 18rem;">
    <div class="card-body text-center">
      <h5 class="card-title">Name: ${employee.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.id}</h6>
      <a href="mailto:${employee.email}?subject=Subject&body=message%20goes%20here">Email: ${employee.email}</a>
      <a href="${githubUrl + employee.github}" target="_blank">Github: ${employee.github}</a>
    </div>
  </div>
</div>
    `;
    } else if (employee instanceof Intern) {
      cardsString += `
<div class="col-2${useOffset}">
  <div class="card" style="width: 18rem;">
    <div class="card-body text-center">
      <h5 class="card-title">Name: ${employee.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${employee.id}</h6>
      <a href="mailto:${employee.email}?subject=Subject&body=message%20goes%20here">Email: ${employee.email}</a>
      <p>School: ${employee.school}</p>
    </div>
  </div>
</div>
    `;
    }
  }

  return cardsString;
}

// Functions
function generateTeamProfile() {
  fs.writeFile('./dist/index.html', `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>

    <title>Team Profile</title>

    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl' crossorigin='anonymous'>
  </head>
  <body>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid d-flex flex-column text-center">
        <h1 class="navbar-brand mb-0" style="margin-left: 135px;">${team.employees[0].name /* manager is always the 0th index */}'s team</h1>
      </div>
    </nav>

    <br>

    <div class="container">
      <div class="row">
        ${generateCards()}
      </div>
    </div>

    <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js' integrity='sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0' crossorigin='anonymous'></script>
  </body>
</html>
  `, () => {
    console.log("Generated index.html in: {SRC-DIR}/dist/index.html");
  });
}

function keepGoing() {
  inquirer.prompt([
    {
      name: "continue",
      message: "add another employee? ",
      type: "list",
      choices: ["Yes!", "No :("]
    }
  ]).then((res) => {
    if (res.continue == "Yes!") {
      showMenu();
    }
    else {
      // We have reached the amount of people in the team
      generateTeamProfile();
    }
  });
}

function showMenu() {
  inquirer.prompt([
  {
    name: "internOrEngineer",
    type: "list",
    choices: ["Intern", "Engineer"],
    message: "Please add either an engineer or an intern"
  }
  ]).then((res) => {
    if(res.internOrEngineer == "Intern") {
      // Add intern and return to menu
      addIntern();
    }
    else {
      // Add engineer and return to menus
      addEngineer();
    }
  });
}

function addEngineer() {
  inquirer.prompt([
    {
      name: "engineerName",
      type: "text",
      message: "Enter the name of the engineer"
    },
    {
      name: "engineerId",
      type: "text",
      message: "Enter the id of the engineer"
    },
    {
      name: "engineerEmail",
      type: "text",
      message: "Enter the email of the engineer"
    },
    {
      name: "engineerGithub",
      type: "text",
      message: "Enter the github username of the engineer"
    },
  ]).then((res) => {
    const engineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.engineerGithub);

    team.addEmployees(engineer);

    keepGoing();
  });
}

function addIntern() {
  inquirer.prompt([
    {
      name: "internName",
      type: "text",
      message: "Enter the name of the intern"
    },
    {
      name: "internId",
      type: "text",
      message: "Enter the id of the intern"
    },
    {
      name: "internEmail",
      type: "text",
      message: "Enter the email of the intern"
    },
    {
      name: "internSchool",
      type: "text",
      message: "Enter the school of the intern"
    },
  ]).then((res) => {
    const intern = new Intern(res.internName, res.internId, res.internEmail, res.internSchool);

    team.addEmployees(intern);

    keepGoing();
  });
}

// Begin inquirer prompt to get info from the user.
function setupTeam() {
  inquirer.prompt([
  {
    name: "teamManagerName",
    type: "text",
    message: "Enter team manager's name"
  },
  {
    name: "teamManagerId",
    type: "text",
    message: "Enter team manager's employee id"
  },
  {
    name: "teamManagerEmail",
    type: "text",
    message: "Enter team manager's email"
  },
  {
    name: "teamManagerOfficeNumber",
    type: "text",
    message: "Enter team manager's office number"
  }
  ]).then((res) => {
    if(team == null)
      team = new Team(new Manager(res.teamManagerName, res.teamManagerId, res.teamManagerEmail, res.teamManagerOfficeNumber));

    showMenu()
  });
}

// Call the first function (setupTeam())
setupTeam();