import { parseWords } from "./parseWords"


describe("Tokenize", () => {

    const data = {
        "G17 G20 G90 G94 G54":          ["G17", "G20", "G90", "G94", "G54"],
        "G0 Z0.25":                     ["G0", "Z0.25"],
        "X-0.5 Y0.":                    ["X-0.5", "Y0."],
        "Z0.1":                         ["Z0.1"],
        "G01 Z0. F5.":                  ["G01", "Z0.", "F5."],
        "G02 X0. Y0.5 I0.5 J0. F2.5":   ["G02", "X0.", "Y0.5", "I0.5", "J0.", "F2.5"],
        "X0. Y-0.5 I-0.5 J0.":          ["X0.", "Y-0.5", "I-0.5", "J0."],
        "X-0.5 Y0. I0. J0.5":           ["X-0.5", "Y0.", "I0.", "J0.5"],
        "G01 Z0.1 F5.":                 ["G01", "Z0.1", "F5."],
        "G00 X0. Y0. Z0.25":            ["G00", "X0.", "Y0.", "Z0.25"],
    }

    Object.entries(data).forEach((inputOutput,i) => {
        const [input,output] = inputOutput
        test(`Tokenize gcode string #${i+1}`, () => {
            expect(parseWords(input)).toMatchObject(output)
        })
    })
})
