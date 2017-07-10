'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * @namespace Util
 *
 * Various utility functions, used by Leaflet internally.
 */

// @function extend(dest: Object, src?: Object): Object
// Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
function extend(dest) {
	var i, j, len, src;

	for (j = 1, len = arguments.length; j < len; j++) {
		src = arguments[j];
		for (i in src) {
			dest[i] = src[i];
		}
	}
	return dest;
}

// @function create(proto: Object, properties?: Object): Object
// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)


// @function bind(fn: Function, …): Function
// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
// Has a `L.bind()` shortcut.


// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)


// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assiging it one if it doesn't have it.


// @function throttle(fn: Function, time: Number, context: Object): Function
// Returns a function which executes function `fn` with the given scope `context`
// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
// `fn` will be called no more than one time per given amount of `time`. The arguments
// received by the bound function will be any arguments passed when binding the
// function, followed by any arguments passed when invoking the bound function.
// Has an `L.throttle` shortcut.


// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
function wrapNum(x, range, includeMax) {
	var max = range[1],
	    min = range[0],
	    d = max - min;
	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}

// @function falseFn(): Function
// Returns a function which always returns `false`.


// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
function formatNum(num, digits) {
	var pow = Math.pow(10, digits || 5);
	return Math.round(num * pow) / pow;
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)


// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.


// @function setOptions(obj: Object, options: Object): Object
// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.


// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
// be appended at the end. If `uppercase` is `true`, the parameter names will
// be uppercased (e.g. `'?A=foo&B=bar'`)


// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.


// @function isArray(obj): Boolean
// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
var isArray = Array.isArray || function (obj) {
	return (Object.prototype.toString.call(obj) === '[object Array]');
};

// @function indexOf(array: Array, el: Object): Number
// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)


// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).





// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.


// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).

/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 */

function Point(x, y, round) {
	// @property x: Number; The `x` coordinate of the point
	this.x = (round ? Math.round(x) : x);
	// @property y: Number; The `y` coordinate of the point
	this.y = (round ? Math.round(y) : y);
}

Point.prototype = {

	// @method clone(): Point
	// Returns a copy of the current point.
	clone: function () {
		return new Point(this.x, this.y);
	},

	// @method add(otherPoint: Point): Point
	// Returns the result of addition of the current and the given points.
	add: function (point) {
		// non-destructive, returns a new point
		return this.clone()._add(toPoint(point));
	},

	_add: function (point) {
		// destructive, used directly for performance in situations where it's safe to modify existing point
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	// @method subtract(otherPoint: Point): Point
	// Returns the result of subtraction of the given point from the current.
	subtract: function (point) {
		return this.clone()._subtract(toPoint(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	// @method divideBy(num: Number): Point
	// Returns the result of division of the current point by the given number.
	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	// @method multiplyBy(num: Number): Point
	// Returns the result of multiplication of the current point by the given number.
	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	// @method scaleBy(scale: Point): Point
	// Multiply each coordinate of the current point by each coordinate of
	// `scale`. In linear algebra terms, multiply the point by the
	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	// defined by `scale`.
	scaleBy: function (point) {
		return new Point(this.x * point.x, this.y * point.y);
	},

	// @method unscaleBy(scale: Point): Point
	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	// each coordinate of `scale`.
	unscaleBy: function (point) {
		return new Point(this.x / point.x, this.y / point.y);
	},

	// @method round(): Point
	// Returns a copy of the current point with rounded coordinates.
	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	// @method floor(): Point
	// Returns a copy of the current point with floored coordinates (rounded down).
	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	// @method ceil(): Point
	// Returns a copy of the current point with ceiled coordinates (rounded up).
	ceil: function () {
		return this.clone()._ceil();
	},

	_ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	},

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	distanceTo: function (point) {
		point = toPoint(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	equals: function (point) {
		point = toPoint(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	contains: function (point) {
		point = toPoint(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	toString: function () {
		return 'Point(' +
		        formatNum(this.x) + ', ' +
		        formatNum(this.y) + ')';
	}
};

// @factory L.point(x: Number, y: Number, round?: Boolean)
// Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

// @alternative
// @factory L.point(coords: Number[])
// Expects an array of the form `[x, y]` instead.

// @alternative
// @factory L.point(coords: Object)
// Expects a plain object of the form `{x: Number, y: Number}` instead.
function toPoint(x, y, round) {
	if (x instanceof Point) {
		return x;
	}
	if (isArray(x)) {
		return new Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	if (typeof x === 'object' && 'x' in x && 'y' in x) {
		return new Point(x.x, x.y);
	}
	return new Point(x, y, round);
}

/*
 * @class Bounds
 * @aka L.Bounds
 *
 * Represents a rectangular area in pixel coordinates.
 *
 * @example
 *
 * ```js
 * var p1 = L.point(10, 10),
 * p2 = L.point(40, 60),
 * bounds = L.bounds(p1, p2);
 * ```
 *
 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * otherBounds.intersects([[10, 10], [40, 60]]);
 * ```
 */

function Bounds(a, b) {
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
}

Bounds.prototype = {
	// @method extend(point: Point): this
	// Extends the bounds to contain the given point.
	extend: function (point) { // (Point)
		point = toPoint(point);

		// @property min: Point
		// The top left corner of the rectangle.
		// @property max: Point
		// The bottom right corner of the rectangle.
		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	getCenter: function (round) {
		return new Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	getBottomLeft: function () {
		return new Point(this.min.x, this.max.y);
	},

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	getTopRight: function () { // -> Point
		return new Point(this.max.x, this.min.y);
	},

	// @method getTopLeft(): Point
	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	getTopLeft: function () {
		return this.min; // left, top
	},

	// @method getBottomRight(): Point
	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	getBottomRight: function () {
		return this.max; // right, bottom
	},

	// @method getSize(): Point
	// Returns the size of the given bounds
	getSize: function () {
		return this.max.subtract(this.min);
	},

	// @method contains(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle contains the given one.
	// @alternative
	// @method contains(point: Point): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) {
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof Point) {
			obj = toPoint(obj);
		} else {
			obj = toBounds(obj);
		}

		if (obj instanceof Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	// @method intersects(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	// intersect if they have at least one point in common.
	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = toBounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	// overlap if their intersection is an area.
	overlaps: function (bounds) { // (Bounds) -> Boolean
		bounds = toBounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};


// @factory L.bounds(corner1: Point, corner2: Point)
// Creates a Bounds object from two corners coordinate pairs.
// @alternative
// @factory L.bounds(points: Point[])
// Creates a Bounds object from the given array of points.
function toBounds(a, b) {
	if (!a || a instanceof Bounds) {
		return a;
	}
	return new Bounds(a, b);
}

/*
 * @class LatLngBounds
 * @aka L.LatLngBounds
 *
 * Represents a rectangular geographical area on a map.
 *
 * @example
 *
 * ```js
 * var corner1 = L.latLng(40.712, -74.227),
 * corner2 = L.latLng(40.774, -74.125),
 * bounds = L.latLngBounds(corner1, corner2);
 * ```
 *
 * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * map.fitBounds([
 * 	[40.712, -74.227],
 * 	[40.774, -74.125]
 * ]);
 * ```
 *
 * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
 */

function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
	if (!corner1) { return; }

	var latlngs = corner2 ? [corner1, corner2] : corner1;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
}

LatLngBounds.prototype = {

	// @method extend(latlng: LatLng): this
	// Extend the bounds to contain the given point

	// @alternative
	// @method extend(otherBounds: LatLngBounds): this
	// Extend the bounds to contain the given bounds
	extend: function (obj) {
		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof LatLng) {
			sw2 = obj;
			ne2 = obj;

		} else if (obj instanceof LatLngBounds) {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) { return this; }

		} else {
			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
		}

		if (!sw && !ne) {
			this._southWest = new LatLng(sw2.lat, sw2.lng);
			this._northEast = new LatLng(ne2.lat, ne2.lng);
		} else {
			sw.lat = Math.min(sw2.lat, sw.lat);
			sw.lng = Math.min(sw2.lng, sw.lng);
			ne.lat = Math.max(ne2.lat, ne.lat);
			ne.lng = Math.max(ne2.lng, ne.lng);
		}

		return this;
	},

	// @method pad(bufferRatio: Number): LatLngBounds
	// Returns bigger bounds created by extending the current bounds by a given percentage in each direction.
	pad: function (bufferRatio) {
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new LatLngBounds(
		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	// @method getCenter(): LatLng
	// Returns the center point of the bounds.
	getCenter: function () {
		return new LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	// @method getSouthWest(): LatLng
	// Returns the south-west point of the bounds.
	getSouthWest: function () {
		return this._southWest;
	},

	// @method getNorthEast(): LatLng
	// Returns the north-east point of the bounds.
	getNorthEast: function () {
		return this._northEast;
	},

	// @method getNorthWest(): LatLng
	// Returns the north-west point of the bounds.
	getNorthWest: function () {
		return new LatLng(this.getNorth(), this.getWest());
	},

	// @method getSouthEast(): LatLng
	// Returns the south-east point of the bounds.
	getSouthEast: function () {
		return new LatLng(this.getSouth(), this.getEast());
	},

	// @method getWest(): Number
	// Returns the west longitude of the bounds
	getWest: function () {
		return this._southWest.lng;
	},

	// @method getSouth(): Number
	// Returns the south latitude of the bounds
	getSouth: function () {
		return this._southWest.lat;
	},

	// @method getEast(): Number
	// Returns the east longitude of the bounds
	getEast: function () {
		return this._northEast.lng;
	},

	// @method getNorth(): Number
	// Returns the north latitude of the bounds
	getNorth: function () {
		return this._northEast.lat;
	},

	// @method contains(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle contains the given one.

	// @alternative
	// @method contains (latlng: LatLng): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
			obj = toLatLng(obj);
		} else {
			obj = toLatLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	// @method intersects(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	intersects: function (bounds) {
		bounds = toLatLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	overlaps: function (bounds) {
		bounds = toLatLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

		return latOverlaps && lngOverlaps;
	},

	// @method toBBoxString(): String
	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overriden by setting `maxMargin` to a small number.
	equals: function (bounds, maxMargin) {
		if (!bounds) { return false; }

		bounds = toLatLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
	},

	// @method isValid(): Boolean
	// Returns `true` if the bounds are properly initialized.
	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

// TODO International date line?

// @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
// Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

// @alternative
// @factory L.latLngBounds(latlngs: LatLng[])
// Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
function toLatLngBounds(a, b) {
	if (a instanceof LatLngBounds) {
		return a;
	}
	return new LatLngBounds(a, b);
}

/*
 * @namespace CRS
 * @crs L.CRS.Base
 * Object that defines coordinate reference systems for projecting
 * geographical points into pixel (screen) coordinates and back (and to
 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
 *
 * Leaflet defines the most usual CRSs by default. If you want to use a
 * CRS not defined by default, take a look at the
 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
 */

var CRS = {
	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	// Projects geographical coordinates into pixel coordinates for a given zoom.
	latLngToPoint: function (latlng, zoom) {
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	// zoom into geographical coordinates.
	pointToLatLng: function (point, zoom) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	// @method project(latlng: LatLng): Point
	// Projects geographical coordinates into coordinates in units accepted for
	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	project: function (latlng) {
		return this.projection.project(latlng);
	},

	// @method unproject(point: Point): LatLng
	// Given a projected coordinate returns the corresponding LatLng.
	// The inverse of `project`.
	unproject: function (point) {
		return this.projection.unproject(point);
	},

	// @method scale(zoom: Number): Number
	// Returns the scale used when transforming projected coordinates into
	// pixel coordinates for a particular zoom. For example, it returns
	// `256 * 2^zoom` for Mercator-based CRS.
	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	// @method zoom(scale: Number): Number
	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	// factor of `scale`.
	zoom: function (scale) {
		return Math.log(scale / 256) / Math.LN2;
	},

	// @method getProjectedBounds(zoom: Number): Bounds
	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	getProjectedBounds: function (zoom) {
		if (this.infinite) { return null; }

		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return new Bounds(min, max);
	},

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates.

	// @property code: String
	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	//
	// @property wrapLng: Number[]
	// An array of two numbers defining whether the longitude (horizontal) coordinate
	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	//
	// @property wrapLat: Number[]
	// Like `wrapLng`, but for the latitude (vertical) axis.

	// wrapLng: [min, max],
	// wrapLat: [min, max],

	// @property infinite: Boolean
	// If true, the coordinate space will be unbounded (infinite in both axes)
	infinite: false,

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where lat and lng has been wrapped according to the
	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	wrapLatLng: function (latlng) {
		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
		    alt = latlng.alt;

		return new LatLng(lat, lng, alt);
	},

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	// that its center is within the CRS's bounds.
	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	wrapLatLngBounds: function (bounds) {
		var center = bounds.getCenter(),
		    newCenter = this.wrapLatLng(center),
		    latShift = center.lat - newCenter.lat,
		    lngShift = center.lng - newCenter.lng;

		if (latShift === 0 && lngShift === 0) {
			return bounds;
		}

		var sw = bounds.getSouthWest(),
		    ne = bounds.getNorthEast(),
		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

		return new LatLngBounds(newSw, newNe);
	}
};

/*
 * @namespace CRS
 * @crs L.CRS.Earth
 *
 * Serves as the base for CRS that are global such that they cover the earth.
 * Can only be used as the base for other CRS and cannot be used directly,
 * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
 * meters.
 */

var Earth = extend({}, CRS, {
	wrapLng: [-180, 180],

	// Mean Earth Radius, as recommended for use by
	// the International Union of Geodesy and Geophysics,
	// see http://rosettacode.org/wiki/Haversine_formula
	R: 6371000,

	// distance between two geographical points using spherical law of cosines approximation
	distance: function (latlng1, latlng2) {
		var rad = Math.PI / 180,
		    lat1 = latlng1.lat * rad,
		    lat2 = latlng2.lat * rad,
		    a = Math.sin(lat1) * Math.sin(lat2) +
		        Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlng2.lng - latlng1.lng) * rad);

		return this.R * Math.acos(Math.min(a, 1));
	}
});

/* @class LatLng
 * @aka L.LatLng
 *
 * Represents a geographical point with a certain latitude and longitude.
 *
 * @example
 *
 * ```
 * var latlng = L.latLng(50.5, 30.5);
 * ```
 *
 * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
 *
 * ```
 * map.panTo([50, 30]);
 * map.panTo({lon: 30, lat: 50});
 * map.panTo({lat: 50, lng: 30});
 * map.panTo(L.latLng(50, 30));
 * ```
 */

function LatLng(lat, lng, alt) {
	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	// @property lat: Number
	// Latitude in degrees
	this.lat = +lat;

	// @property lng: Number
	// Longitude in degrees
	this.lng = +lng;

	// @property alt: Number
	// Altitude in meters (optional)
	if (alt !== undefined) {
		this.alt = +alt;
	}
}

LatLng.prototype = {
	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overriden by setting `maxMargin` to a small number.
	equals: function (obj, maxMargin) {
		if (!obj) { return false; }

		obj = toLatLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	},

	// @method toString(): String
	// Returns a string representation of the point (for debugging purposes).
	toString: function (precision) {
		return 'LatLng(' +
		        formatNum(this.lat, precision) + ', ' +
		        formatNum(this.lng, precision) + ')';
	},

	// @method distanceTo(otherLatLng: LatLng): Number
	// Returns the distance (in meters) to the given `LatLng` calculated using the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula).
	distanceTo: function (other) {
		return Earth.distance(this, toLatLng(other));
	},

	// @method wrap(): LatLng
	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	wrap: function () {
		return Earth.wrapLatLng(this);
	},

	// @method toBounds(sizeInMeters: Number): LatLngBounds
	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	toBounds: function (sizeInMeters) {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return toLatLngBounds(
		        [this.lat - latAccuracy, this.lng - lngAccuracy],
		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	},

	clone: function () {
		return new LatLng(this.lat, this.lng, this.alt);
	}
};



// @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
// Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

// @alternative
// @factory L.latLng(coords: Array): LatLng
// Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

// @alternative
// @factory L.latLng(coords: Object): LatLng
// Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

function toLatLng(a, b, c) {
	if (a instanceof LatLng) {
		return a;
	}
	if (isArray(a) && typeof a[0] !== 'object') {
		if (a.length === 3) {
			return new LatLng(a[0], a[1], a[2]);
		}
		if (a.length === 2) {
			return new LatLng(a[0], a[1]);
		}
		return null;
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	}
	if (b === undefined) {
		return null;
	}
	return new LatLng(a, b, c);
}

const L = {LatLng, extend, LatLngBounds, latLngBounds : toLatLngBounds};

//copy routeboxer.js src from github
/**
 * @name Leaflet-RouteBoxer
 * @version 1.0
 * @copyright (c) 2015 Nearest!
 * @author Stephan Georg
 *
 * based on
 *
 * @name RouteBoxer
 * @version 1.0
 * @copyright (c) 2010 Google Inc.
 * @author Thor Mitchell
 *
 * @fileoverview The RouteBoxer class takes a path, such as the Polyline for a
 * route generated by a Directions request, and generates a set of LatLngBounds
 * objects that are guaranteed to contain every point within a given distance
 * of that route. These LatLngBounds objects can then be used to generate
 * requests to spatial search services that support bounds filtering (such as
 * the Google Maps Data API) in order to implement search along a route.
 *
 * RouteBoxer overlays a grid of the specified size on the route, identifies
 * every grid cell that the route passes through, and generates a set of bounds
 * that cover all of these cells, and their nearest neighbours. Consequently
 * the bounds returned will extend up to ~3x the specified distance from the
 * route in places.
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  Extending the L (leaflet object)
 *
 **/
L.RouteBoxer = L.extend({

  R         :  6371, // earth's mean radius in km
  grid_     : null,
  latGrid_  : [],
  lngGrid_  : [],
  boxesX_   : [],
  boxesY_   : [],

  /**
   * Generates boxes for a given route and distance
   *
   * @param {L.LatLng[] | L.Polyline} path The path along
   *    which to create boxes. The path object can be either an Array of
   *    L.LatLng objects L.Polyline object.
   * @param {Number} range The distance in kms around the route that the generated
   *    boxes must cover.
   * @return {L.LatLngBounds[]} An array of boxes that covers the whole
   *    path.
   */
  box: function (path, range) {
    // Two dimensional array representing the cells in the grid overlaid on the path
    this.grid_ = null;
    // Array that holds the latitude coordinate of each vertical grid line
    this.latGrid_ = [];
    // Array that holds the longitude coordinate of each horizontal grid line
    this.lngGrid_ = [];
    // Array of bounds that cover the whole route formed by merging cells that
    //  the route intersects first horizontally, and then vertically
    this.boxesX_ = [];
    // Array of bounds that cover the whole route formed by merging cells that
    //  the route intersects first vertically, and then horizontally
    this.boxesY_ = [];
    // The array of LatLngs representing the vertices of the path
    var vertices = null;
    // If necessary convert the path into an array of LatLng objects

    // already an array of LatLngs
    if (path instanceof Array) {

      vertices = path;
    // Leaflet-RouteBoxer rewrite conditions and
    } else if (path instanceof L.Polyline) {
      vertices = path.getLatLngs();
    }

    // Build the grid that is overlaid on the route
    this.buildGrid_(vertices, range);
    // Identify the grid cells that the route intersects
    this.findIntersectingCells_(vertices);
    // Merge adjacent intersected grid cells (and their neighbours) into two sets
    //  of bounds, both of which cover them completely
    this.mergeIntersectingCells_();
    // Return the set of merged bounds that has the fewest elements
    return (this.boxesX_.length <= this.boxesY_.length ?
            this.boxesX_ :
            this.boxesY_);
  },

  /**
   *
   *
   * @param {L.LatLng[] | L.Polyline} path The path along which to create boxes
   */
  formVertices : function(path) {
    var narr = [];
    for(var x=0;x<path.length;x++){
      narr.push(L.latLng(parseFloat(path[x][0]),parseFloat(path[x][1])));
    }
    return narr;
  },

  /**
   * Generates boxes for a given route and distance
   *
   * @param {LatLng[]} vertices The vertices of the path over which to lay the grid
   * @param {Number} range The spacing of the grid cells.
   */
  buildGrid_ : function(vertices, range) {

    // Create a LatLngBounds object that contains the whole path
    var routeBounds = new L.latLngBounds([]);
    for (var i = 0; i < vertices.length; i++) {
      routeBounds.extend(vertices[i]);
    }
    // Find the center of the bounding box of the path
    var routeBoundsCenter = routeBounds.getCenter();

    //console.log(routeBoundsCenter.lat);


    // Starting from the center define grid lines outwards vertically until they
    //  extend beyond the edge of the bounding box by more than one cell
    this.latGrid_.push(routeBoundsCenter.lat);
    // Add lines from the center out to the north
    this.latGrid_.push(routeBoundsCenter.rhumbDestinationPoint(0, range).lat);
    for (i = 2; this.latGrid_[i - 2] < routeBounds.getNorthEast().lat; i++) {
      this.latGrid_.push(routeBoundsCenter.rhumbDestinationPoint(0, range * i).lat);
    }
    // Add lines from the center out to the south
    for (i = 1; this.latGrid_[1] > routeBounds.getSouthWest().lat; i++) {
      this.latGrid_.unshift(routeBoundsCenter.rhumbDestinationPoint(180, range * i).lat);
    }
    // Starting from the center define grid lines outwards horizontally until they
    //  extend beyond the edge of the bounding box by more than one cell
    this.lngGrid_.push(routeBoundsCenter.lng);
    // Add lines from the center out to the east
    this.lngGrid_.push(routeBoundsCenter.rhumbDestinationPoint(90, range).lng);
    for (i = 2; this.lngGrid_[i - 2] < routeBounds.getNorthEast().lng; i++) {
      this.lngGrid_.push(routeBoundsCenter.rhumbDestinationPoint(90, range * i).lng);
    }
    // Add lines from the center out to the west
    for (i = 1; this.lngGrid_[1] > routeBounds.getSouthWest().lng; i++) {
      this.lngGrid_.unshift(routeBoundsCenter.rhumbDestinationPoint(270, range * i).lng);
    }
    // Create a two dimensional array representing this grid
    this.grid_ = new Array(this.lngGrid_.length);
    for (i = 0; i < this.grid_.length; i++) {
      this.grid_[i] = new Array(this.latGrid_.length);
    }
  },

  /**
   * Find all of the cells in the overlaid grid that the path intersects
   *
   * @param {LatLng[]} vertices The vertices of the path
   */
  findIntersectingCells_ : function (vertices) {
    // Find the cell where the path begins
    var hintXY = this.getCellCoords_(vertices[0]);
    // Mark that cell and it's neighbours for inclusion in the boxes
    this.markCell_(hintXY);
    // Work through each vertex on the path identifying which grid cell it is in
    for (var i = 1; i < vertices.length; i++) {
      // Use the known cell of the previous vertex to help find the cell of this vertex
      var gridXY = this.getGridCoordsFromHint_(vertices[i], vertices[i - 1], hintXY);
      if (gridXY[0] === hintXY[0] && gridXY[1] === hintXY[1]) {
        // This vertex is in the same cell as the previous vertex
        // The cell will already have been marked for inclusion in the boxes
        continue;
      } else if ((Math.abs(hintXY[0] - gridXY[0]) === 1 && hintXY[1] === gridXY[1]) ||
          (hintXY[0] === gridXY[0] && Math.abs(hintXY[1] - gridXY[1]) === 1)) {
        // This vertex is in a cell that shares an edge with the previous cell
        // Mark this cell and it's neighbours for inclusion in the boxes
        this.markCell_(gridXY);
      } else {
        // This vertex is in a cell that does not share an edge with the previous
        //  cell. This means that the path passes through other cells between
        //  this vertex and the previous vertex, and we must determine which cells
        //  it passes through
        this.getGridIntersects_(vertices[i - 1], vertices[i], hintXY, gridXY);
      }
      // Use this cell to find and compare with the next one
      hintXY = gridXY;
    }
  },

  /**
   * Find the cell a path vertex is in by brute force iteration over the grid
   *
   * @param {LatLng[]} latlng The latlng of the vertex
   * @return {Number[][]} The cell coordinates of this vertex in the grid
   */
  getCellCoords_ : function (latlng) {
    for (var x = 0; this.lngGrid_[x] < latlng.lng; x++) {}
    for (var y = 0; this.latGrid_[y] < latlng.lat; y++) {}
    return ([x - 1, y - 1]);
  },

  /**
   * Find the cell a path vertex is in based on the known location of a nearby
   *  vertex. This saves searching the whole grid when working through vertices
   *  on the polyline by are likely to be in close proximity to each other.
   *
   * @param {LatLng[]} latlng The latlng of the vertex to locate in the grid
   * @param {LatLng[]} hintlatlng The latlng of the vertex with a known location
   * @param {Number[]} hint The cell containing the vertex with a known location
   * @return {Number[]} The cell coordinates of the vertex to locate in the grid
   */
  getGridCoordsFromHint_ : function (latlng, hintlatlng, hint) {
    var x, y;
    if (latlng.lng > hintlatlng.lng) {
      for (x = hint[0]; this.lngGrid_[x + 1] < latlng.lng; x++) {}
    } else {
      for (x = hint[0]; this.lngGrid_[x] > latlng.lng; x--) {}
    }
    if (latlng.lat > hintlatlng.lat) {
      for (y = hint[1]; this.latGrid_[y + 1] < latlng.lat; y++) {}
    } else {
      for (y = hint[1]; this.latGrid_[y] > latlng.lat; y--) {}
    }
    return ([x, y]);
  },

  /**
   * Identify the grid squares that a path segment between two vertices
   * intersects with by:
   * 1. Finding the bearing between the start and end of the segment
   * 2. Using the delta between the lat of the start and the lat of each
   *    latGrid boundary to find the distance to each latGrid boundary
   * 3. Finding the lng of the intersection of the line with each latGrid
   *     boundary using the distance to the intersection and bearing of the line
   * 4. Determining the x-coord on the grid of the point of intersection
   * 5. Filling in all squares between the x-coord of the previous intersection
   *     (or start) and the current one (or end) at the current y coordinate,
   *     which is known for the grid line being intersected
   *
   * @param {LatLng} start The latlng of the vertex at the start of the segment
   * @param {LatLng} end The latlng of the vertex at the end of the segment
   * @param {Number[]} startXY The cell containing the start vertex
   * @param {Number[]} endXY The cell containing the vend vertex
   */
  getGridIntersects_ : function (start, end, startXY, endXY) {
    var edgePoint, edgeXY, i;
    var brng = start.rhumbBearingTo(end);         // Step 1.

    var hint = start;
    var hintXY = startXY;

    // Handle a line segment that travels south first
    if (end.lat > start.lat) {
      // Iterate over the east to west grid lines between the start and end cells
      for (i = startXY[1] + 1; i <= endXY[1]; i++) {
        // Find the latlng of the point where the path segment intersects with
        //  this grid line (Step 2 & 3)
        edgePoint = this.getGridIntersect_(start, brng, this.latGrid_[i]);
        // Find the cell containing this intersect point (Step 4)
        edgeXY = this.getGridCoordsFromHint_(edgePoint, hint, hintXY);
        // Mark every cell the path has crossed between this grid and the start,
        //   or the previous east to west grid line it crossed (Step 5)
        this.fillInGridSquares_(hintXY[0], edgeXY[0], i - 1);
        // Use the point where it crossed this grid line as the reference for the
        //  next iteration
        hint = edgePoint;
        hintXY = edgeXY;
      }
      // Mark every cell the path has crossed between the last east to west grid
      //  line it crossed and the end (Step 5)
      this.fillInGridSquares_(hintXY[0], endXY[0], i - 1);
    } else {
      // Iterate over the east to west grid lines between the start and end cells
      for (i = startXY[1]; i > endXY[1]; i--) {
        // Find the latlng of the point where the path segment intersects with
        //  this grid line (Step 2 & 3)
        edgePoint = this.getGridIntersect_(start, brng, this.latGrid_[i]);
        // Find the cell containing this intersect point (Step 4)
        edgeXY = this.getGridCoordsFromHint_(edgePoint, hint, hintXY);
        // Mark every cell the path has crossed between this grid and the start,
        //   or the previous east to west grid line it crossed (Step 5)
        this.fillInGridSquares_(hintXY[0], edgeXY[0], i);
        // Use the point where it crossed this grid line as the reference for the
        //  next iteration
        hint = edgePoint;
        hintXY = edgeXY;
      }
      // Mark every cell the path has crossed between the last east to west grid
      //  line it crossed and the end (Step 5)
      this.fillInGridSquares_(hintXY[0], endXY[0], i);
    }
  },

  /**
   * Find the latlng at which a path segment intersects with a given
   *   line of latitude
   *
   * @param {LatLng} start The vertex at the start of the path segment
   * @param {Number} brng The bearing of the line from start to end
   * @param {Number} gridLineLat The latitude of the grid line being intersected
   * @return {LatLng} The latlng of the point where the path segment intersects
   *                    the grid line
   */
  getGridIntersect_ : function (start, brng, gridLineLat) {
    var d = this.R * ((gridLineLat.toRad() - start.lat.toRad()) / Math.cos(brng.toRad()));
    return start.rhumbDestinationPoint(brng, d);
  },

  /**
   * Mark all cells in a given row of the grid that lie between two columns
   *   for inclusion in the boxes
   *
   * @param {Number} startx The first column to include
   * @param {Number} endx The last column to include
   * @param {Number} y The row of the cells to include
   */
  fillInGridSquares_ : function (startx, endx, y) {
    var x;
    if (startx < endx) {
      for (x = startx; x <= endx; x++) {
        this.markCell_([x, y]);
      }
    } else {
      for (x = startx; x >= endx; x--) {
        this.markCell_([x, y]);
      }
    }
  },

  /**
   * Mark a cell and the 8 immediate neighbours for inclusion in the boxes
   *
   * @param {Number[]} square The cell to mark
   */
  markCell_ : function (cell) {
    var x = cell[0];
    var y = cell[1];

    this.grid_[x - 1][y - 1] = 1;
    this.grid_[x][y - 1] = 1;
    this.grid_[x + 1][y - 1] = 1;
    this.grid_[x - 1][y] = 1;
    this.grid_[x][y] = 1;
    this.grid_[x + 1][y] = 1;
    this.grid_[x - 1][y + 1] = 1;
    this.grid_[x][y + 1] = 1;
    this.grid_[x + 1][y + 1] = 1;
  },

  /**
   * Create two sets of bounding boxes, both of which cover all of the cells that
   *   have been marked for inclusion.
   *
   * The first set is created by combining adjacent cells in the same column into
   *   a set of vertical rectangular boxes, and then combining boxes of the same
   *   height that are adjacent horizontally.
   *
   * The second set is created by combining adjacent cells in the same row into
   *   a set of horizontal rectangular boxes, and then combining boxes of the same
   *   width that are adjacent vertically.
   *
   */
  mergeIntersectingCells_ : function () {
    var x, y, box;
    // The box we are currently expanding with new cells
    var currentBox = null;
    // Traverse the grid a row at a time
    for (y = 0; y < this.grid_[0].length; y++) {
      for (x = 0; x < this.grid_.length; x++) {
        if (this.grid_[x][y]) {
          // This cell is marked for inclusion. If the previous cell in this
          //   row was also marked for inclusion, merge this cell into it's box.
          // Otherwise start a new box.
          box = this.getCellBounds_([x, y]);
          if (currentBox) {
            currentBox.extend(box.getNorthEast());
          } else {
            currentBox = box;
          }
        } else {
          // This cell is not marked for inclusion. If the previous cell was
          //  marked for inclusion, merge it's box with a box that spans the same
          //  columns from the row below if possible.
          this.mergeBoxesY_(currentBox);
          currentBox = null;
        }
      }
      // If the last cell was marked for inclusion, merge it's box with a matching
      //  box from the row below if possible.
      this.mergeBoxesY_(currentBox);
      currentBox = null;
    }
    // Traverse the grid a column at a time
    for (x = 0; x < this.grid_.length; x++) {
      for (y = 0; y < this.grid_[0].length; y++) {
        if (this.grid_[x][y]) {
          // This cell is marked for inclusion. If the previous cell in this
          //   column was also marked for inclusion, merge this cell into it's box.
          // Otherwise start a new box.
          if (currentBox) {
            box = this.getCellBounds_([x, y]);
            currentBox.extend(box.getNorthEast());
          } else {
            currentBox = this.getCellBounds_([x, y]);
          }
        } else {
          // This cell is not marked for inclusion. If the previous cell was
          //  marked for inclusion, merge it's box with a box that spans the same
          //  rows from the column to the left if possible.
          this.mergeBoxesX_(currentBox);
          currentBox = null;
        }
      }
      // If the last cell was marked for inclusion, merge it's box with a matching
      //  box from the column to the left if possible.
      this.mergeBoxesX_(currentBox);
      currentBox = null;
    }
  },

  /**
   * Search for an existing box in an adjacent row to the given box that spans the
   * same set of columns and if one is found merge the given box into it. If one
   * is not found, append this box to the list of existing boxes.
   *
   * @param {LatLngBounds}  The box to merge
   */
  mergeBoxesX_ : function (box) {
    if (box !== null) {
      for (var i = 0; i < this.boxesX_.length; i++) {
        if (this.boxesX_[i].getNorthEast().lng === box.getSouthWest().lng &&
            this.boxesX_[i].getSouthWest().lat === box.getSouthWest().lat &&
            this.boxesX_[i].getNorthEast().lat === box.getNorthEast().lat) {
          this.boxesX_[i].extend(box.getNorthEast());
          return;
        }
      }
      this.boxesX_.push(box);
    }
  },

  /**
   * Search for an existing box in an adjacent column to the given box that spans
   * the same set of rows and if one is found merge the given box into it. If one
   * is not found, append this box to the list of existing boxes.
   *
   * @param {LatLngBounds}  The box to merge
   */
  mergeBoxesY_ : function (box) {
    if (box !== null) {
      for (var i = 0; i < this.boxesY_.length; i++) {
        if (this.boxesY_[i].getNorthEast().lat === box.getSouthWest().lat &&
            this.boxesY_[i].getSouthWest().lng === box.getSouthWest().lng &&
            this.boxesY_[i].getNorthEast().lng === box.getNorthEast().lng) {
          this.boxesY_[i].extend(box.getNorthEast());
          return;
        }
      }
      this.boxesY_.push(box);
    }
  },

  /**
   * Obtain the LatLng of the origin of a cell on the grid
   *
   * @param {Number[]} cell The cell to lookup.
   * @return {LatLng} The latlng of the origin of the cell.
   */
  getCellBounds_ : function (cell) {
    return new L.LatLngBounds(
      new L.LatLng(this.latGrid_[cell[1]], this.lngGrid_[cell[0]]),
      new L.LatLng(this.latGrid_[cell[1] + 1], this.lngGrid_[cell[0] + 1]));
  },

});

/* Based the on the Latitude/longitude spherical geodesy formulae & scripts
   at http://www.movable-type.co.uk/scripts/latlong.html
   (c) Chris Veness 2002-2010
*/
L.LatLng.prototype.rhumbDestinationPoint = function (brng, dist) {
  var R = 6371; // earth's mean radius in km
  var d = parseFloat(dist) / R;  // d = angular distance covered on earth's surface
  var lat1 = this.lat.toRad(), lon1 = this.lng.toRad();
  brng = brng.toRad();

  var lat2 = lat1 + d * Math.cos(brng);
  var dLat = lat2 - lat1;
  var dPhi = Math.log(Math.tan(lat2 / 2 + Math.PI / 4) / Math.tan(lat1 / 2 + Math.PI / 4));
  var q = (Math.abs(dLat) > 1e-10) ? dLat / dPhi : Math.cos(lat1);
  var dLon = d * Math.sin(brng) / q;
  // check for going past the pole
  if (Math.abs(lat2) > Math.PI / 2) {
    lat2 = lat2 > 0 ? Math.PI - lat2 : - (Math.PI - lat2);
  }
  var lon2 = (lon1 + dLon + Math.PI) % (2 * Math.PI) - Math.PI;

  if (isNaN(lat2) || isNaN(lon2)) {
    return null;
  }
  return new L.LatLng(lat2.toDeg(), lon2.toDeg());
};

L.LatLng.prototype.rhumbBearingTo = function (dest) {
  var dLon = (dest.lng - this.lng).toRad();
  var dPhi = Math.log(Math.tan(dest.lat.toRad() / 2 + Math.PI / 4) / Math.tan(this.lat.toRad() / 2 + Math.PI / 4));
  if (Math.abs(dLon) > Math.PI) {
    dLon = dLon > 0 ? -(2 * Math.PI - dLon) : (2 * Math.PI + dLon);
  }
  return Math.atan2(dLon, dPhi).toBrng();
};

/**
 * Extend the Number object to convert degrees to radians
 *
 * @return {Number} Bearing in radians
 * @ignore
 */
Number.prototype.toRad = function () {
  return this * Math.PI / 180;
};

/**
 * Extend the Number object to convert radians to degrees
 *
 * @return {Number} Bearing in degrees
 * @ignore
 */
Number.prototype.toDeg = function () {
  return this * 180 / Math.PI;
};

/**
 * Normalize a heading in degrees to between 0 and +360
 *
 * @return {Number} Return
 * @ignore
 */
Number.prototype.toBrng = function () {
  return (this.toDeg() + 360) % 360;
};

const RouteBoxer = L.RouteBoxer;

/*
	pts : array of [lat,lng], should conatin least 2 pts!
	dis : buffer width (default 20 meter)
*/
function mkBox(pts = [], dis = 20){
	let boxes = [];
	if (pts && pts.length && pts.length >= 2){
		const lls = pts.map((pt)=>new LatLng(pt[0],pt[1]));
		const bounds = RouteBoxer.box(lls, dis);
		boxes = bounds.map((box)=>{
		    //console.log(box)
		    const {_southWest,_northEast} = box;
		    return [[_southWest.lat,_southWest.lng],[_northEast.lat,_northEast.lng]]
		});
	}
	return boxes
}

/* usage example
boxer = require('./dist/rboxer')

const pts = [[10,10],[11,12],[12,11],[13,14],[14,13]]
const boxes = boxer.mkBox(pts, 5)
console.log(boxes)
*/

exports.mkBox = mkBox;
