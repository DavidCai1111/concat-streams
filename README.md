# concat-streams
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/DavidCai1993/concat-streams.svg?branch=master)](https://travis-ci.org/DavidCai1993/concat-streams)
[![Coverage Status](https://coveralls.io/repos/github/DavidCai1993/concat-streams/badge.svg?branch=master)](https://coveralls.io/github/DavidCai1993/concat-streams?branch=master)

Concat streams by piping and pass the `error` event through to the end.

## Installation

```sh
npm install concat-streams
```

## Usage

```js
'use strict'
const concatStream = require('concat-streams')

concatStream([stream1, stream2, stream3])
// Equal to:
// stream1.pipe(stream2)
// stream2.pipe(stream3)
// stream1.on('error', (err) => stream2.emit(err))
// stream2.on('error', (err) => stream3.emit(err))
```

## API

### concatStream(streams)

  - streams: `Array`<`stream`> an array of streams

Concat all streams in array by `pipe` and once an error occurred in one stream, all streams after will get it. Return the last stream in the array.
