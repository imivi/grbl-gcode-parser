const gcodes = [
    // Motion Mode
    "G0", "G1", "G2", "G3", "G38.2", "G38.3", "G38.4", "G38.5", "G80", 
    // Coordinate System Select
    "G54", "G55", "G56", "G57", "G58", "G59",
    // Plane Select
    "G17", "G18", "G19", 
    // Distance Mode
    "G90", "G91", 
    // Arc IJK Distance Mode
    "G91.1",
    // Feed Rate Mode
    "G93", "G94",
    // Units Mode
    "G20", "G21", 
    // Cutter Radius Compensation
    "G40",
    // Tool Length Offset
    "G43.1", "G49",
    // Program Mode
    "M0", "M1", "M2", "M30", 
    // Spindle State
    "M3", "M4", "M5", 
    // Manual tool change
    "M6",
    // Coolant State
    "M7", "M8", "M9", 
    // Override Control
    "M56", 
    // Misc
    "M30",
] as const

export type GCode = typeof gcodes[number]