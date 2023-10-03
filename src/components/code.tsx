import {Card} from "@ui/card.tsx";
import {useEffect, useRef} from "react";

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
    const divRef = useRef<HTMLDivElement | null>(null);

    /*    const removeTags = (str: string) => {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();

            // Regular expression to identify HTML tags in
            // the input string. Replacing the identified
            // HTML tag with a null string.
            return str.replace(/(<([^>]+)>)/ig, '');
        }*/

    const getTextSegments = (element: HTMLElement | ChildNode) => {
        const textSegments: TextSegment[] = [];
        Array.from(element.childNodes).forEach((node) => {
            switch (node.nodeType) {
                case Node.TEXT_NODE:
                    textSegments.push({text: node.nodeValue, node});
                    break;

                case Node.ELEMENT_NODE:
                    /*   if (node.nodeName === 'DIV') {
                           textSegments.push({text: " <br/> ", node})
                       }*/
                    textSegments.splice(textSegments.length, 0, ...(getTextSegments(node)));
                    break;

                default:
                    throw new Error(`Unexpected node type: ${node.nodeType}`);
            }
        });
        return textSegments;
    }

    useEffect(() => {
        function updateEditor() {
            const sel = window.getSelection();
            if (!divRef.current) return;

            console.log(sel)
            console.log("Begin ===========")
            const textSegments = getTextSegments(divRef.current);
            const textContent = textSegments.map(({text}) => text).join('');
            let anchorIndex = 0;
            let focusIndex = 0;
            let currentIndex = 0;
            console.log(textSegments)
            textSegments.forEach(({text, node}) => {
                if (node === sel?.anchorNode) {
                    anchorIndex = currentIndex + sel.anchorOffset;
                }
                if (node === sel?.focusNode) {
                    focusIndex = currentIndex + sel.focusOffset;
                }
                if (!text) return;
                currentIndex += text.length;
            });

            divRef.current.innerHTML = renderText(textContent);

            restoreSelection(anchorIndex, focusIndex);
        }

        function restoreSelection(absoluteAnchorIndex: number, absoluteFocusIndex: number) {
            if (!divRef.current) return;
            const sel = window.getSelection();
            const textSegments = getTextSegments(divRef.current);
            let anchorNode = divRef.current;
            let anchorIndex = 0;
            let focusNode = divRef.current;
            let focusIndex = 0;
            let currentIndex = 0;
            textSegments.forEach(({text, node}) => {
                const startIndexOfNode = currentIndex;
                const endIndexOfNode = startIndexOfNode + text.length;
                if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
                    anchorNode = node;
                    anchorIndex = absoluteAnchorIndex - startIndexOfNode;
                }
                if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
                    focusNode = node;
                    focusIndex = absoluteFocusIndex - startIndexOfNode;
                }
                if (!text) return;
                currentIndex += text.length;
            });

            sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
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
                //  console.log(word)
                if (word === '<br/>') return '</div><div>'
                if (Object.values(StatementWord).includes(word as StatementWord)) {
                    return `<span class="text-cyan-400">${word}</span>`;
                } else if (isNumeric(word)) {
                    return `<span class="text-green-400">${word}</span>`;
                } else {
                    return `<span class="text-red-600">${word}</span>`;
                }
                /*  if (word === 'bold') {
                      return `<strong>${word}</strong>`;
                  } else if (word === 'red') {
                      return `<span style='color:red'>${word}</span>`;
                  } else {
                      return word;
                  }*/
            })

            return output.join('');
        }


        // The function to execute whenever the content of the div changes
        const handleInput = () => {
            /*  if (divRef.current)
                  console.log(removeTags(divRef.current.innerHTML));
              // You can also use divRef.current.textContent if you just want the text without HTML
        */
        };

        // Attach the event listener
        if (!divRef.current) return;
        divRef.current.addEventListener('input', handleInput);
        divRef.current.addEventListener('input', updateEditor);

        updateEditor();

        // Clean up the event listener when the component is unmounted
        return () => {
            if (!divRef.current) return;
            divRef.current.removeEventListener('input', handleInput);
            divRef.current?.removeEventListener('input', updateEditor)
        };
    }, []);
    return (
        <>
            <Card
                className="h-full overflow-hidden">
                <div contentEditable={true}
                     spellCheck={false}
                     ref={divRef}
                     className="h-full p-6 border-0 border-opacity-100 border-orange-400">
                    {`turnleft 90 
            forward 100 \n
            turnright 90
            forward 100
            penup
            backward 100
            center`}
                    <span className="text-cyan-400">pendown</span>{`
            go 100 100
            gox 100
            penwidth 10
            pencolor 200 100 100`}
                </div>
            </Card>
        </>
    )
}
export default Code