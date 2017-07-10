const boxer = require('../dist/rboxer')
const tap = require('tap')

const b1 = [[ 9.93156030638692, 9.931320782467667 ],[ 9.976526386682856, 10.11520337958164]]
const b90 = [[ 14.023473613317142, 12.919412985569931],[ 14.068439693613078, 13.103295582683902]]

const pts = [[10,10],[11,12],[12,11],[13,14],[14,13]]
const boxes = boxer.mkBox(pts, 5)
//console.log(boxes)
tap.equal(boxes.length, 91)
tap.equal(JSON.stringify(boxes[0]),JSON.stringify(b1))
tap.equal(JSON.stringify(boxes[90]),JSON.stringify(b90))