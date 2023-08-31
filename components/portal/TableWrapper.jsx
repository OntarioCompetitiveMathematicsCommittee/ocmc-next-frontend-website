"use client"

import { useRef } from 'react'
import useDraggableScroll from '@hooks/useDraggableScroll'

const TableWrapper = ({ children }) => {
    const ref = useRef(null);
    const {onMouseDown} = useDraggableScroll(ref)
    
    return (
        <div className='w-full overflow-x-scroll' ref={ref} onMouseDown={onMouseDown}>
            <table className='min-w-[81rem] w-full'>
                { children }
            </table>
        </div>
    )
}

export default TableWrapper