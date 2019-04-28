. ./scripts/vars-dev.sh
. ./scripts/build.sh
pushd dist
python3 -m http.server 3001
