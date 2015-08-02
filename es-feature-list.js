var ReflectSupports = require("es-feature-tests");

ReflectSupports( "all", function(results,timestamp){
    console.error(JSON.stringify(results, null, 4));
});
