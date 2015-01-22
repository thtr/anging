#! /bin/sh
echo 'setup'

if [ ! -d ./lib ]; then
	echo 'setup lib dir'
	mkdir lib
	chmod go+rx lib
fi
if [ ! -f ./lib/angular.zip ] && [ ! -f ./lib/angular-1.3.10/angular.js ]; then
	curl -Lk https://code.angularjs.org/1.3.10/angular-1.3.10.zip -o ./lib/angular.zip
fi

if [ -f ./lib/angular.zip ]; then
	echo 'install and cleanup zip'
	#unzip angular.zip lib/angular-1.3.10/*.* -x * -d ./ -u -o
	unzip ./lib/angular.zip -d ./lib/ -u -o
#	rm -f angular.zip 
fi
echo 'update har loader'
curl https://raw.githubusercontent.com/thtr/harharhar/master/harharhar.js -o lib/harharhar.js
echo 'fix permissions'
chmod -R go+r lib

echo 'all done'

