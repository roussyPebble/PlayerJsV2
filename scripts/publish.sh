echo no  1
pwd
cd scripts
echo no 2 
pwd
case $1 in
	dev)
		EXECUTE_SCRIPT="build-dev"
		;;
	prod)
		EXECUTE_SCRIPT="build-prod"
		;;
esac
npm install
echo "Execute  $EXECUTE_SCRIPT"
node createJsonVersion.js 
npm run $EXECUTE_SCRIPT 
node versionLogging.js 
node cacheInvalidation.js",

