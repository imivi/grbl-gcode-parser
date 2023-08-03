

/**
 * Filters the lines, removing any comments
 * @param lines of gcode
 * @returns 
 */
export function removeComments(lines: string[]) {
    return lines
        .filter(line => line.length>1 && !line.startsWith("("))
        .map(line => lines.includes(";") ? line.split(";")[0] : line)
}