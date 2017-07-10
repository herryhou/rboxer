const boxer = require('../dist/rboxer')
const tap = require('tap')

const route = [
  [50.5, 30.5],
  [50.4, 30.6],
  [50.3, 30.7]
]

const expect = [
[[50.4, 30.38836968319783],[50.57986432118374, 30.458913122131893]],
[[50.355033919704056, 30.458913122131893],[50.57986432118374, 30.52945656106595]],
[[50.26510175911219, 30.52945656106595],[50.57986432118374, 30.6]],
[[50.22013567881625, 30.6],[50.534898240887806, 30.67054343893406]],
[[50.22013567881625, 30.67054343893406],[50.48993216059186, 30.741086877868096]],
[[50.22013567881625, 30.741086877868096],[50.4, 30.81163031680215]]]

const boxes = boxer.mkBox(route, 5)
//console.log(boxes)
tap.equal(JSON.stringify(boxes),JSON.stringify(expect))

/*
	browser 測試
	打開 http://stephangeorg.github.io/leaflet-routeboxer/example/
	在 console 裡面執行

	var route = [
		  L.latLng(50.5, 30.5),
		  L.latLng(50.4, 30.6),
		  L.latLng(50.3, 30.7)
		]
	boxes = L.RouteBoxer.box(route, 5)
	boxes.map((b)=>console.log('[',b._southWest.lat,','+b._southWest.lng,'],[', b._northEast.lat, ',', b._northEast.lng,']'))
*/