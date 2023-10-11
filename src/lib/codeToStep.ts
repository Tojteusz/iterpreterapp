import { Command, StatementWord } from '@components/code/code.types'
import { Step } from '@/types/animation.types'

const calculateXY = (baseX: number, baseY: number, forward: number, directionInDegrees: number) => {
    // Convert degrees to radians
    const angleInRadians = (directionInDegrees * Math.PI) / 180

    // Calculate x and y using trigonometry
    const x = baseX + forward * Math.cos(angleInRadians)
    const y = baseY + forward * Math.sin(angleInRadians) // Subtracting because in most computer
    // graphics, the
    // y-axis is inverted.

    return { x, y }
}

const calculateRotationToXY = (baseX: number, baseY: number, targetX: number, targetY: number) => {
    const deltaX = targetX - baseX
    const deltaY = targetY - baseY
    const angleInRadians = Math.atan2(deltaY, deltaX)
    return (angleInRadians * 180) / Math.PI
}

const createNextStep = (newStep: {
    x: number
    y: number
    rotation: number
    duration: number
    prevStep: Step
}): Step => {
    return {
        ...newStep,
        color: newStep.prevStep.color,
        width: newStep.prevStep.width,
        draw: newStep.prevStep.draw,
    }
}

export const codeToSteps = (
    code: Command[],
    turtlePosition: {
        x: number
        y: number
    },
    direction: number,
    speed: number,
    theme: 'light' | 'dark'
): Step[] => {
    const steps: Step[] = [
        {
            x: turtlePosition?.x,
            y: turtlePosition?.y,
            rotation: direction,
            duration: 0,
            color: theme === 'dark' ? [256, 256, 256] : [0, 0, 0],
            width: 1,
            draw: false,
        },
    ]
    code.forEach((command) => {
        const prevStep = steps[steps.length - 1]
        switch (command.statement) {
            case StatementWord.forward: {
                if (!command.params) break
                const { x, y } = calculateXY(
                    prevStep.x,
                    prevStep.y,
                    command.params[0],
                    prevStep.rotation
                )
                steps.push(
                    createNextStep({
                        x,
                        y,
                        rotation: prevStep.rotation,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.backward: {
                if (!command.params) break
                const { x, y } = calculateXY(
                    prevStep.x,
                    prevStep.y,
                    command.params[0],
                    prevStep.rotation
                )
                steps.push(
                    createNextStep({
                        x,
                        y,
                        rotation: prevStep.rotation,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.direction: {
                if (!command.params) break
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: command.params[0],
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.turnleft: {
                if (!command.params) break
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: prevStep.rotation - command.params[0],
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.turnright: {
                if (!command.params) break
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: prevStep.rotation + command.params[0],
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.center: {
                const rot = calculateRotationToXY(
                    prevStep.x,
                    prevStep.y,
                    turtlePosition.x,
                    turtlePosition.y
                )
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                steps.push(
                    createNextStep({
                        x: turtlePosition.x,
                        y: turtlePosition.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.go: {
                if (!command.params) break
                const rot = calculateRotationToXY(
                    prevStep.x,
                    prevStep.y,
                    command.params[0],
                    command.params[1]
                )
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                steps.push(
                    createNextStep({
                        x: command.params[0],
                        y: command.params[1],
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.gox: {
                if (!command.params) break
                const rot = calculateRotationToXY(
                    prevStep.x,
                    prevStep.y,
                    command.params[0],
                    prevStep.y
                )
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                steps.push(
                    createNextStep({
                        x: command.params[0],
                        y: prevStep.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.goy: {
                if (!command.params) break
                const rot = calculateRotationToXY(
                    prevStep.x,
                    prevStep.y,
                    prevStep.x,
                    command.params[0]
                )
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: prevStep.y,
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                steps.push(
                    createNextStep({
                        x: prevStep.x,
                        y: command.params[0],
                        rotation: rot,
                        duration: speed,
                        prevStep,
                    })
                )
                break
            }
            case StatementWord.pendown: {
                steps.push({
                    ...prevStep,
                    draw: true,
                })
                break
            }
            case StatementWord.penup: {
                steps.push({
                    ...prevStep,
                    draw: false,
                })
                break
            }
            case StatementWord.pencolor: {
                if (!command.params) break
                steps.push({
                    ...prevStep,
                    color: [command.params[0], command.params[1], command.params[2]],
                })
                break
            }
            case StatementWord.penwidth: {
                if (!command.params) break
                steps.push({
                    ...prevStep,
                    width: command.params[0],
                })
                break
            }
        }
    })
    return steps
}
