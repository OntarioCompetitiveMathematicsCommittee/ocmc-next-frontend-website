'use client'

import React, { useState, useEffect } from 'react';

const ProctorTodos = () => {

    // Load hard-coded items when component mounts
    const todos = [
        { id: 0, text: 'Announce upcoming events', completed: false },
        { id: 1, text: 'Confirm all participating students are registered', completed: false },
        { id: 2, text: 'Contact the OCMC to receive contest papers', completed: false },
        { id: 3, text: 'Send finshed contests back', completed: false },
    ];

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Load completion status from local storage
        const storedItems = JSON.parse(localStorage.getItem('checklistItems') || '[]');
        const updatedItems = todos.map(item => {
                const storedItem = storedItems.find(storedItem => storedItem.id === item.id);
                return storedItem ? storedItem : { id: item.id, completed: false };
        });
    
        setItems(updatedItems);
    }, []);
  
    useEffect(() => {
        // Save items to local storage whenever items state changes
        localStorage.setItem('checklistItems', JSON.stringify(items));
    }, [items]);
  
    const handleCheckboxChange = (itemId) => {
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    };

    return (
        <div className='flex flex-col items-center w-full h-full gap-24 p-4 py-24 overflow-scroll'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <h1 className="portalh2">Proctor Checklist</h1>
                <h4 className='text-2xl'>Make Sure To Complete All Steps ASAP</h4>
            </div>
            

            <ul className='flex flex-col items-start justify-start w-full max-w-5xl gap-4 text-left'>
                {items.map(item => (
                    <li key={item.id} className='flex items-center gap-4 text-3xl'>
                        <input
                            className='w-5 h-5 accent-brandBlue-700'
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        {
                            item.completed ? 
                            <s>{todos[item.id].text}</s>
                            : todos[item.id].text
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProctorTodos;
