import { ReactElement } from 'react'
import { StatementWord } from '@components/code/code.types'
import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    BorderWidthIcon,
    ColorWheelIcon,
    Cross2Icon,
    DiscIcon,
    DotsHorizontalIcon,
    DotsVerticalIcon,
    Pencil1Icon,
    Pencil2Icon,
    TargetIcon,
} from '@radix-ui/react-icons'

interface Info {
    description: string
    icon: ReactElement
    group: StatementGroup
}

export enum StatementGroup {
    Movement = 'Movement',
    Turn = 'Turn',
    Pen = 'Pen',
}

export default Info

export const statementInfo = new Map<StatementWord, Info>([
    [
        StatementWord.center,
        {
            description: 'move the turtle to the center of the canvas',
            icon: <Cross2Icon />,
            group: StatementGroup.Movement,
        },
    ],
    [
        StatementWord.forward,
        {
            description: 'move the turtle forward X units',
            icon: <ArrowUpIcon />,
            group: StatementGroup.Movement,
        },
    ],
    [
        StatementWord.backward,
        {
            description: 'move the turtle backward X units',
            icon: <ArrowDownIcon />,
            group: StatementGroup.Movement,
        },
    ],
    [
        StatementWord.pendown,
        {
            description: 'turtle starts drawing',
            icon: <Pencil1Icon />,
            group: StatementGroup.Pen,
        },
    ],
    [
        StatementWord.penup,
        {
            description: 'turtle stops drawing',
            icon: <Pencil2Icon />,
            group: StatementGroup.Pen,
        },
    ],
    [
        StatementWord.turnright,
        {
            description: 'turn the turtle right D degrees',
            icon: <ArrowRightIcon />,
            group: StatementGroup.Turn,
        },
    ],
    [
        StatementWord.turnleft,
        {
            description: 'turn the turtle left D degrees',
            icon: <ArrowLeftIcon />,
            group: StatementGroup.Turn,
        },
    ],
    [
        StatementWord.goy,
        {
            description: 'move the turtle vertically to a specified Y -coordinate',
            icon: <DotsVerticalIcon />,
            group: StatementGroup.Movement,
        },
    ],
    [
        StatementWord.direction,
        {
            description: `set the turtle's direction to a D angle`,
            icon: <DiscIcon />,
            group: StatementGroup.Turn,
        },
    ],
    [
        StatementWord.pencolor,
        {
            description: `change the turtle's pen color`,
            icon: <ColorWheelIcon />,
            group: StatementGroup.Pen,
        },
    ],
    [
        StatementWord.penwidth,
        {
            description: `set the width of the turtle's pen`,
            icon: <BorderWidthIcon />,
            group: StatementGroup.Pen,
        },
    ],
    [
        StatementWord.go,
        {
            description: 'move the turtle to specific X,Y coordinates ',
            icon: <TargetIcon />,
            group: StatementGroup.Movement,
        },
    ],
    [
        StatementWord.gox,
        {
            description: 'move the turtle horizontally to a specified X -coordinate',
            icon: <DotsHorizontalIcon />,
            group: StatementGroup.Movement,
        },
    ],
])
