const fs = require('fs')
const path = require('path')

let types = {
    media     :  ['mp4','mkv','mp3'],
    archives  :  ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents :  ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex','text'],
    app       :  ['exe','dmg','pkg','deb'],
    images    :  ['psd','xcf','ai','cdr','tif','tiff','bmp','jpg','jpeg','gif','png','eps','raw','cr2','nef','orf','sr2']
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

module.exports = {
    organize: organize
}