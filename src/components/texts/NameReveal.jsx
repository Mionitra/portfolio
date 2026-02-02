import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import styled from "styled-components";


const NameReveal = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".singleLine div", {
      y: 200,
      ease: "power4.out",
      duration: 1.5,
      stagger: {
        amount: 1,
      },
    });
  });
  return (
    <>
      <div className="text-center md:text-start mt-5 md:mt-0">
        <div className="singleLine overflow-hidden">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">
              RAKOTONDRADAORO
            </h1>
          </div>
        </div>
        <div className="singleLine overflow-hidden">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold">
              {" "}
              Lova{" "}
              <span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Mionitra
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NameReveal;
