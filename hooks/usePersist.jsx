"use client"

import { useState, useEffect } from 'react';

const usePersist = () => {
    const [persist, setPersist] = useState(false);

    //may be error causing
    useEffect(() => {
        const persist = JSON.parse(localStorage.getItem("persist")) || false;
        setPersist(persist);
    }, [])

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
}

export default usePersist