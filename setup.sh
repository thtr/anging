#! /bin/sh
echo 'setup'

if [ ! -d ./js/lib ]; then
	echo 'setup lib dir'
	mkdir ./js/lib
	chmod go+rx ./js/lib
fi
if [ ! -f ./js/lib/angular.zip ] && [ ! -f ./js/lib/angular-1.3.10/angular.js ]; then
	curl -Lk https://code.angularjs.org/1.3.10/angular-1.3.10.zip -o ./js/lib/angular.zip
fi

if [ -f ./js/lib/angular.zip ]; then
	echo 'install and cleanup zip'
	#unzip angular.zip js/lib/angular-1.3.10/*.* -x * -d ./ -u -o
	unzip ./js/lib/angular.zip -d ./js/lib/
	ln -s ./js/lib/angular-1.3.10 ./js/ng
#	rm -f ./js/lib/angular.zip 
fi

echo 'update har loader'
curl https://raw.githubusercontent.com/thtr/harharhar/master/harharhar.js -o js/lib/harharhar.js

echo 'fix permissions'
chmod -R go+r ui

echo 'all done'

