const fs = require('fs');
const path = require('path');

function treeFn(dirPath) {
    // let destPath;
    if (dirPath == undefined) {
        dirPath = process.cwd();
        treeHelper(dirPath);
        return;
    }
    else {
        console.log(dirPath);
        let does_exsits = fs.existsSync(dirPath);
        if (does_exsits) {
            treeHelper(dirPath);
        }
        else {
            console.log("please give valid path");
            return;
        }    
    }
}

function treeHelper(dirPath) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if( true==isFile ) {
        let fileName = path.basename(dirPath);
        console.log(fileName);
    }
    else
    {
        // console.log(dirPath+'=====>');
        // console.log(path.dirname(dirPath).split(path.sep) + '======>')
        // parentDir = path.dirname(dirPath).split(path.sep).pop();
        // console.log(parentDir + '============>');
        let childName = fs.readdirSync(dirPath);
        for( let i=0 ; i<childName.length ; i++)
        {
            child_path = path.join(dirPath,childName[i]);
            treeHelper(child_path);
        }
    }
}

module.exports={
    treeKey : treeFn
}