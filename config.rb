# Routs
http_path = "/"
css_dir = "assets/css"
sass_dir = "sass"
images_dir = "assets/img"
javascripts_dir = "assets/js"
fonts_dir = "assets/fonts"

# Sass globbing plugin
require 'sass-globbing'

# Options
output_style = :compressed
relative_assets = true
line_comments = false

# Don't append query strings ('?2011051020102') to assets:
asset_cache_buster :none