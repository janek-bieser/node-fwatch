var chokidar = require('chokidar');
var spawn = require('child_process').spawn;

function FileWatcher(fileDirOrGlob, commandString, cb) {
    var commandElements = commandString.split(' ');
    var command = commandElements[0];
    var commandArgs = commandElements.slice(1);

    var watcher = chokidar.watch(fileDirOrGlob, {
        ignored: /[\/\\]\./, persistent: true
    });

    watcher.on('ready', function() {
        watcher.on('all', function(event, path) {
            var cmd = spawn(command, commandArgs);
            var printData = "";

            cmd.stdout.on('data', function(data) {
                printData += data;
            });

            cmd.stderr.on('data', function(data) {
                printData += data;
            });

            cmd.on('exit', function(code, signal) {
                var success = (code === 0);
                cb({
                    path: path,
                    info: printData,
                    cmdSuccess: success
                });
            });
        });
    });
}

module.exports = FileWatcher;
