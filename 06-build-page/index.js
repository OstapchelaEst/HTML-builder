const fs = require('fs');
const path = require('path');


const templateSrc = path.resolve(__dirname, 'template.html');
const componentsSrc = path.resolve(__dirname, 'components');
const stylesSrc = path.resolve(__dirname, 'styles');
const assetsSrc = path.resolve(__dirname, 'assets')

async function createDir(src) {
   await fs.promises.rm(src, { recursive: true, force: true });
   await fs.promises.mkdir(src);
}

async function readTemplate(src) {
   fs.readFile(
      path.join(src),
      'utf-8'
      , (err, dataBaseTemplate) => {
         if (err) throw err;

         fs.readdir(componentsSrc, (err, files) => {
            if (err) throw err;
            files.forEach((e, i) => {
               files[i] = path.basename(path.resolve(__dirname, e), path.extname(path.resolve(__dirname, e)))
               fs.readFile(path.join(path.resolve(__dirname, 'components', e)),
                  'utf-8',
                  (err, dataTemplate) => {
                     if (err) throw err;
                     let crork = `{{${files[i]}}}`;
                     dataBaseTemplate = dataBaseTemplate.replaceAll(crork, dataTemplate)
                     const streamHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))
                     streamHtml.write(dataBaseTemplate)
                  })

            })
         })
      }
   )
}

async function createStyle(src) {
   fs.writeFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      '',
      (err) => {
         if (err) throw err;
      }
   );
   fs.readdir(src, (err, data) => {
      if (err) throw err;
      data.forEach(e => {
         fs.stat(path.join(src + '/' + e), (err, stats) => {
            if (stats.isFile && path.extname(e) == '.css') {

               fs.readFile(path.join(src, e),
                  'utf-8',
                  (err, text) => {
                     if (err) throw err;
                     fs.appendFile(
                        path.join(__dirname, 'project-dist', 'style.css'),
                        text,
                        (err) => {
                           if (err) throw err;
                        }
                     );
                  })
            }
         })
      })
   })
}

async function createAssetsDir() {
   fs.mkdir(
      path.join('06-build-page/project-dist', 'assets'),
      (err) => {
         if (err) throw err;
      })
}

async function createAssets(src = '06-build-page/assets', element = '') {
   if (element != '') src = src + '/' + element;
   fs.readdir(src, (err, files) => {
      files.forEach((e) => {
         fs.stat(src + '/' + e, (err, stats) => {
            if (!err) {
               if (!stats.isDirectory()) {
                  copyAssetsFiles((src + '/' + e), getNewSrc(src + '/' + e))
               }
               if (stats.isDirectory()) {
                  createAssetsDerictory(src, e);
                  createAssets(src, e);
               }
            }
         })
      })
   })

}


function getNewSrc(oldSrc) {
   oldSrc = oldSrc.split('/');
   oldSrc[oldSrc.indexOf('assets')] = 'project-dist/assets';
   return oldSrc.join('/')
}

function copyAssetsFiles(src, newSrc) {
   fs.copyFile(src, newSrc, (err) => {
   })
}

function createAssetsDerictory(src, name) {
   src = src.split('/');
   src[src.indexOf('assets')] = 'project-dist/assets';
   src = src.join('/')
   fs.mkdir(
      path.join(src, name), (err) => {
      }
   )
}
async function help() {
   await createDir(path.join(__dirname, 'project-dist'));
   await readTemplate(templateSrc);
   await createStyle(stylesSrc);
   await createAssetsDir();
   await createAssets()
}

help()


