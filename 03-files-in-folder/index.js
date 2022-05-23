const fs = require('fs');
const path = require('path');
function showDatas(data = '03-files-in-folder/secret-folder') {
   fs.readdir(data, (err, files) => {
      if (err) throw err;
      files.forEach((elem) => {
         fs.stat(`${data}/${elem}`, (err, stats) => {
            if (err) throw err
            if (!stats.isDirectory()) {
               console.log(`${elem.replace(/\..*/, '')} - ${elem.split('.').pop()} - ${stats.size / 1000}kb`);
            }
         });
      })
   })
}

showDatas()

