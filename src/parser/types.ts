
const gCodeParams = [
    "X", "Y", "Z",
    "P", "S", "F",
] as const

export type GCodeParam = typeof gCodeParams[number]



export type Command = {
    type: string
    params: Partial<Record<GCodeParam, number>>
}

