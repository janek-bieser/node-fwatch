# node-fwatch

A nodejs file watch utility. It will watch some files and execute a command when
a file changes.

## Install

```sh
npm install node-fwatch
```

## Example

The example below watches for file changes of some Sass files inside the src
directory. Everytime a file changes, `node-sass` is executed to recompile the
Sass files.

```sh
fwatch 'src/*.scss' -c 'node-sass src/main.scss dist/main.css'
```

Run `fwatch -h` for Help.
