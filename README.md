
# GRBL G-Code Parser

[![NPM badge](https://github.com/imivi/grbl-gcode-parser/blob/main/docs/badge_npm.svg?raw=true)](https://www.npmjs.com/package/grbl-gcode-parser)

![GRBL G-Code Parser Banner](https://github.com/imivi/grbl-gcode-parser/blob/main/docs/banner.png?raw=true)

Parse G-Code strings into JS objects. Works in the browser. For example:

**input**

```
G90
G21
G17 G64 P0.001 M3 S3000
F127.0
G0 Z6.350
G0 X-16.922 Y-12.459
```

**output**

```js
[
    { "type": "G90",  "params": {} },
    { "type": "G21",  "params": {} },
    { "type": "G17",  "params": {} },
    {
        "type": "G64",
        "params": {
            "P": 0.001
        }
    },
    {
        "type": "M3",
        "params": {
            "S": 3000
        }
    },
    {
        "type": "G0",
        "params": {
            "F": 127
        }
    },
    {
        "type": "G0",
        "params": {
            "Z": 6.35
        }
    },
    {
        "type": "G0",
        "params": {
            "X": -16.922,
            "Y": -12.459
        }
    },
]
```

## How to use

`npm install grbl-gcode-parser`

```js
import { parseGcode } from "grbl-gcode-parser"

const gcode = [
    "G90",
    "G21",
    "G17 G64 P0.001 M3 S3000",
]
const commands = parseGcode(gcode, options)
```

You can customize the output with a few options:

```js
const options = {
    addImplicitMoves: true, // If a line has a missing G0 or G1, infer it from the previous lines
    flatten: true, // If true, the commands are returned as an array of objects. If false, parseGcode() will return an array of arrays (each line is an array of commands).
}
const commands = parseGcode(gcode, options)
```