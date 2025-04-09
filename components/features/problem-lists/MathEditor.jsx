"use client"

import { useState } from 'react';

import Latex from 'react-latex-next';

const MathEditor = ({ text, setText }) => {
    const [isPreview, setIsPreview] = useState(false);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <button
                type="button"
                className="px-4 py-2 text-white transition-colors rounded-md bg-blue-500 hover:bg-blue-600"
                onClick={() => setIsPreview(!isPreview)}
            >Switch to {isPreview ? 'Edit' : 'Preview'}</button>
            { isPreview && (
                <Latex>{text}</Latex>
            )}
            {!isPreview && (
                <textarea
                    value={text}
                    onChange={handleInputChange}
                    className="w-full h-1/2 p-4 border border-gray-300 rounded-lg font-mono text-md"
                    placeholder="Type your question here..."
                />
            )}
        </div>
    );
}

export default MathEditor;