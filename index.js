import chalk from 'chalk';

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


/* TODO: Write Code to gather information about the development team members, and render the HTML file.*/
//Use prompt to ask a questions using the inquirer to determine team makeup. The user  will answer a set of questions in command-line and provide the information needed to create objects  of type Manager, Engineer, & Intern.

/*function to create the manager object*/
const addManager = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message:
          "Enter team manager’s name: " + chalk.green("(1-30 characters)"),
        validate: validateName,
      },
      {
        name: "id",
        type: "input",
        message:
          "Enter the team manager’s employee ID: " +
           italic("(numbers only)"),
        validate: validateNumber,
      },
      {
        name: "email",
        type: "input",
        message: "Please enter the team manager’s email address: ",
        validate: validateEmail,
      },
      {
        type: "input",
        name: "officeNumber",
        message:
          "Pease enter the team manager’s office number:" +
          chalk.green("(numbers only)"),
        validate: validateNumber,
      },
    ])
    .then((response) => {
      console.log(response);

      const manager = new Manager(
        capitalizeWords(response.name),
        response.id,
        response.email,
        response.officeNumber
      );
      team.push(manager);
      console.log(team);

      MenuInput();
    });
};

//Cal render() and pass in the team array
//Output-directory and outputPath have already been setup so we can use fs.writeFile() to create the html file when needed. 


 
 
 fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

          ex of structure below:    
*/

function start () {

    // function to handle generating manager - first bc we need a manager
    function createManager() {
        inquirer.prompt([
            {
              type: "input",
              name: "managerName",
              message: "What is the team manager's name?",
              validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              }
            },
            /* {ask for id},
              {ask for email},
              {ask for office number}
             */
          ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            // push to team array
            // call the next function that will ask what type of employee will be created next
            createTeam();
          })
    }

    // function that asks what type of employee they would like to create next
    function createTeam(){
        // similar setup to what we have listed above
        inquirer.prompt([
            // question asking what we should make next
                // choices(engineer, intern, I dont want to add anything else)
        ]).then(userChoice => {
           // conditional to decide which of the below functions to call, based on userChoice

          // If none of the choices (engineer or employee) have been chosen default to buildTeam()
               
            
        })
    }

    // function to handle generating engineer object

    // function to handle generating intern object

    // function to buildTeam - use fs.writeFileSync & pass in the outputPath created above, call to render

    
 // starts the whole chain of events.
    createManager();  
}

start();