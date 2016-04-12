'use strict'
/* global describe, beforeEach, it */
const should = require('should')
const stream = require('stream')
const concatStreams = require('../index')

describe('concat-streams', () => {
  let stream1, stream2, stream3, streams
  let buffers = []

  beforeEach(() => {
    buffers = []
    let count = 0

    stream1 = new stream.Readable({
      read: function () {
        count++
        if (count > 10) return this.push(null)

        this.push('haha')
      }
    })

    stream2 = new stream.Transform({
      transform: (chunk, encoding, next) => {
        next(null, chunk)
      },
      flush: (done) => done()
    })

    stream3 = new stream.Writable({
      write: (chunk, encoding, next) => {
        buffers.push(chunk.toString())
        next()
      }
    })

    streams = [stream1, stream2, stream3]
  })

  it('should throw when param is not array', () => {
    (() => {
      concatStreams('123')
    }).should.throw(/Invaild stream array/)
  })

  it('should get null when array is empty', () => {
    should(concatStreams([])).be.null()
  })

  it('should pipe all data', (done) => {
    concatStreams(streams)

    setTimeout(() => {
      let result = new Array(10).fill('haha')
      result.should.eql(buffers)
      done()
    }, 1000)
  })

  it('should pipe all error down', (done) => {
    concatStreams(streams, 'error')

    stream2.on('error', (error) => {
      error.should.eql(new Error('jaja'))
    })

    stream3.on('error', (error) => {
      error.should.eql(new Error('jaja'))
      done()
    })

    stream1.emit('error', new Error('jaja'))
  })
})
