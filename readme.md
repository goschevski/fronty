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

#### Code structure

**Core**

- _variables.scss
- _funcitions.scss
- _placeholder-selectors.scss


**Lib**

- *Folder for css libraries*

**Mixins**

- _breakpoint.scss
- _rem.scss
- _retina-sprite.scss
- _icon.scss
- _inline-list.scss
- _divided-list.scss
- _grid.scss
- _media.scss
- _vertical-center-content.scss
- _input-placeholder.scss
- _ie.scss


**Modules**

- /base
	- _typography.scss
	- _base.scss
	- _helpers.scss
- /container
	- _container.scss

###### style.css


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