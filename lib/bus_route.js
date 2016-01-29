var fs = require('fs');
var _ = require('lodash');


// var readDataAndOrganize = function(fileName){
//     var content = fs.readFileSync('./data/'+fileName,'utf8');
//     var seperated = content.split('\n');
//     var routes = {};
//     seperated.forEach(function(eachRoute){
//         var routeName = _.first(eachRoute.split(':'));
//         var path = _.last(eachRoute.split(':')).split(',');
//         routes[routeName] = path;
//     });
// };
// readDataAndOrganize('All_Routes_By_Number.txt');

var Route = function(){
    this.routes = {};
};

var matchStation = function(allRoutes, station){
    return allRoutes.indexOf(station) != -1;
};

Route.prototype = {
    createRoute : function(rawRoute){
        var seperated = rawRoute.split('\n');
        var self = this;
        seperated.forEach(function(eachRoute){
            var routeName = _.first(eachRoute.split(':'));
            var path = _.last(eachRoute.split(':')).split(',');
            self.routes[routeName] = path;
        });
    },

    findBusesPassesThrough : function(station){
        var buses = [];
        for(var index in this.routes)
            if(matchStation(this.routes[index],station))
                buses.push(index);
        return buses;
    }
};

module.exports = Route;
