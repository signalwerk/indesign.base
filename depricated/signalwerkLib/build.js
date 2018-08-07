signalwerk = (function(_s) {


    var build = {};

    // performs on the source an include with a root for relative path's

    build.embed = function(src, root) {



        // the routine to read the include-file
        function include(str, g1, g2, path) {

            var finalPath = path;

            // resolve relative path
            if (path.charAt(0) != '/') {
                finalPath = root + '/' + path;
                finalPath = finalPath.replace("/./", "/");
                finalPath = finalPath.replace("//", "/");

            }

            var fileIn = File(finalPath);

            if (!fileIn.exists) {
                console.log('couldnt include:');
                console.log(finalPath);
                throw "ups. couldn't finde include";
            } else {
                console.log('include:' + finalPath);
            }


            fileIn.open("r");
            var src = fileIn.read();
            fileIn.close();


            src = signalwerk.build.embed(src, fileIn.parent);

            return src;
        }


        // the routine to include require-statements
        function includeRequre(str, g1, g2, path) {

            var src = include(str, g1, g2, path);
            console.log('include by require:' + path);


            src = JSON.stringify(src);
            return "requireString(" + src + ")";
        }


        var finalSRC = src;

        // normal includes
        finalSRC = finalSRC.replace(/^\/\/(\s)*@include ("|')(.*)("|');?$/gm, include);

        // require includes like
        // /*1nclude*/require('./lib/handlebars-v3.0.3.js')
        finalSRC = finalSRC.replace(/\/\*include\*\/(\s)*require\(("|')([^'"]*)("|')\)/gm, includeRequre);

        return finalSRC;




    };



    build.run = function(inFile, fsRoot) {

        return signalwerk.build.embed('// @include "' + inFile + '";', fsRoot);


    };



    _s.build = build;
    return _s;

}(this.signalwerk || {}));