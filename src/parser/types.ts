
const gCodeParams = [
    // G0, G1 (linear move)
    "X", "Y", "Z",
    // G2, G3 (arc move)
    "I", "J",
    // Spindle & feedrate
    "P", "S", "F",
] as const

export type GCodeParam = typeof gCodeParams[number]



export type Command = {
    type: string
    params: Partial<Record<GCodeParam, number>>
}

