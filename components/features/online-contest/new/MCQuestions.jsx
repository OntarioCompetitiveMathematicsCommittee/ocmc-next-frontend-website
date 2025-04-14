"use client"

import MathEditor from "./MathEditor";
import CompactList from "./CompactList";
import MathViewer from "./MathViewer";

// Allows editing of mc questions for online contests
const MCQuestions = ({mc_questions, setMcQuestions}) => (
    <CompactList
        elements={mc_questions}
        addElement={(setIndex) => {
            setIndex(mc_questions.length);
            setMcQuestions([...mc_questions, {
                question: "",
                options: ["", "", "", "", ""],
                answer: ""
            }])
        }}
        renderElement={(i, question, isOpen, setIndex) => (
            <div key={i} className="flex flex-col gap-0 pt-2 m-0">
                {/* Header (displays question #, and is also button for expanding/collapsing question) */}
                <button
                    type="button"
                    className={`${isOpen ? "bg-gray-100 rounded-b-none" : "bg-white"} p-2 w-full border-2 border-gray-200 rounded-md`}
                    onClick={() => {
                        setIndex(isOpen ? -1 : i);
                    }}
                >
                    <h1 className="text-xl text-center">MC Question {i+1}</h1>
                </button>

                {/* Expanded view */}
                { isOpen && (
                    <div className={`${isOpen && "border-2 border-gray-200 bg-white rounded-t-none"} w-full flex flex-col gap-1 p-4 rounded-md mt-[-2px]`}>
                        {/* Problem Statement */}
                        <label className="text-lg text-center pt-2">Problem Statement:</label>
                        <MathEditor
                            text={question.question}
                            setText={(text) => {
                                const newQuestions = mc_questions.slice();
                                newQuestions[i].question = text;
                                setMcQuestions(newQuestions);
                            }}
                        />
                        
                        {/* Answer options */}
                        <label className="text-lg text-center pt-4">Answers:</label>
                        <CompactList
                            elements={question.options}
                            renderElement={(optionIndex, option, isOptionOpen, setOptionIndex) => {
                                const optionLetter = String.fromCharCode(optionIndex + 'A'.charCodeAt(0));
                                const isCorrect = question.answer.charCodeAt(0) - 'A'.charCodeAt(0) === optionIndex;

                                return (
                                    <div key={optionIndex} className={`${isCorrect ? "bg-green-100" : "bg-white"} ${optionIndex === 0 && "rounded-t-md border-t-2"} ${optionIndex === question.options.length - 1 && "rounded-b-md border-b-2"} w-full flex border-x-2 border-y border-gray-200`}>
                                        {/* option letter + expander */}
                                        <button
                                            type="button"
                                            className={`${optionIndex === 0 && "rounded-tl-md border-t-2"} ${optionIndex === question.options.length - 1 && "rounded-bl-md border-b-2"} ml-[-2px] my-[-2px] p-2 border-2 border-blue-600 w-10 text-lg text-white flex items-center justify-center self-stretch bg-blue-500 hover:bg-blue-600`}
                                            onClick={() => {
                                                setOptionIndex(isOptionOpen ? -1 : optionIndex);
                                            }}
                                        >
                                            {optionLetter + ")"}
                                        </button>
                                        
                                        <div className="flex flex-grow gap-4 p-2 items-center">
                                            {/* Option editor */}
                                            <div className="w-full">
                                                { isOptionOpen ? (
                                                    <MathEditor
                                                        text={option}
                                                        setText={(text) => {
                                                            const newQuestions = mc_questions.slice();
                                                            newQuestions[i].options[optionIndex] = text;
                                                            setMcQuestions(newQuestions);
                                                        }}
                                                        editOnly
                                                    />
                                                ) : (
                                                    <MathViewer text={option} />
                                                )}
                                            </div>
                                        </div>

                                        
                                        {/* Mark as correct answer / Unmarking correct answer */}
                                            <button
                                            type="button"
                                            className={`${isCorrect ? "bg-blue-500 hover:bg-blue-600 border-blue-600" : "bg-emerald-600 hover:bg-emerald-700 border-emerald-700"} ${optionIndex === 0 && "rounded-tr-md border-t-2"} ${optionIndex === question.options.length - 1 && "rounded-br-md border-b-2"} mr-[-2px] my-[-2px] border-2 w-[120px] p-2 text-white transition-colors`}
                                            onClick={() => {
                                                const newQuestions = mc_questions.slice();
                                                newQuestions[i].answer = !isCorrect ? optionLetter : "";
                                                setMcQuestions(newQuestions);
                                            }}
                                        >
                                            {!isCorrect ? "Mark Correct" : "Unmark"}
                                        </button>
                                    </div>
                                );
                            }}
                        />

                        {/* Modify options */}
                        <div className="mt-4 p-2 flex gap-2">
                            {/* Delete question */}
                            <button
                                type="button"
                                className="px-4 py-2 text-white transition-colors rounded-md bg-red-500 hover:bg-red-600"
                                onClick={() => {
                                    const confirmDelete = window.confirm("Are you sure you want to delete? This action cannot be undone.");
                                    if (!confirmDelete) return;

                                    const newQuestions = mc_questions.filter((_, index) => index !== i);
                                    setMcQuestions(newQuestions);

                                    setIndex(-1);
                                }}
                            >
                                Delete
                            </button>

                            {/* Move Up */}
                            <button
                                type="button"
                                className={`${i !== 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} w-10 h-10 text-white transition-colors rounded-full`}
                                onClick={() => {
                                    if (i === 0) return;

                                    const newQuestions = mc_questions.slice();
                                    const temp = newQuestions[i];
                                    newQuestions[i] = newQuestions[i - 1];
                                    newQuestions[i - 1] = temp;
                                    setMcQuestions(newQuestions);
                                    setIndex(i - 1);
                                }}
                                disabled={i === 0}
                            >
                                ↑
                            </button>

                            {/* Move Down */}
                            <button
                                type="button"
                                className={`${i !== mc_questions.length - 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} w-10 h-10 text-white transition-colors rounded-full`}
                                onClick={() => {
                                    if (i === mc_questions.length - 1) return;

                                    const newQuestions = mc_questions.slice();
                                    const temp = newQuestions[i];
                                    newQuestions[i] = newQuestions[i + 1];
                                    newQuestions[i + 1] = temp;
                                    setMcQuestions(newQuestions);
                                    setIndex(i + 1);
                                }}
                                disabled={i === mc_questions.length - 1}
                            >
                                ↓
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
    />
)

export default MCQuestions;