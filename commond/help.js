const fs = require('fs');
const path = require('path');

function helpFn() {
    console.log(`you can give this three commond :
    1st. node 1st.js tree "directoryPath"
    2nd. node 1st.js organise "directoryPath"
    3rd. ndoe 1st.js help`);
}

module.exports={
    helpKey : helpFn
}