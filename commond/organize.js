const fs = require('fs');
const path = require('path');

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb", "class"],
    code_file: ["java", "c", "cpp", "c++"]
}

function organiseFn(dirPath) {
    // console.log("you are in organise function " + dirpath);
    // 1.input -> directory path given
    let destPath;
    if (dirPath == undefined) {
        dirPath = process.cwd();
    }
    let does_exsits = fs.existsSync(dirPath);
    if (does_exsits) {
        // 2.create -> organised_files -> directory
        destPath = path.join(dirPath, "organized_files");
        if (false == fs.existsSync(destPath))
            fs.mkdirSync(destPath);
    }
    else {
        console.log("please give valid path");
        return;
    }    
    organise_helper(dirPath, destPath);
    // 3.identify catagories of all files in that input directory
    // 4.copy / cut files to that organised directory
}

function organise_helper(srcPath, destPath) {
    let childNames = fs.readdirSync(srcPath);

    for (let i = 0; i < childNames.length; i++) {
        let child_path = path.join(srcPath, childNames[i]);
        let isFile = fs.lstatSync(child_path).isFile();
        if (isFile) {
            let catagory = getcatagory(childNames[i]);

            sendFiles(child_path, destPath, catagory);
        }
        else
        {
            organise_helper(child_path, destPath);
        }
    }
}

function sendFiles(child_path, destPath, catagory) {
    let catagory_path = path.join(destPath, catagory);
    let is_exsist = fs.existsSync(catagory_path);
    if (false == is_exsist)
        fs.mkdirSync(catagory_path);
    let childName = path.basename(child_path);
    
    let destChildPath = path.join(catagory_path, childName);
    fs.copyFileSync(child_path, destChildPath);//how copy function is working ??[it will take create one file of same name then copy whole contain]
    // fs.unlinkSync(child_path);//it will delete actul file
}

function getcatagory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);

    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i])
                return type;
        }
    }
    return "other";
}

module.exports={
    organizeKey : organiseFn
}