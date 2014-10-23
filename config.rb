# Routs
http_path = "/"
css_dir = "assets/css"
sass_dir = "sass"
images_dir = "assets/img"
javascripts_dir = "assets/js"
fonts_dir = "assets/fonts"

# Plugins and Libraries
require 'compass-normalize'

# Options
output_style = :nested
relative_assets = true
line_comments = false

# Don't append query strings ('?2011051020102') to assets:
asset_cache_buster :none
