#/bin/bash
set -e

echo -e "\nCleaning build output directory."
rm -rf dist
mkdir -p dist

export SENTRY_RELEASE=$(git rev-parse HEAD)
echo -e "\nBuilding JavaScript and CSS (Sentry release tag ${SENTRY_RELEASE})"
yarn build

# Remove incorrect sourcemap URL from built JS file.
sed -i '/sourceMappingURL=main/d' dist/build/main.js

echo -e "\nGenerating cache busting hashes."
export JS_BUILDHASH="$(cat dist/build/main.js | md5sum | cut -d' ' -f1 | head -c 8)"
[[ -z "$JS_BUILDHASH" ]] && {
    echo "JS_BUILDHASH is empty"
    exit 1
}
echo "Using JS build hash $JS_BUILDHASH"
mv dist/build/main.js dist/build/main-${JS_BUILDHASH}.js
mv dist/build/main.js.map dist/build/main-${JS_BUILDHASH}.js.map

export CSS_BUILDHASH="$(cat dist/build/main.css | md5sum | cut -d' ' -f1 | head -c 8)"
[[ -z "$CSS_BUILDHASH" ]] && {
    echo "CSS_BUILDHASH is empty"
    exit 1
}
echo "Using CSS build hash $CSS_BUILDHASH"
mv dist/build/main.css dist/build/main-${CSS_BUILDHASH}.css

echo -e "\nBuilding HTML."
yarn html

echo -e "\nRunning React Snap to generate static content."
yarn snap

echo -e "\nCollecting static files."
cp -R public/* dist

# Print build output to the console.
echo -e "\nDone building assets:"
find dist/

# Final santity check to ensure that we've built all the important stuff.
echo -e "\nChecking for build assets."
[[ ! -f dist/index.html ]] && {
    echo "No HTML file found"
    exit 1
}

[[ ! -f dist/build/main-${JS_BUILDHASH}.js ]] && {
    echo "No JavaScript file found"
    exit 1
}

[[ ! -f dist/build/main-${CSS_BUILDHASH}.css ]] && {
    echo "No CSS file found"
    exit 1
}

echo -e "\nBuild finished.\n"
