#! /bin/sh
echo 'setup'

if [ ! -d ./ui/js/lib ]; then
	echo 'setup lib dir'
	mkdir ./ui/js/lib
	chmod go+rx ./ui/js/lib
fi
if [ ! -f ./ui/js/lib/angular.zip ] && [ ! -f ./ui/js/lib/angular-1.3.10/angular.js ]; then
	curl -Lk https://code.angularjs.org/1.3.10/angular-1.3.10.zip -o ./ui/js/lib/angular.zip
fi

if [ -f ./ui/js/lib/angular.zip ]; then
	echo 'install and cleanup zip'
	#unzip angular.zip js/lib/angular-1.3.10/*.* -x * -d ./ -u -o
	unzip ./ui/js/lib/angular.zip -d ./ui/js/lib/
	ln -s ./ui/js/lib/angular-1.3.10 ./ui/js/ng
#	rm -f ./ui/js/lib/angular.zip 
fi

echo 'update har loader'
curl https://raw.githubusercontent.com/thtr/harharhar/master/harharhar.js -o ./ui/js/lib/harharhar.js

echo 'fix permissions'
chmod -R go+r ui

echo 'all done'

