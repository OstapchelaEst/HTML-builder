const fs = require('fs');
const path = require('path');

function foundFiles(way) {

   fs.readdir(way, (err, files) => {
      files.forEach((e) => {
         if (e != 'project-dist') {
            fs.stat((way + '\\' + e), (err, stats) => {
               if (!err) {
                  if (!stats.isDirectory() && path.extname(e) == '.css') {
                     copyFiles((way + '\\' + e))
                  }
               }
            })
         }
      })
   })
}
function removeInner() {
   fs.truncate('05-merge-styles/project-dist/bundle.css', (err) => {
      if (err) throw err;
   })
}
function copyFiles(src) {
   removeInner();
   fs.readFile(
      path.join(src),
      'utf-8',
      (err, inner) => {
         if (err) throw err;
         fs.appendFile(
            path.join('05-merge-styles/project-dist', 'bundle.css'),
            inner,
            (err) => {
               if (err) throw err;
            }
         )
      }
   )
}

fs.access('05-merge-styles/project-dist/bundle.css', (err) => {
   if (err) {
      fs.writeFile(
         path.join('05-merge-styles/project-dist', 'bundle.css'),
         '',
         (err) => {
            if (err) throw err;
         }
      )
   }
   foundFiles('05-merge-styles/styles');
})



