#! /bin/bash

r.js -o assets/js/build.js
release_dir=www-release

for file in .git .gitignore config.rb hooks.sh package.json readme.md sass .sass-cache assets/js/views assets/js/models assets/js/collections assets/js/tests assets/js/routers assets/js/templates assets/js/build.js assets/js/karma.conf.js build.txt build.sh
do
    echo "Deleting $file."
    rm -rf $release_dir/$file
done

echo "Deleted dev files."