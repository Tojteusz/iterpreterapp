import useBoundStore from '@stores/useBoundStore'
import useCleanCode from '@hooks/useCleanCode'

const useSidebar = () => {
    const { playAnimation, isCodeCorrect, isAnimating, pauseAnimation, code } = useBoundStore([
        'playAnimation',
        'isCodeCorrect',
        'isAnimating',
        'pauseAnimation',
        'code',
    ])

    const { cleanCode } = useCleanCode()
    return { playAnimation, isCodeCorrect, isAnimating, pauseAnimation, cleanCode, code }
}

export default useSidebar
