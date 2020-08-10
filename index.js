

const chokidar = require('chokidar');
const loc = require('path')
const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');
const location = loc.join(__dirname + '../../bigbluebutton/recording/raw')
console.log(location)
// Initialize watcher.
const watcher = chokidar.watch(location, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,

});
const client = require('scp2')


// Something to use when events are received.
const log = console.log.bind(console);
// Add event listeners.
let address
let finaladdress
let counter = 0 
let finalstr
watcher
  .on('add', path => {
    str = path.split("/"); 
    finalstr= str[str.length - 1]; 
    // console.log('finalstring**********************', finalstr)
    if(finalstr === 'events.xml'){
        log('im the match', finalstr)
        log('im the match', finaladdress)
        log(`File ${path} has been added`);
        var parts = path.split('/');
        console.log('/' + parts[5]);
        // log(path.substr(0, path.lastIndexOf("/",path.lastIndexOf("/")-1)));
        if(finaladdress){
            client.scp(path, {
                host: '174.138.46.250',
                username: 'root',
                password: 'lilfoot',
                path: `/usr/src/bbb-events/${parts[5]}.xml`
            }, function(err) {
                if(err){
                    log(err)
                }
    
            })

        }
     

        // function uploadImage(imageBuffer) {
        //     const form = new FormData();
        //     const newURL = ('/upload', '174.138.46.250')
        //     form.append('file', fs.createReadStream(imageBuffer));
        //     console.log('*****FORM*******', form)
        //     return fetch(newURL, { method: 'POST', body: form })
        //   };

        //   uploadImage(path)
        //Lets read the file 
    }
  })
//   .on('change', path => log(`File ${path} has been changed`))
//   .on('unlink', path => log(`File ${path} has been removed`));
 
// More possible events.
watcher
  .on('addDir', path => {
    // log(`Directory ${path} has been added`)
    // str = path.split("/"); 
    // finalstr= str[str.length - 1]; 
    // console.log('finalstring**********************', finalstr)
    //Get first addition to dir
    if(counter == 1){
        log('first', address)
        //If first let;s
        finaladdress = path
    }

    // if (finalstr == 'events.xml')
  }
  )
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    // log('Raw event info:', path,  details);
    address = path
    counter ++
  });
 