import { addImplicitMoves } from "./parser/addImplicitMoves"
import { parseWords } from "./parser/parseWords"
import { removeComments } from "./parser/removeComments"
import { parseTokens, parseLineCommand } from "./parser/parser"

// Re-export types
export type { Command, GCodeParam } from "./parser/types"

export type Options = {
    addImplicitMoves?: boolean
    flatten?: boolean
}

const defaultOptions: Options = {
    addImplicitMoves: true,
    flatten: true,
}

export function parseGcode(lines: string[], options=defaultOptions) {

    let commands = removeComments(lines)
        // Parse words
        .map(str => parseWords(str))
        // Parse tokens into [string, value] pairs
        .map(words => parseTokens(words))
        // Parse commands
        .map(tokens => parseLineCommand(tokens))
    
    if(options?.addImplicitMoves) {
        commands = addImplicitMoves(commands)
    }

    if(options?.flatten) {
        return commands.flat()
    }
    else {
        return commands
    }
}
