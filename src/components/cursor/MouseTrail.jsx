import { useGSAP } from '@gsap/react'
import React, { useEffect } from 'react'
import img1 from "/images/space.png"
import img2 from "/images/galaxy.png"
import img3 from "/images/launch.png"
import gsap from 'gsap'

const MouseTrail = () => {
    useGSAP(()=>{
        let lastX = 0;
        let lastY = 0;
        let currentIndex = 0;

        let imgs = [img1, img2, img3];

        const createTrail = (x, y) => {
            console.log(x, y)
            const img = document.createElement("img");
            img.classList.add("image-trail");
            img.src = imgs[currentIndex];
            document.querySelector(".trail-container").appendChild(img);
            currentIndex = (currentIndex + 1) % imgs.length;


            gsap.set(img, {
                x: x,
                y: y,
                width: "30px",
                scale: 0,
                opacity: 0,
            });
            gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: .5,
                ease: "power2.out"
            });
            gsap.to(img, {
                scale: 0.2,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease : "power2.in"
            })
        }

        const handleMouseMove = (e) => {
            // calculate how far the mouse went from the last position
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            const distance = Math.sqrt(dx&dx + dy*dy);

            if (distance>60) {
                createTrail(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }

            createTrail(e.clientX, e.clientY)
        }
        window.addEventListener("mousemove", handleMouseMove);
    })
  return (
    <>
        <div className="relative min-h-screen bg-neutral-950">
            <div className="trail-container absolute w-full h-full overflow-hidden">

            </div>
        </div>
    </>
  )
}

export default MouseTrail