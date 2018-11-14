/*=====================================================
THIS FUNCTION WILL
1. RUN PHANTOMJS IN A CHILD PROCESS
    - OPEN CELTICS.COM
    - GET DRUPAL.SETTINGS OBJECT

2. GET CURRENT ROSTER. IF A PLAYER IS NO LONGER ON ROSTER,
   REMOVE THEM FROM THE PHOTO OBJECT.

3. GET PHOTO GALLERY NODE IDS VIA CONTENT API

4. IF THERE IS A GALLERY THAT HAS NOT BEEN REQUESTED PREVIOUSLY,
   REQUEST THAT NODE & LOOP THROUGH THE PHOTOS. IF A CURRENT
   PLAYER IS IN THE CAPTION OF PHOTO, ADD TO PHOTO OBJECT.

======================================================*/

const fetch = require('node-fetch');
const request = require('sync-request');

let offset = 0;
const rosterObj = [];
const Storage = require('node-storage');
const fs = require('fs');
const { exec } = require('child_process');

exec('echo "yooo"', (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
});
const store = new Storage('/Users/kyle/Dropbox/CODE/node/storage/photo-gallery-data.json');
const photoObj = store.get('photoObj');
const galleries = store.get('galleries');
const cutoffYear = 2015; //(OPTIONAL) CHECK GALLERIES CREATED AFTER THIS YEAR (WONT NEED THIS LATER)
function printProgress(text, progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`\x1b[0m${text}${progress}`);
}
function seasonYear() {
  //const date = new Date();
  //const month = date.getMonth();
  //let year = date.getFullYear();
  //if (month < 9) {
  //year -= 1;
  //}
  //const roster = request(
  //"GET",
  //"http://data.nba.com/data/v2015/json/mobile_teams/nba/" +
  //year +
  //"/teams/celtics_roster.json"
  //);
  //if (roster.statusCode !== "200") {
  //year -= 1;
  //}
  return 2017;
}
console.log('\nGETTING PHOTOS...\n');
const rosterRequest = request('GET', `http://data.nba.com/data/v2015/json/mobile_teams/nba/${seasonYear()}/teams/celtics_roster.json`);
const rosterData = JSON.parse(rosterRequest.getBody().toString());
if (rosterRequest.statusCode !== 200) {
  console.log(`${rosterRequest.statusCode} error on gallery list.)`);
}
const player = rosterData.t.pl;
let more = true;
const newPhotos = {};
for (let i = 0; i < player.length; i++) {
  rosterObj[i] = {
    fn: player[i].fn,
    ln: player[i].ln,
    pid: player[i].pid,
  };
  if (!photoObj.hasOwnProperty(player[i].pid)) {
    photoObj[player[i].pid] = [];
    newPhotos[player[i].pid] = [];
  }
}
while (more) {
  const galleryRequest = request('GET', `http://www.nba.com/celtics/api/1.1/json/?type=photo_gallery&size=50&offset=${offset}`);
  const galleriesData = JSON.parse(galleryRequest.getBody().toString());
  if (galleryRequest.statusCode !== 200) {
    console.log(`${galleryRequest.statusCode} error on gallery list. (offset=${offset})`);
    break;
  }
  for (let i = 0; i < galleriesData.content.length; i++) {
    printProgress('GALLERIES CALLED: ', offset + 1);
    const nodeRequest = request('GET', `http://www.nba.com/celtics/api/1.1/json/?nid=${galleriesData.content[i].nid}`);
    if (galleries.indexOf(galleriesData.content[i].nid) > -1) {
      more = false;
      console.log('\x1b[31m', '\nNo more new galleries.');
      break;
    }
    galleries.push(galleriesData.content[i].nid);
    if (nodeRequest.statusCode !== 200) {
      console.log(`${nodeRequest.statusCode} error on node.`);
      continue;
    }
    const nodeData = JSON.parse(nodeRequest.getBody().toString());
    for (let p = 0; p < nodeData.content[0].images.length; p++) {
      for (let r = 0; r < rosterObj.length; r++) {
        if (nodeData.content[0].images[p].caption.indexOf(`${rosterObj[r].fn} ${rosterObj[r].ln}`) >= 0) {
          newPhotos[rosterObj[r].pid].push(nodeData.content[0].images[p]);
          newPhotos[rosterObj[r].pid][newPhotos[rosterObj[r].pid].length - 1].date = nodeData.content[0].formatted.created;
        }
      }
    }
    if (Number(nodeData.content[0].formatted.created.substr(0, 4)) < cutoffYear) {
      console.log('\x1b[31m', '\nHit cutoffYear.');
      more = false;
      break;
    }
    offset++;
  }
  if (galleriesData.next !== undefined && more === true) {
    console.log('\x1b[32m', `\nThere's more: ${galleriesData.next}`);
  } else {
    for (let r = 0; r < rosterObj.length; r++) {
      for (let n = 0; n < newPhotos[rosterObj[r].pid].length; n++) {
        newPhotos[newPhotosObj[r].pid].reverse();
        photoObj[rosterObj[r].pid].unshift(newPhotos[rosterObj[r].pid][n]);
      }
    }
    console.log('\x1b[31m', '\nWriting file...\n');
    const pids = Object.keys(photoObj);
    for (let i = 0; i < Object.keys(photoObj).length; i++) {
      console.log('\x1b[37m', `${pids[i]}: ${photoObj[pids[i]].length}`);
    }
    const output = JSON.stringify(photoObj);
    fs.writeFile('/Users/kyle/Dropbox/CELTICS/data/photo-data.json', output, err => {
      console.log('\x1b[32m', '\nphotoData.json was saved!');
    });
    store.put('galleries', galleries);
    store.put('photoObj', photoObj);
    more = false;
  }
}

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const i18n = require("./i18n");
const commands = require("./commands");
const start_1 = require("./messages/start");
const change_detection_1 = require("./helpers/change-detection");
const versioning_1 = require("./helpers/versioning");
exports.activate = (context) => {
    i18n.initTranslations().then(() => {
        start_1.showStartMessages(versioning_1.checkThemeStatus(context.globalState));
    }).catch(err => console.error(err));
    context.subscriptions.push(...commands.commands);
    change_detection_1.detectConfigChanges().catch(e => {
        console.error(e);
    });
    change_detection_1.watchForConfigChanges();
};
exports.deactivate = () => {
};
//# sourceMappingURL=extension.js.map
