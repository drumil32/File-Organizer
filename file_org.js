#!/usr/bin/env nodejs
const { dir } = require('console');
const fs = require('fs');
const path = require('path');
const helpObj = require('./commond/help');
const orgObj = require('./commond/organize');
const treeObj = require('./commond/tree');
let commond = process.argv.slice(2);


switch (commond[0]) {
    case 'tree':
        treeObj.treeKey(commond[1])
        break;
    case 'organise':
        orgObj.organizeKey(commond[1])
        break;
    case 'help':
        helpObj.helpKey();
        break;        
    default:
        if( commond[0] == undefined)
            console.log("please give the commond");
        else
            console.log("please give right commond");
}


