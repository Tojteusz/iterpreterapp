export enum StatementWord {
    turnleft = 'turnleft',
    turnright = 'turnright',
    forward = 'forward',
    backward = 'backward',
    penup = 'penup',
    pendown = 'pendown',
    go = 'go',
    gox = 'gox',
    penwidth = 'penwidth',
    pencolor = 'pencolor',
    center = 'center',
    direction = 'direction',
    goy = 'goy',
}

export enum ParamType {
    X,
    Y,
    W,
    D,
    R,
    G,
    B,
}

export interface Command {
    statement?: StatementWord
    params?: number[]
    text: string[]
    error: boolean
    line: number
    id: string
}

export const statementMap = new Map<StatementWord, ParamType[]>([
    [StatementWord.turnleft, [ParamType.D]],
    [StatementWord.turnright, [ParamType.D]],
    [StatementWord.direction, [ParamType.D]],
    [StatementWord.pencolor, [ParamType.R, ParamType.G, ParamType.B]],
    [StatementWord.penwidth, [ParamType.W]],
    [StatementWord.penup, []],
    [StatementWord.pendown, []],
    [StatementWord.forward, [ParamType.Y]],
    [StatementWord.backward, [ParamType.Y]],
    [StatementWord.center, []],
    [StatementWord.go, [ParamType.X, ParamType.Y]],
    [StatementWord.gox, [ParamType.X]],
    [StatementWord.goy, [ParamType.Y]],
])

export const paramColorMap = new Map<ParamType, string>([
    [ParamType.B, 'text-sky-500'],
    [ParamType.G, 'text-lime-500'],
    [ParamType.R, 'text-red-500'],
    [ParamType.X, 'text-rose-700'],
    [ParamType.Y, 'text-indigo-700'],
    [ParamType.D, 'text-teal-500'],
    [ParamType.W, 'text-green-500'],
])
