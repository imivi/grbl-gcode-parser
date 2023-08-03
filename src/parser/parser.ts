
// const validGcodeLetters = ["G", "M", "X", "Y", "Z"] as const
// const validGcodeLettersSet = new Set(validGcodeLetters)
// type GcodeLetter = typeof validGcodeLetters

// type GcodeLetter = "G" | "M" | "X" | "Y" | "Z"
// const validGcodeLetters = new Set(["G","M","X","Y","Z"])

// type Token = {
//     type: string
//     value: number
// }

type Token = {
    letter: string
    value: number
}

export function parseToken(input: string): Token {
    const letter = input[0]

    // if(!validGcodeLetters.has(letter)) {
    //     throw Error("Error: invalid gcode letter: "+letter)
    // }
    
    let digits = input.slice(1)

    // Remove any trailing dot
    if(digits.endsWith(".")) {
        digits = digits.slice(0,-1)
    }

    const value = Number(digits)

    return { letter, value }
    // return {
    //     type: letter,
    //     value
    // }
}

/**
 * Convert gcode words (from a single line) to arrays of tokens
 * @param input - gcode words
 * @returns tokens (split letter and value)
 */
export function parseTokens(input: string[]): Token[] {
    return input.map(token => parseToken(token))
}


export type Command = {
    type: string
    params: Record<string,number>
}


/**
 * Parses a single gcode line composed of multiple tokens
 * (each representing a command type [G0, G1, etc] or values [X, Y, Z, etc...])
 * @param tokens 
 * @returns 
 */
export function parseLineCommand(tokens: Token[]): Command[] {

    const commands: Command[] = []

    // let type = "UNKNOWN"
    // let params: Record<string, number> = {}
    let command: Command | null = null

    tokens.forEach(token => {
        const { letter, value } = token

        // If a G or M is found, create a new command
        if(letter === "G" || letter === "M") {
            // Flush current command & then reset it
            if(command !== null) {
                const { type, params } = command
                commands.push({ type, params })
                command = null
            }
            command = {
                type: letter+value.toString(),
                params: {},
            }
        }

        // If a parameter is found (not G or M), add it to the existing commmand (create it if necessary)
        else {
            if(command === null) {
                command = {
                    type: "UNKNOWN",
                    params: {},
                }
            }
            command.params[letter] = value
        }
    })

    // Flush remaining command
    if(command !== null) {
        commands.push(command)
    }

    // return { type, params }
    return commands
}