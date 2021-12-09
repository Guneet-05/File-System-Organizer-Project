//********************************************* File System Organizer ********************************************/

//A directory can contain various files and other directories.
//The files inside this directory can be of different types (extensions)
//So, if we need to organize the files as per their extensions, doing this manually can be really tiring 
//So, the File System Organizer can help us organize the files of a directory according to their extensions
//This project depicts the hands on practice of some of the in-built node modules and their application on a real-life problem.

//There are 3 commands: 1. help, 2. tree, 3. organize
//help: gives the list of all commands and helps the user interact with the project through command line
//tree: displays a tree view (hierarchical view) of a directory
//organize: will organize the files inside the directory according to their extensions

const fs = require('fs')
const path = require('path')
const treeObj = require('./Commands/tree')
const helpObj = require('./Commands/help')
const organizeObj = require('./Commands/organize')
const organize = require('./Commands/organize')
let inquirer = require('inquirer')

let inputArr = process.argv.slice(2) 
//inputArr[0] = command
//inputArr[1] (if exists) = path of the directory

let command = inputArr[0]

switch(command) {

    case 'help':
        helpObj.help()
        break
    
    case 'tree':
        treeObj.tree(inputArr[1])
        break
    
    case 'organize':
        // organizeObj.organize(inputArr[1])
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'Selection',
                choices: ['Organize only the Main Directory', 'Organize with all the sub-directories as well'],
            }
        ])
        .then((choices) => {
            if (choices.Selection === 'Organize only the Main Directory') {
                organizeObj.organize(inputArr[1])

            } else if (choices.Selection === 'Organize with all the sub-directories as well') {
                organizeObj.organizeWithSub(inputArr[1])
            } 
        })
        break

    default:
        break
}


