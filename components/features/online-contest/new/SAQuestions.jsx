"use client"

import MathEditor from "./MathEditor";
import CompactList from "./CompactList";

// Allows editing of short answer questions for online contests
const SAQuestions = ({sa_questions, setSAQuestions}) => (
    <CompactList
        elements={sa_questions}
        addElement={(setIndex) => {
            setIndex(sa_questions.length);
            setSAQuestions([...sa_questions, {
                question: "",
                answer: 0
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
                    <h1 className="text-xl text-center">Short Answer Question {i+1}</h1>
                </button>

                {/* Expanded view */}
                { isOpen && (
                    <div className={`${isOpen && "border-2 border-gray-200 bg-white rounded-t-none"} w-full flex flex-col gap-1 p-4 rounded-md mt-[-2px]`}>
                        {/* Problem Statement */}
                        <label className="text-lg text-center pt-2">Problem Statement:</label>
                        <MathEditor
                            text={question.question}
                            setText={(text) => {
                                const newQuestions = sa_questions.slice();
                                newQuestions[i].question = text;
                                setSAQuestions(newQuestions);
                            }}
                        />
                        
                        {/* Correct Answer */}
                        <div className="p-2 flex gap-2 w-full">
                            <label className="text-lg">Correct Answer: </label>
                            <input
                                className="bg-white w-10 px-1 border-2 border-gray-300 rounded-md text-lg"
                                type="text"
                                onChange={(e) => {
                                    const number = parseInt(e.target.value);

                                    if (isNaN(number) || number < 0 || number > 999) return;

                                    const newQuestions = sa_questions.slice();
                                    newQuestions[i].answer = number;
                                    setSAQuestions(newQuestions);
                                }}
                                value={question.answer}
                            />
                        </div>

                        {/* Modify options */}
                        <div className="mt-4 p-2 flex gap-2">
                            {/* Delete question */}
                            <button
                                type="button"
                                className="px-4 py-2 text-white transition-colors rounded-md bg-red-500 hover:bg-red-600"
                                onClick={() => {
                                    const confirmDelete = window.confirm("Are you sure you want to delete? This action cannot be undone.");
                                    if (!confirmDelete) return;

                                    const newQuestions = sa_questions.filter((_, index) => index !== i);
                                    setSAQuestions(newQuestions);

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

                                    const newQuestions = sa_questions.slice();
                                    const temp = newQuestions[i];
                                    newQuestions[i] = newQuestions[i - 1];
                                    newQuestions[i - 1] = temp;
                                    setSAQuestions(newQuestions);
                                    setIndex(i - 1);
                                }}
                                disabled={i === 0}
                            >
                                ↑
                            </button>

                            {/* Move Down */}
                            <button
                                type="button"
                                className={`${i !== sa_questions.length - 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500"} w-10 h-10 text-white transition-colors rounded-full`}
                                onClick={() => {
                                    if (i === sa_questions.length - 1) return;

                                    const newQuestions = sa_questions.slice();
                                    const temp = newQuestions[i];
                                    newQuestions[i] = newQuestions[i + 1];
                                    newQuestions[i + 1] = temp;
                                    setSAQuestions(newQuestions);
                                    setIndex(i + 1);
                                }}
                                disabled={i === sa_questions.length - 1}
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

export default SAQuestions;