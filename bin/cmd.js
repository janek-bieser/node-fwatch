#!/usr/bin/env node

/*
 * This is a command line interface to the fielwatch library.
 *
 * Usage:
 * fwatch PATTERN COMMAND
 */

var argv = require('argv');
var watch = require('../lib/filewatch');
var spawn = require('child_process').spawn;

var usageInfo = 'Usage: fwatch Pattern Command\n\n' +
    '\tPattern: A file, directory or glob.\n' +
    '\tCommand: The command to be executed on file change events.';

argv.info(usageInfo);

var args = argv.run();

if (args.targets.length < 2) {
    var errMsg = 'Not enough arguments. Expecting 2, but to ' +
        args.targets.length + '. See "fwatch -h".';
    console.log(errMsg);
    process.exit(1);
}

var filesToWatch = args.targets[0];
var commandString = args.targets[1];

var commandElements = commandString.split(' ');
var command = commandElements[0];
var commandArgs = commandElements.slice(1);

console.log(command);
console.log(commandArgs);

console.log('watching files...');

watch(filesToWatch, function(event, path) {
    console.log(event, path);
    var cmd = spawn('ls', commandArgs);
    cmd.stdout.pipe(process.stdout);
});
