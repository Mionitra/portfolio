import React, { useEffect, useState } from 'react'
import CursorEffect from './CursorEffect';

const CursorPage = () => {
    const [y , setY] = useState(0);
    const [x , setX] = useState(0);
    // const [size, setSize] = useState(32);

    useEffect(() => {
        const handleMouseMovement = (e) => {
            setX(e.clientX);
            setY(e.clientY);
        }
        document.addEventListener('mousemove', handleMouseMovement);

        return () => {
            document.removeEventListener('mousemove', handleMouseMovement);
        }
    }, [x, y])

  return (
    <>
        <div className="h-screen w-screen bg-gray-950 items-center justify-center flex text-4xl font-bold relative overflow-hidden">
            <div className="w-3/4 text-white text-center sm:text-5xl text-2xl" style={{lineHeight: "100px"}}>
                I learn every day, I test, I fail, I succeed, I grow. Building better today than yesterday is my philosophy.
            </div>
            <CursorEffect x={x} y={y}/>
        </div>
    </>
  )
}

export default CursorPage