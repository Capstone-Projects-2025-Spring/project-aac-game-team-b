'use client';

import React, { useEffect, useRef } from 'react';
import './styles.css'; // Import the styles

const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setTimeout(() => {
            if (divRef.current) {
                divRef.current.classList.add('loaded');
            }
        }, 500);
    }, []);

    useEffect(() => {
        const handleClick = () => {
            if (divRef.current) {
                divRef.current.classList.toggle('loaded');
            }
        };

        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div ref={divRef}>
            <span><span>S</span></span>
            <span><span>t</span></span>
            <span><span>o</span></span>
            <span><span>r</span></span>
            <span><span>y</span></span>
            <span><span>Q</span></span>
            <span><span>u</span></span>
            <span><span>e</span></span>
            <span><span>s</span></span>
            <span><span>t</span></span>
        </div>
    );
};

export default AnimatedTitle;
