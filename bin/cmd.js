#!/usr/bin/env node

//
// This is a command line interface to the fielwatch library.
//
// Usage:
// fwatch Target [Options]
//
// Example:
// fwatch 'src/*.scss' -c 'node-sass src/main.scss dist/main.css'
//
// The example above watches for file changes of some Sass files inside the src
// directory. Everytime a file changes, `node-sass` is executed to recompile the
// Sass files.
//

var argv = require('argv');
var watch = require('../lib/filewatch');
var spawn = require('child_process').spawn;
var colors = require('colors');

var usageInfo = 'Usage: fwatch Target [Options]\n\n' +
    '\tTarget: A file, directory or glob.';

argv.info(usageInfo);

argv.option({
    name: 'command',
    short: 'c',
    type: 'string',
    description: 'Command to be executed on file change (required).',
    example: 'rwatch some/dir -c \'ls -l\''
});

var args = argv.run();

if (args.targets.length < 1) {
    var errMsg = 'Not enough arguments. Expecting 1, but to ' +
        args.targets.length + '. See "fwatch -h".';
    console.log(errMsg);
    process.exit(1);
}

var filesToWatch = args.targets[0];
var commandString = args.options.command;

console.log('start watching "' + filesToWatch + '"');

watch(filesToWatch, commandString, function(cmdInfo) {
    console.log('Changed: ' + cmdInfo.path);

    if (cmdInfo.cmdSuccess) {
        console.log(cmdInfo.info.green);
    } else {
        console.log(cmdInfo.info.red);
    }
});
