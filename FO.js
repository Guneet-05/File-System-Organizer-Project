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

let inputArr = process.argv.slice(2) 
//inputArr[0] = command
//inputArr[1] (if exists) = path of the directory

let command = inputArr[0]

switch(command) {

    case 'help':
        help()
        break
    
    case 'tree':
        tree()
        break
    
    case 'organize':
        organize()
        break

    default:
        break
}

function organize() {
   console.log('Organize function implemented')
}

function tree() {
   console.log('Tree function implemented')
}

function help() {
   console.log(`File System Organizer Commands:
   1. help     : node FO.js help
   2. tree     : node FO.js tree <dirName>
   3. organize : node FO.js organize <dirName>`)
}