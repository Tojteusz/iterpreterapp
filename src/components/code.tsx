import {Card} from "@ui/card.tsx";
import {ChangeEvent, useEffect, useRef} from "react";

interface TextSegment {
    text: string | null;
    node: Node;
}

enum StatementWord {
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

const Code = () => {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const className = `p-6 font-mono w-full h-full text-base outline-none resize-none whitespace-break-spaces`

    const codeRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        codeRef.current
    }, []);

    const syncScroll = () => {
        codeRef.current.scrollTop = textRef.current.scrollTop
    }
    const handleChangeText = (element: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(element.target.value);
        if (!codeRef.current) return;
        let text = element.target.value
        text = text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
        text = renderText(text)
        codeRef.current.innerHTML = text;
        syncScroll();
    }

    function isNumeric(value: string) {
        return !Number.isNaN(Number(value));
    }

    function renderText(text: string) {
        const words = text.split(/(\s+)/);

        console.log(words)
        // console.log("BEGIN ============================")
        let output: string[] = ["<div>"]
        output = words.map((word) => {

            if (Object.values(StatementWord).includes(word as StatementWord)) {
                return `<span class="text-cyan-400">${word}</span>`;
            } else if (isNumeric(word)) {
                return `<span class="text-green-400">${word}</span>`;
            } else {
                return `<span class="text-red-600 underline">${word}</span>`;
            }

        })

        return output.join('');
    }


    return (
        <>
            <Card
                className="h-full overflow-hidden relative">


                <textarea onChange={handleChangeText}
                          onScroll={syncScroll}
                          spellCheck={false}
                          ref={textRef}

                          className={`z-20 relative caret-purple-700 bg-transparent text-transparent border-0 ${className}`}/>
                <div aria-hidden={true}
                     ref={codeRef}
                     className={`absolute top-0 left-0 z-0 overflow-y-auto break-words ${className}`}
                />

            </Card>
        </>
    )
}
export default Code