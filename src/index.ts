import { addImplicitMoves } from "./parser/addImplicitMoves"
import { parseWords } from "./parser/parseWords"
import { removeComments } from "./parser/removeComments"
import { parseTokens, parseLineCommand } from "./parser/parser"

// Export types
import type { Command, GCodeParam } from "./parser/types"
export {
    Command,
    GCodeParam,
}

export function parseGcode(lines: string[]) {

    const commands = removeComments(lines)
        // Parse words
        .map(str => parseWords(str))
        // Parse tokens into [string, value] pairs
        .map(words => parseTokens(words))
        // Parse commands
        .map(tokens => parseLineCommand(tokens))

    const output = addImplicitMoves(commands.flat())

    return output
}
