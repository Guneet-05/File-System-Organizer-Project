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

let inputArr = process.argv.slice(2) 
//inputArr[0] = command
//inputArr[1] (if exists) = path of the directory

let command = inputArr[0]

let types = {
    media     :  ['mp4','mkv','mp3'],
    archives  :  ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents :  ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex','text'],
    app       :  ['exe','dmg','pkg','deb'],
    images    :  ['psd','xcf','ai','cdr','tif','tiff','bmp','jpg','jpeg','gif','png','eps','raw','cr2','nef','orf','sr2']
}


switch(command) {

    case 'help':
        help()
        break
    
    case 'tree':
        tree()
        break
    
    case 'organize':
        organize(inputArr[1])
        break

    default:
        break
}

function organize(dirpath) {
    
    if(dirpath == undefined) {
        console.log('Please enter a directory path')
        return;
    }

    let pathExists = fs.existsSync(dirpath)

    if(pathExists == false) {
        console.log('Please enter a valid path')
        return;
    }

    //create the organized files directory
    let destPath = path.join(dirpath,'organized_files')

    if(fs.existsSync(destPath) == false) { //create this organized files directory only if it does not exist previously
        fs.mkdirSync(destPath)
    } else {
        console.log('Organized Files Directory already exists')
    }
    
    organizeHelper(dirpath,destPath)
}

function organizeHelper(src,dest) {
    
    let children = fs.readdirSync(src) //Array of all the files and folders inside the source directory

    for(let i=0;i<children.length;i++) {

        let childPath = path.join(src,children[i]) 
        let isFile = fs.lstatSync(childPath).isFile()

        if(isFile) {
            let fileCategory = getCategory(children[i])
            console.log(children[i] + ' belongs to ' + fileCategory)
            sendFiles(childPath,dest,fileCategory)
        }  

    }
}

function getCategory(name) {
   let ext = path.extname(name)
   ext = ext.slice(1)

   for(let type in types) {
       let categoryTypeArr = types[type]

       for(let i=0;i<categoryTypeArr.length;i++) {
          if(ext == categoryTypeArr[i]) {
              return type;
          } 
       }
   }

   return 'others'
}

function sendFiles(srcFilePath,dest,fileCategory) {
   let catPath = path.join(dest,fileCategory)

   if(fs.existsSync(catPath) == false) {
       fs.mkdirSync(catPath)
   }

   let fileName = path.basename(srcFilePath)
   let destPath = path.join(catPath,fileName)
   fs.copyFileSync(srcFilePath,destPath)

   fs.unlinkSync(srcFilePath)
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