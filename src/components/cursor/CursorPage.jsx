import React, { useEffect, useState } from 'react'
import CursorEffect from './CursorEffect';

const CursorPage = ({ language = 'en' }) => {
    const translations = { 
        en: "I learn every day, I test, I fail, I succeed, I grow. Building better today than yesterday is my philosophy.", 
        fr: "J'apprends chaque jour, je teste, j'échoue, je réussis, je grandis. Construire un meilleur aujourd'hui qu'hier est ma philosophie." 
    };
    
    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    useEffect(() => {
        const handleMouseMovement = (e) => {
            setX(e.clientX);
            setY(e.clientY);
        }
        
        document.addEventListener('mousemove', handleMouseMovement);

        return () => {
            document.removeEventListener('mousemove', handleMouseMovement);
        }
    }, []); // Remove x, y from dependencies to avoid unnecessary re-renders

    return (
        <>
            <div className="h-screen w-screen bg-gray-950 items-center justify-center flex text-4xl font-bold relative overflow-hidden">
                <div 
                    className="w-3/4 text-white text-center lg:text-5xl text-2xl leading-relaxed lg:leading-[100px]"
                >
                    {language === 'fr' ? translations.fr : translations.en}
                </div>
                <CursorEffect x={x} y={y} />
            </div>
        </>
    )
}

export default CursorPage