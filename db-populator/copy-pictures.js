const fs = require('fs');
const https = require('https');

main();

async function main(){
  const drinksSourceBuffer = fs.readFileSync(__dirname + '/drinks-db.json');
  const drinks = JSON.parse(drinksSourceBuffer.toString());
  const urls = drinks.map(x => x.thumbImageUrl);

  const picturesFolderPath = __dirname + '/pictures'; 
  fs.mkdirSync(picturesFolderPath);
  for(let url of urls){
    const segments = url.split("/");
    const filename = segments[segments.length - 1];
    const path = picturesFolderPath + '/' + filename;
    console.log('downloading', url);
    await download(url, path).catch(console.error);
    console.log('done');
  }
}



async function download(url, pathToSave){
  return new Promise((resolve, rej) => {
    https.get(url, (resonse) => {
      const file = fs.createWriteStream(pathToSave);
      resonse.pipe(file)
      resonse.on('end', (resp) => {
        file.close();
        resolve();
      });
    }).on('error', (e) => {
      rej(e);
    }); 
  })
}