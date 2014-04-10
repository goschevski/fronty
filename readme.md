#Fronty

Fronty is a boilerplate for starting new front-end projects.

## Sass

#### Installation

It's using compass framework and compass-normalize plugin for styling. So after you install ruby install sass, compass and compass-normalize plugin.

```
$ sudo gem install sass --pre
$ sudo gem install compass --pre
$ sudo gem install compass-normalize
```

#### Getting started

After you installed all dependencies, cd into project directory and type `compass watch` to watch project files.

## Javascript

#### Installation

Install volo (`npm install -g volo`) and run `volo add` to install vendor libs.

#### Code structure

Javascript folder is inside assets and code structure for js files is pretty strate forward, so i won't explain it like i did for sass.

## Hooks

#### Installation

To install pre-commit hooks (jshint, php -l) make sure you have jshint installed (`node install -g jshint`). Run the following commands.

```
chmod +x hooks.sh
./hooks.sh
```

## Build

Build will run r.js and remove unnecessary files.

```
chmod +x build.sh
./build.sh
```