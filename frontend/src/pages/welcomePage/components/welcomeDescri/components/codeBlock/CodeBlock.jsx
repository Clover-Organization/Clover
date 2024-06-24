import React, { useState, useEffect } from "react";

export default function CodeBlock() {
    const [code, setCode] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const codeString = `
import React from 'react';

const MyComponent = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>This is my simple React component.</p>
        </div>
    );
};

export default MyComponent;`;

        let i = 0;
        setIsTyping(true);
        const interval = setInterval(() => {
            setCode((prevCode) => prevCode + codeString[i]);
            i++;
            if (i >= codeString.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        });

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2 font-medium">
                MyComponent.jsx
            </div>
            <pre className="font-mono text-primary px-4 py-2 whitespace-pre-wrap">
                {code}
                {isTyping && <span className="animate-blink">|</span>}
            </pre>
        </div>
    );
}
