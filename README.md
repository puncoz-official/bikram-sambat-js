# Bikram Sambat

Utility library to convert date in AD (Gregorian) to Nepali date format BS (Bikram sambat) and vice versa.

[![Version](https://img.shields.io/npm/v/bikram-sambat-js?logo=npm)](https://www.npmjs.com/package/bikram-sambat-js)
[![Twitter Follow](https://img.shields.io/twitter/follow/PuncozNepal?label=Follow&style=social)](https://twitter.com/PuncozNepal)

## Installation

Using NPM:
```
npm i bikram-sambat-js
```

or, using Yarn:

```
yarn add bikram-sambat-js
```

## Usage

### Import package
Using ES6 `import`:
```
import BikramSambat, {ADToBS, BSToAD}  from "bikram-sambat-js"
```

or, using commonJS `require`

```
const BS = require('bikram-sambat-js')

BS.ADToBS("2019-08-25")
```

#### 1. BS to AD conversion
Syntax: `BSToAD(date: string): string`

```
BSToAD("2076-05-08") // "2019-08-25"
```

or,

```
new BikramSambat('2076-05-08', 'BS').toAD()
```

#### 2. AD to BS conversion
Syntax: `ADToBS(date: Date | string): string`

```
ADToBS("2019-08-25") // "2076-05-08"
```

or,

```
new BikramSambat('2019-08-25').toBS()
```
