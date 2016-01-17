build:
	mkdir -p build
	git clone https://github.com/creationix/nvm.git build/nvm
run-node: build
	/bin/bash ./bin/run-tests.sh
process:
	node processResults.js
clean:
	-rm -rf ./build
