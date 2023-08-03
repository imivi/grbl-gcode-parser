import { Command, parseLineCommand, parseTokens } from "./parser"


describe("Parse tokens", () => {

    const input = ["G17", "G20", "G90", "G94", "G54", "G01", "X0.", "G1", "Y2.997"]
    
    const output = [
        { letter: "G", value: 17},
        { letter: "G", value: 20},
        { letter: "G", value: 90},
        { letter: "G", value: 94},
        { letter: "G", value: 54},
        { letter: "G", value: 1},
        { letter: "X", value: 0},
        { letter: "G", value: 1},
        { letter: "Y", value: 2.997},
    ]

    test(`Parse token values`, () => {
        expect(parseTokens(input)).toMatchObject(output)
    })
})

describe("Parse line into command", () => {

    // const input = ["G01", "X0.", "Y2.997"]

    const input = [
        { letter: "G", value: 1},
        { letter: "X", value: 0},
        { letter: "Y", value: 2.997},
    ]

    const output: Command[] = [
        {
            type: "G1",
            params: {
                X: 0,
                Y: 2.997,
            }
        }
    ]
    
    test(`Parse line with single command`, () => {
        expect(parseLineCommand(input)).toMatchObject(output)
    })


    // const input = ["G01", "X0.", "Y2.997"]

    // G17 G64 P0.001 M3 S3000
    const input2 = [
        { letter: "G", value: 17 },
        { letter: "G", value: 64 },
        { letter: "P", value: 0.001 },
        { letter: "M", value: 3 },
        { letter: "S", value: 3000 },
    ]

    const output2: Command[] = [
        {
            type: "G17",
            params: {},
        },
        {
            type: "G64",
            params: {
                P: 0.001,
            },
        },
        {
            type: "M3",
            params: {
                S: 3000,
            },
        },
    ]
    
    test(`Parse line with multiple commands`, () => {
        expect(parseLineCommand(input2)).toMatchObject(output2)
    })



    // G17 G64 P0.001 M3 S3000
    const input3 = [
        { letter: "F", value: 127 },
    ]

    const output3: Command[] = [
        {
            type: "UNKNOWN",
            params: {
                F: 127,
            },
        },
    ]
    
    test(`Parse line without G or M`, () => {
        expect(parseLineCommand(input3)).toMatchObject(output3)
    })



    // G17 G64 P0.001 M3 S3000
    const input4 = [
        { letter: "G", value: 17 },
    ]

    const output4: Command[] = [
        {
            type: "G17",
            params: {},
        },
    ]
    
    test(`Parse line with only G`, () => {
        expect(parseLineCommand(input4)).toMatchObject(output4)
    })
})
