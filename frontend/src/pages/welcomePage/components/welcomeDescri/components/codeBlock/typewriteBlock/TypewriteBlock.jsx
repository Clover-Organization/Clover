import React, { useState, useEffect } from 'react';
import Typical from 'react-typical';
import './TypewriteBlock.css'; // Certifique-se de criar este arquivo para estilizar o componente

const TypewriteBlock = () => {
  const [currentCollaborator, setCurrentCollaborator] = useState('');
  const code = [
    "/*",
    " Intersection Observer Component",
    "*/",
    "interface ObserveOptions {",
    "  element: Ref<HTMLElement | null>;",
    "  onEnter: () => void;",
    "  onLeave?: () => void;",
    "  once?: boolean;",
    "  options?: IntersectionObserverInit",
    "}"
  ];

  const collaborators = [
    { name: 'ornella', lines: [0, 1, 2, 3, 4] },
    { name: 'aman', lines: [5, 6, 7, 8, 9, 10, 11] }
  ];

  useEffect(() => {
    let collaboratorIndex = 0;
    let lineIndex = 0;
    const typeInterval = setInterval(() => {
      if (lineIndex < collaborators[collaboratorIndex].lines.length) {
        setCurrentCollaborator(collaborators[collaboratorIndex].name);
        lineIndex++;
      } else {
        collaboratorIndex = (collaboratorIndex + 1) % collaborators.length;
        lineIndex = 0;
      }
    }, 5000);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="typewriter-collaboration">
      <Typical
        steps={code.map((line, index) => [line, 1000]).flat()}
        loop={1}
        wrapper="p"
      />
      <div className="collaborator">
        {currentCollaborator}
      </div>
    </div>
  );
};

export default TypewriteBlock;
