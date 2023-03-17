const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];
let userChoice = "";

/* TODO: Write Code to gather information about the development team members, and render the HTML file.*/
//Use prompt to ask a questions using the inquirer to determine team makeup. The user  will answer a set of questions in command-line and provide the information needed to create objects  of type Manager, Engineer, & Intern.

//Before creating the team. create a function to validate the input type
//functions to validate each input type
function validName(name) {
  if (name.length <= 30 && name.length > 0) {
    return true;
  }
  return chalk.red("Please insert a name of 1 to 30 characters!");
}

function validNumber(num) {
  if (/^[0-9]+$/.test(num)) {
    return true;
  }
  return chalk.red("Please enter a numeric value!");
}

function validEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return chalk.red("Please enter a valid email address!");
}

function validGithub(github) {
  if (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(github)) {
    return true;
  }
  return chalk.red("Please enter a valid GitHub username!");
}

//function startApp() {
/*function to handle generating manager object - first because we need a team manager*/
const createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message:
          "Enter team manager’s name: " + chalk.green("(1-30 characters)"),
        validate: validName,
      },
      {
        type: "input",
        name: "id",
        message:
          "Enter the team manager’s employee ID: " + chalk.italic("(numbers only)"),
        validate: validNumber,

      },
      {
        type: "input",
        name: "email",
        message: "Please enter the team manager’s email address: ",
        validate: validEmail,
      },
      {
        type: "input",
        name: "officeNumber",
        message:
          "Pease enter the team manager’s office number:" + chalk.green("numbers only)"),
        validate: validNumber,   
      },
    ])

    .then(response => {
      const manager = new Manager(
        capsWords(response.managerName),
        response.id,
        response.email,
        response.officeNumber
      );

      team.push(manager);
      menuInput();
      console.log(team);
      console.log(response);
    })

};


// function to handle generating engineer object
const createEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message:
          "Enter the engineer’s name: " + chalk.italic("(1-30 characters)"),
        validate: validName,
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer’s ID: " + chalk.italic("(numbers only)"),
        validate: validNumber,
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer’s email address: ",
        validate: validEmail,
      },
      {
        type: "input",
        name: "github",
        message: "Enter the enginner’s GitHub username: ",
        validate: validGithub,
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        capsWords(response.engineerName),
        response.id,
        response.email,
        response.github
      );
      //   console.log(engineer);
      team.push(engineer);
      //   console.log(team);
      menuInput();
    });
};
// push to team array
// function to handle generating Intern object 
const createIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "InternName",
        message:
          "Enter the intern’s name: " + chalk.italic("(1-30 characters)"),
        validate: validName,
      },
      {
        type: "input",
        name: "id",
        message: "Enter the ntern’s ID: " + chalk.italic("(numbers only)"),
        validate: validNumber,
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern’s email address: ",
        validate: validEmail,
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern’s school: ",
        validate: validName,
      },
    ])
    .then((response) => {
      const intern = new Intern(
        capsWords(response.InternName),
        response.id,
        response.email,
        response.school
      );
      //   console.log(intern);
      team.push(intern);
      //   console.log(team);
      menuInput();
    });
};


// call the next function that will ask user what type of employee they want to create next


//function to add user's options from the menu
// choices(engineer, intern, I dont want to add anyone else)
// conditional to decide which of the below functions to call, based on userChoice
function menuSelection() {
  switch (userChoice) {
    case "Add engineer":
      createEngineer();
      break;

    case "Add intern":
      createIntern();
      break;

    // If none of the choices (engineer or employee) have been chosen, default to buildTeam()
    case "No more team members required":
      console.log(chalk.black.bgGreenBright("Team complete"));
      generateHTMLFile();
  }
}

//get user's input from menu options
const menuInput = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: chalk.green(
          "\n==============\n     MENU     \n==============\nSelect team member type:"
        ),
        choices: [
          {
            name: "Add engineer",
          },
          {
            name: "Add intern",
          },
          {
            name: "Completed the team",
          },
        ],
      },
    ])
    .then((response) => {
      userChoice = response.employeeType;
      console.log(userChoice);
      menuSelection();
    });
};

//Call render() and pass in the team array
//Output-directory and outputPath have already been setup so we can use fs.writeFile() to create the html file when needed. 
//generate HTML file
const generateHTMLFile = () => {
  const content = render(team);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // function to build the team - use fs.writeFileSync & pass in the outputPath created above, call to render
  fs.writeFileSync(outputPath, content, (err) => {
    if (err) {
      console.log(chalk.bold.red("Failed to generate HTML file!", err));
    }
    console.log(chalk.bold.green("New HTML file successfully generated!"));
  });
};


//Set first letter of each typed word to capital letter
function capsWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// starts the whole chain of events.
createManager();


//startApp();