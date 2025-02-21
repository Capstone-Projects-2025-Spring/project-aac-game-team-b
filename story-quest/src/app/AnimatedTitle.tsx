'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles.css'; // Import the styles

const AnimatedTitle: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isWaving, setIsWaving] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (divRef.current) {
                setIsLoaded(true);
            }
        }, 500);

        // Trigger wave effect after initial animation
        setTimeout(() => {
            setIsWaving(true);
        }, 1500);
    }, []);

    return (
        <div
            ref={divRef}
            className={`${isLoaded ? 'loaded' : ''} ${isWaving ? 'wave' : ''}`}
        >
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
