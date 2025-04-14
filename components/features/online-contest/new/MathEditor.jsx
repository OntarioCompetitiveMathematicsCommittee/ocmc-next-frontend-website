"use client"

import { useState } from 'react';

import MathViewer from './MathViewer';

// Allows editing of LaTeX
const MathEditor = ({ text, setText, editOnly }) => {
    // if there is already text, show the preview. otherwise, show a blank editor
    const [isPreview, setIsPreview] = useState(!!text);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-0 p-2">
            {/* Button for switching preview/edit mode */}
            { !editOnly && (
                <button
                    type="button"
                    className="w-full px-4 py-1 rounded-md rounded-b-none text-white transition-colors bg-blue-500 hover:bg-blue-600"
                    onClick={() => setIsPreview(!isPreview)}
                >
                    Switch to {isPreview ? 'Edit' : 'Preview'}
                </button>
            )}

            {/* LaTeX text area */}
            { (isPreview && !editOnly) ? (
                // Preview mode
                <div className="rounded-t-none rounded-md w-full h-full border-2 border-gray-300 bg-gray-50 p-4 overflow-auto">
                    <MathViewer text={text} />
                </div>
            ) : (
                // Edit mode
                <textarea
                    value={text}
                    onChange={handleInputChange}
                    className={`${!editOnly && "rounded-t-none"} rounded-md w-full h-full p-4 border-2 border-gray-300 font-mono text-md`}
                    placeholder="Type your math here..."
                />
            )}
        </div>
    );
}

export default MathEditor;