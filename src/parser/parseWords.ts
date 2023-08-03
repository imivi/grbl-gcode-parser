
const LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

function isLetter(str: string): boolean {
    return LETTERS.has(str)
    // return str.match(/[A-Z]/i) !== null
}


export function parseWords(line: string): string[] {


    const tokens = []

    let currentToken = ""

    let chars = line.toUpperCase().replaceAll(" ", "")
    for(const char of chars) {
        // When a letter is found, flush the current token
        // When a non-letter is found, add to current token
        if(isLetter(char) && currentToken != "") {
            tokens.push(currentToken)
            currentToken = ""
        }
        currentToken += char
    }

    // Flush leftover token (if any)
    if(currentToken != "") {
        tokens.push(currentToken)
    }
    
    return tokens
}

export function parseWordsFromLines(lines: string[]) {
    return lines.map(line => parseWords(line))
}


