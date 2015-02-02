var chokidar = require('chokidar');

function FileWatcher(fileDirOrGlob, cb) {
    var watcher = chokidar.watch(fileDirOrGlob, {
        ignored: /[\/\\]\./, persistent: true
    });

    watcher.on('ready', function() {
        watcher.on('all', function(event, path) {
            cb(event, path);
        });
    });
}

module.exports = FileWatcher;
