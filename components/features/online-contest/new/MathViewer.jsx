"use client"

import Latex from 'react-latex-next';

// Displays LaTeX
const MathViewer = ({text}) => {
    return text ? (
        <Latex>{text}</Latex>
    ) : (
        <i className='text-sm'>blank</i>
    )
};

export default MathViewer;