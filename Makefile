build:
	mkdir -p build
	git clone https://github.com/creationix/nvm.git build/nvm
run-node:
	/bin/bash ./bin/run-tests.sh
run-browser:
	/bin/bash ./bin/run-browser-tests.sh
process:
	node processResults.js
