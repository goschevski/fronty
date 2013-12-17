#Boilerplate

This is my boilerplate for starting new projects.

## Sass

#### Installation

I'm are using compass framework and compass-normalize plugin for styling. So after you install ruby install sass, compass and compass-normalize plugin.

```
$ sudo gem install sass --pre
$ sudo gem install compass --pre
$ sudo gem install compass-normalize
```

#### Getting started

After you installed all dependencies, cd into project directory and type `compass watch` to watch project files.

#### Code structure

- Base
	- **_base.scss** - *Base styles for all elements*
	- **_chrome-frame.scss** - *Chrome frame selector*
	- **_input-placeholder.scss** - *Input placeholder animation*
	- **_typography.scss** - *Font-face loading and font-family placeholders*
- Config
	- **_colors.scss** - *Color and gradient variables*
	- **_dimensions.scss** - *Dimension and number variables*
	- **_sprites.scss** - *Sprite maps*
	- **_vertical-rhythm.scss** - *Vertical rhythm settings*
- Helpers
	- **_functions.scss** - *Custom functions*
	- **_placeholder-selectors.scss** - *Placeholder selectors*
- Layout
	- **_buttons.scss** - *File for global button styles*
	- **_forms.scss** - *File for global form styles*
	- **_grid.scss** - *Grid generator (mixins, placeholders)*
	- **_lists.scss** - *File for global list styles*
	- **_media.scss** - *File for media object*
- Lib - *Folder for css libraries*

- Mixins
	- **_breakpoint.scss** - *Mixin for media queries*
	- **_circle.scss** - *Mixin for drawing circle*
	- **_fixed-button.scss** - *Mixin for button with fixed dimension (oh that clients)*
	- **_icon.scss** - *Mixin for inline or absolute icon inside button ussualy*
	- **_inline-list.scss** - *Mixin for creating inline list (float)*
	- **_input-placeholder.scss** - *Mixin for styling input placeholders*
	- **_list-divided.scss** - *Mixin for creating list with dividers*
	- **_rem.scss** - *Mixin for rem with px backup*
	- **_retina-sprite.scss** - *Mixin for generating retina sprite*
	- **_vertical-center-content.scss** - *Mixin for vertically centered content*
- Modules
	- **container/_container.scss** - *Container module*
	- **helpers/_helpers.scss** - *Helper classes*
- **style.css** - *Main css file*


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