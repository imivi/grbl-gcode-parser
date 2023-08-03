
// https://github.com/gnea/grbl/blob/master/doc/markdown/commands.md#g---view-gcode-parser-state
// https://linuxcnc.org/docs/html/gcode/g-code.html
// https://linuxcnc.org/docs/html/gcode/m-code.html
// https://machmotion.com/blog/knowledge-g-code/

import { Command } from "../parser/types"
import { GCode } from "./gcodes"
import { Machine, Vector3 } from "./machine"


type GCodeHandler = (command: Command, machine: Machine) => void


/**
 * Functions that modify the machine state (m)
 * depending on a give GCode command (c).
 * 
 * Key: GCode (string)
 * 
 * Value: (c: Command, m: Machine) => void
 */
export const gcodeHandlers: Record<GCode, GCodeHandler> = {

    // Moves
    G0: (c, m) => {
        m.travelMode = "G0"
        m.feedRate = c.params?.F || m.feedRate
        moveHandler(c, m)
    },
    G1: (c, m) => {
        m.travelMode = "G1"
        m.feedRate = c.params?.F || m.feedRate
        moveHandler(c, m)
    },

    // Units mode
    G20: (c, m) => {
        m.unitsMode = "INCHES"
    },
    G21: (c, m) => {
        m.unitsMode = "MM"
    },

    // Distance mode
    G90: (c, m) => {
        m.distanceMode = "ABSOLUTE"
    },
    G91: (c, m) => {
        m.distanceMode = "RELATIVE"
    },

    // Pause/end program
    M0:         (c, m) => {}, // pause
    M1:         (c, m) => {}, // pause
    M2:         (c, m) => {}, // end program
    M30:        (c, m) => { m.running = false }, // end program

    // Spindle
    M3: (c, m) => {
        m.spindleState = "CW"
        m.spindleSpeed = c.params?.S || 0
    },
    M4: (c, m) => {
        m.spindleState = "CCW"
        m.spindleSpeed = c.params?.S || 0
    },
    M5: (c, m) => {
        m.spindleState = "STOP"
        m.spindleSpeed = c.params?.S || 0
    },

    // Coolant
    M7:         (c, m) => {}, // mist ON
    M8:         (c, m) => {}, // flood ON
    M9:         (c, m) => {}, // coolant OFF

    // Manual tool change
    M6:         (c, m) => {},

    "G38.2":    (c, m) => {},
    "G38.3":    (c, m) => {},
    "G38.4":    (c, m) => {},
    "G38.5":    (c, m) => {},
    G17:        (c, m) => {},
    G18:        (c, m) => {},
    G19:        (c, m) => {},
    G2:         (c, m) => {},
    G3:         (c, m) => {},
    G40:        (c, m) => {},
    "G43.1":    (c, m) => {},
    G49:        (c, m) => {},
    G54:        (c, m) => {},
    G55:        (c, m) => {},
    G56:        (c, m) => {},
    G57:        (c, m) => {},
    G58:        (c, m) => {},
    G59:        (c, m) => {},
    G80:        (c, m) => {},
    "G91.1":    (c, m) => {},
    G93:        (c, m) => {},
    G94:        (c, m) => {},
    M56:        (c, m) => {},
}

const moveHandler: GCodeHandler = (c, m) => {
    const { X=0, Y=0, Z=0 } = c.params
    let distance = new Vector3(X, Y, Z)
    if(m.unitsMode === "INCHES") {
        distance = inchesToMm(distance)
    }
    if(m.distanceMode === "ABSOLUTE") {
        m.moveTo(distance)
    }
    else {
        m.moveBy(distance)
    }
}


const MM_IN_INCHES = 25.4

function inchesToMm(vector: Vector3) {
    const { x, y, z } = vector
    return new Vector3(
        x / MM_IN_INCHES,
        y / MM_IN_INCHES,
        z / MM_IN_INCHES,
    )
}
