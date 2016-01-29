var Route = require('../lib/bus_route');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var rawRoute = ['13C:KUMARASWAMY LAYOUT,DAYANANDASAGAR COL. CR,MONO TYPE,JAYANAGAR BUS STAND,ASHOKA PILLAR,WILSON GARDEN POLICE STN.,BANGALORE CLUB,SHIVAJINAGAR BUS STAND',
    '13D:KADIRENAHALLI PARK,MONO TYPE,BANASHANKARI,JAYANAGAR BUS STAND,ASHOKA PILLAR,WILSON GARDEN POLICE STN.,BANGALORE CLUB,SHIVAJINAGAR BUS STAND',
    '13E:BSK III STAGE 2ND PHASE,HOSKEREHALLI CR,BSK 3RD STG. 3RD PHASE,KADIRENAHALLI PARK,MONO TYPE,JAYANAGAR BUS STAND,ASHOKA PILLAR,WILSON GARDEN POLICE STN.,BANGALORE CLUB,SHIVAJINAGAR BUS STAND',
    '13F:CHENNAMANA KERE ACHKATT,MONO TYPE,BANASHANKARI,JAYANAGAR BUS STAND,ASHOKA PILLAR,WILSON GARDEN POLICE STN.,BANGALORE CLUB,SHIVAJINAGAR BUS STAND'];

describe('findBusesPassesThrough',function(){
    var r = new Route();
    r.createRoute(rawRoute.join('\n'));
      it('finds the buses numbers those passes through a given place',function(){
          var buses = r.findBusesPassesThrough('ASHOKA PILLAR');
          assert.deepEqual(buses,['13C','13D','13E','13F']);
          var buses = r.findBusesPassesThrough('BANASHANKARI');
          assert.deepEqual(buses,['13D','13F']);
          var buses = r.findBusesPassesThrough('HOSKEREHALLI CR');
          assert.deepEqual(buses,['13E']);
      });
});


describe('findDirectBusesBetween',function(){
    var r = new Route();
    r.createRoute(rawRoute.join('\n'));
      it('finds the direct buses between two stations',function(){
          var buses = r.findDirectBusesBetween('MONO TYPE','BANGALORE CLUB');
          assert.deepEqual(buses, ['13C','13D','13E','13F']);
          var buses = r.findDirectBusesBetween('KUMARASWAMY LAYOUT','BANGALORE CLUB');
          assert.deepEqual(buses, ['13C']);
          var buses = r.findDirectBusesBetween('KADIRENAHALLI PARK','WILSON GARDEN POLICE STN.');
          assert.deepEqual(buses, ['13D','13E']);

      });
});
