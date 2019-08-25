# Nepali Number

Translations and formatting numbers in nepali (Devnagari) and english with unicode supports.

[![Version](https://img.shields.io/npm/v/nepali-number?logo=npm)](https://www.npmjs.com/package/nepali-number)
[![Twitter Follow](https://img.shields.io/twitter/follow/PuncozNepal?label=Follow&style=social)](https://twitter.com/PuncozNepal)

## Installation

Using NPM:
```
npm i nepali-number
```

or, using Yarn:

```
yarn add nepali-number
```

## Usage

### Import package
Using ES6 `import`:
```
import {
    englishToNepaliNumber,
    nepaliToEnglishNumber,
    
    nepaliNumberFormat,
    englishNumberFormat,
    
    nepaliAmountFormat,
    englishAmountFormat,
} from "nepali-number"
```

or, using commonJS `require`

```
const nepaliNumber = require('nepali-number')

nepaliNumber.englishToNepaliNumber("8848m")
```

#### 1. English number to nepali (Devnagari) unicode
Syntax: `englishToNepaliNumber(numberString: string | number)`

```
englishToNepaliNumber("12,34,56,789.01") // "१२,३४,५६,७८९.०१"
```

#### 2. Nepali (Devnagari) unicode to english
Syntax: `nepaliToEnglishNumber(numberString: string | number)`

```
nepaliToEnglishNumber("१२,३४,५६,७८९.०१") // "12,34,56,789.01"
```


#### 3. Formatting number to Nepali number system

Syntax: `nepaliNumberFormat(numberString: string | number, [locale: string])`
- locale: `en` for English and `ne` and Nepali (Devnagari). Default to `en`

```
nepaliNumberFormat("१२३४५६७८९") // "12,34,56,789"
nepaliNumberFormat("१२३४५६७८९", "ne") // "१२,३४,५६,७८९"

nepaliNumberFormat("123456789") // "12,34,56,789"
nepaliNumberFormat("123456789", "ne") // "१२,३४,५६,७८९"
```


#### 4. Formatting number to English number system

Syntax: `englishNumberFormat(numberString: string | number, [locale: string])`
- locale: `en` for English and `ne` and Nepali (Devnagari). Default to `en`

```
englishNumberFormat("१२३४५६७८९") // "123,456,789"
englishNumberFormat("१२३४५६७८९", "ne") // "१२३,४५६,७८९"

englishNumberFormat("123456789") // "123,456,789"
englishNumberFormat("123456789", "ne") // "१२३,४५६,७८९"
```


#### 5. Formatting amount (number with precision) to Nepali number system

Syntax: `nepaliAmountFormat(numberString: string | number, [precision: number], [locale: string])`
- precision: Default to `2`
- locale: `en` for English and `ne` and Nepali (Devnagari). Default to `en`

```
nepaliAmountFormat("१२३४५६७८९.०१५४") // "12,34,56,789.02"
nepaliAmountFormat("१२३४५६७८९.०१५४", 3, "ne") // "१२,३४,५६,७८९.०१५"

nepaliAmountFormat("123456789.0154") // "12,34,56,789.02"
nepaliAmountFormat("123456789.0154", 3, "ne") // "१२,३४,५६,७८९.०१५"
```


#### 6. Formatting amount (number with precision) to English number system

Syntax: `englishAmountFormat(numberString: string | number, [precision: number], [locale: string])`
- precision: Default to `2`
- locale: `en` for English and `ne` and Nepali (Devnagari). Default to `en`

```
englishAmountFormat("१२३४५६७८९.०१५४") // "123,456,789.02"
englishAmountFormat("१२३४५६७८९.०१५४", 3, "ne") // "१२३,४५६,७८९.०१५"

englishAmountFormat("123456789.0154") // "123,456,789.02"
englishAmountFormat("123456789.0154", 3, "ne") // "१२३,४५६,७८९.०१५"
```

