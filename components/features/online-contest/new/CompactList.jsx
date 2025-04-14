"use client"

import { useState, React } from 'react';

// Component to display items in a list, with at most 1 element open/expanded
// element rendering is implemented by using renderElement prop
const CompactList = ({ elements, addElement, renderElement }) => {
    const [index, setIndex] = useState(-1);

    return (
        <div className="flex flex-col gap-0 items-center w-full overflow-auto px-2">
            { elements.length !== 0 ? (
                <div className="flex flex-col w-full">
                    {elements.map((element, i) => {
                        const isOpen = i === index;
                        return renderElement(i, element, isOpen, setIndex);
                    })}
                </div>
            ) : (
                <div className="w-full text-lg text-center p-2 border-2 border-gray-200 bg-white rounded-md">
                    <i className='text-gray-500'>Empty...</i>
                </div>
            )}
            
            { /* only have add button if there is a function passed that handles it */ }
            { addElement && (
                <button
                    onClick={() => {
                        addElement(setIndex);
                    }}
                    type='button'
                    className="flex items-center justify-center w-10 h-10 text-2xl text-white rounded-b-full rounded-t-none bg-blue-500 hover:bg-blue-600"
                >
                    +
                </button>
            )}
        </div>
    );
}

export default CompactList;