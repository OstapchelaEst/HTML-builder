const fs = require('fs');
const path = require('path');
fs.access('04-copy-directory/files-copy', (err) => {
   if (err) {
      fs.mkdir(
         path.join(__dirname, 'files-copy'), (err) => {
            if (err) throw err;
         }
      )
   }
})

fs.readdir("04-copy-directory/files", (err, filesParent) => {
   if (err) throw err;

   filesParent.forEach(e => {
      fs.copyFile(`04-copy-directory/files/${e}`, `04-copy-directory/files-copy/${e}`, (err) => {
         if (err) throw err;

      })
   })
   fs.readdir('04-copy-directory/files-copy', (err, filesCopy) => {
      if (err) throw err;
      getActualFiles(filesParent, filesCopy)
   })

})

function getActualFiles(files, copyFiles) {
   copyFiles.forEach(e => {
      if (files.indexOf(e) == -1) {
         fs.unlink(`04-copy-directory/files-copy/${e}`, err => {
            if (err) throw err;
         })
      }
   })
}