source build/nvm/nvm.sh
nvm deactivate
mkdir -p build/results/
#nvm ls-remote
for VERSION in $(nvm ls-remote | perl -pe 's/\e\[?.*?[\@-~]//g' | grep "0.10\|0.12\|iojs\|v4\|v5")
do
    nvm install $VERSION
    nvm run $VERSION es-feature-list.js | tail -n +2 > build/results/$VERSION.json
done
