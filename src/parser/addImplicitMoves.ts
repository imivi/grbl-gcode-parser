import { Command } from "./types"

// Add any implicit G0's and G1's
export function addImplicitMoves(commands: Command[][]) {
    let lastUsedType = "G0"

    // Check each line
    commands.forEach(commands => {
        // Check each command on a line
        commands.forEach(command => {
            if(command.type === "UNKNOWN") {
                command.type = lastUsedType
            }
            else if(command.type === "G0" || command.type === "G1")
                lastUsedType = command.type
        })
    })
    return commands
}

