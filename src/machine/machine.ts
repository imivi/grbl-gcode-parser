import { GCode } from "./gcodes"
import { Command } from "../parser/parser"
import { gcodeHandlers } from "./gcodeHandlers"




export class Vector3 {

    x: number
    y: number
    z: number

    constructor(x?: number, y?: number, z?: number) {
        this.x = x || 0
        this.y = y || 0
        this.z = z || 0
    }
}



const ZERO: Vector3 = Object.freeze(new Vector3(0,0,0))




export class Machine {

    /** The current tool position */
    position: Vector3 = ZERO

    /** The current home position (for GRBL firmware) */
    home: Vector3 = ZERO
    /** The current distance mode: 'ABSOLUTE' or 'RELATIVE' */
    distanceMode: "ABSOLUTE" | "RELATIVE" = "ABSOLUTE"
    /** The current travel mode: 'G0' or 'G1' */
    travelMode: "G0" | "G1" = "G0"

    unitsMode: "MM" | "INCHES"  = "MM"

    spindleState: "CW" | "CCW" | "STOP" = "STOP"

    /** The current feedrate */
    feedRate = 0
    
    /** The current Vector3 of the extrusion axis (for 3D printing) */
    extruderVector3 = 0
    
    /** The current power of the laser: between 0 and 1 (for laser cutting) */
    laserPower = 0

    /** The spindle speed in revolutions per minute (for CNC) */
    spindleSpeed = 0

    running = false

    processGcode(command: Command) {
        const code = command.type as GCode
        const handler = gcodeHandlers[code]
        handler(command, this)
    }

    moveTo(newVector3: Vector3) {
        const { x, y, z } = newVector3
        this.position.x = x
        this.position.y = y
        this.position.z = z
    }

    moveBy(distance: Vector3) {
        const { x, y, z } = distance
        this.position.x += x
        this.position.y += y
        this.position.z += z
    }

}
