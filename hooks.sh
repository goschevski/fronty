js_hint='{
    "bitwise": false,
    "curly": true,
    "eqeqeq": true,
    "forin": true,
    "immed": true,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "noempty": true,
    "nonew": false,
    "plusplus": false,
    "regexp": false,
    "undef": true,
    "strict": false,
    "trailing": true,
    "asi": false,
    "boss": true,
    "debug": true,
    "eqnull": false,
    "esnext": true,
    "evil": false,
    "expr": true,
    "funcscope": false,
    "globalstrict": false,
    "iterator": false,
    "lastsemic": false,
    "laxbreak": false,
    "laxcomma": true,
    "loopfunc": true,
    "multistr":  true,
    "proto": false,
    "regexdash": false,
    "scripturl": false,
    "smarttabs": false,
    "shadow": false,
    "sub": true,
    "supernew": false,
    "validthis": false,
    "browser": true,
    "couch": false,
    "devel": true,
    "dojo": false,
    "jquery": false,
    "mootools": false,
    "node": true,
    "nonstandard": true,
    "predef": ["define", "require", "$", "beforeEach", "afterEach", "jasmine", "it", "describe", "expect", "sinon"],
    "prototypejs": false,
    "rhino": false,
    "wsh": false,
    "onevar": false,
    "passfail": false
}'

pre_commit_javascript="#!/usr/bin/env bash

EXIT_CODE=0
CURRENT=\$(pwd)
RES=\"\"

for FILE in \`git diff-index HEAD -- | awk '{ if (\$5 != \"D\") print \$6 }' | grep \".*\\.js$\"\`; do
    echo \"checking file \$FILE\"
    RES=\"\$RES\\n\`jshint \$FILE\`\"
    EXIT_CODE=\$((\${EXIT_CODE} + \$?))
done

if [[ \${EXIT_CODE} -ne 0 ]]; then
    echo \"\$RES\"
    echo \"If you don't have JSHint, install it using 'npm install -g jshint'.\"
    echo \"JSHint detected syntax problems.\"
    echo \"Commit aborted.\"
fi

exit \$((\${EXIT_CODE}))"

pre_commit_php="#!/bin/bash
# Author: Remigijus Jarmalavičius <remigijus@jarmalavicius.lt>
# Author: Vytautas Povilaitis <php-checker@vytux.lt>

ROOT_DIR=\"\$(pwd)/\"
LIST=\$(git diff-index --cached --name-only --diff-filter=ACMR HEAD)
ERRORS_BUFFER=\"\"
for file in \$LIST
do
    EXTENSION=\$(echo \"\$file\" | grep \".php\$\")
    if [ \"\$EXTENSION\" != \"\" ]; then
        ERRORS=\$(php -l \$ROOT_DIR\$file 2>&1 | grep \"Parse error\")
        if [ \"\$ERRORS\" != \"\" ]; then
            if [ \"\$ERRORS_BUFFER\" != \"\" ]; then
                ERRORS_BUFFER=\"\$ERRORS_BUFFER\n\$ERRORS\"
            else
                ERRORS_BUFFER=\"\$ERRORS\"
            fi
            echo \"Syntax errors found in file: \$file \"
        fi
    fi
done
if [ \"\$ERRORS_BUFFER\" != \"\" ]; then
    echo
    echo \"These errors were found in try-to-commit files: \"
    echo -e \$ERRORS_BUFFER
    echo
    echo \"Can't commit, fix errors first.\"
    exit 1
else
    echo \"Commited successfully.\"
fi"

pre_commit='#!/usr/bin/env bash

.git/hooks/pre-commit-javascript
.git/hooks/pre-commit-php'

echo "installing .jshintrc"

FOLDER=$(pwd)
touch $FOLDER/.jshintrc && echo "$js_hint" > $FOLDER/.jshintrc

project_path=$1

if [ -z "$project_path" ]; then
    project_path=$FOLDER
fi

echo "base path is $project_path"

for f in 'pre-commit' 'pre-commit-javascript' 'pre-commit-php'; do echo "installing $f"
    `touch $project_path/.git/hooks/$f`;
    `chmod a+x $project_path/.git/hooks/$f`;
    tpl_name=$(echo $f | sed 's/-/_/g')
    tpl="${!tpl_name}"
    `echo "$tpl" > $project_path/.git/hooks/$f`
done

echo "done."
