import {LatLng} from '../node_modules/Leaflet/src/geo/LatLng.js'
import {RouteBoxer} from './routeboxer'
/*
	pts : array of [lat,lng], should conatin least 2 pts!
	dis : buffer width (default 20 meter)
*/
export function mkBox(pts = [], dis = 20){
	let boxes = []
	if (pts && pts.length && pts.length >= 2){
		const lls = pts.map((pt)=>new LatLng(pt[0],pt[1]))
		const bounds = RouteBoxer.box(lls, dis)
		boxes = bounds.map((box)=>{
		    //console.log(box)
		    const {_southWest,_northEast} = box
		    return [[_southWest.lat,_southWest.lng],[_northEast.lat,_northEast.lng]]
		})
	}
	return boxes
}