const fs = require('fs')
const path = require('path')

function tree(dirpath) {
    if(dirpath == undefined) {
        console.log('Enter a valid directory path')
        return
    }
 
    let doesExist = fs.existsSync(dirpath)
    
    if(doesExist == false) {
        console.log('The given path does not exist. Please enter a valid path')
        return
    }
 
    treeHelper(dirpath," ")
 }
 
 function treeHelper(dirpath, indent) {
    
     let isFile = fs.lstatSync(dirpath).isFile()
 
     if(isFile) {
         let fileName = path.basename(dirpath)
         console.log(indent + "├──" + fileName)
     } else {
 
         let dirName = path.basename(dirpath)
         console.log(indent + "└─" + dirName)
 
         let children = fs.readdirSync(dirpath)
 
         for(let i=0;i<children.length;i++) {
             
             let childPath = path.join(dirpath,children[i])
             treeHelper(childPath,indent + "\t")
         }
     }
 }
 
 module.exports = {
     tree: tree
 }