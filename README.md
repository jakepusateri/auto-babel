# node/iojs tests
./install.sh to install
./run-tests.sh to run tests, files output to build/results in json format

# browser tests
    node_modules/sauce-tunnel/vendor/linux/bin/sc -D featuretests.io
to setup the sauce connect
./run-browset-tests.sh to run the tests

node processResults.js to list passing test count for each version