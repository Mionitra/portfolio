import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import styled from "styled-components";

const Line = styled.div`
  width: 100%;
  height: 5vw;
  position: relative;
  overflow: hidden;
  &:nth-of-type(1) {
    display: flex;
    justify-content: flex-end;
  }
  &:nth-of-type(3) {
    display: flex;
    justify-content: center;
  }
`;

const Text = styled.div`
  position: absolute;
  font-size: 5vw;
  color: rgb(150, 149, 149);
  line-height: 5vw;

  span {
    font-family: "Major Mono Display", monospace;
    color: rgb(50, 50, 40);
    font-size: 5vw;
  }
`;

const TextReveal = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".singleLine div", {
        y: 200,
        ease: "power4.out",
        duration: 2,
        stagger: {
            amount: 1,
        }
    });
  });
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="w-full h-full flex justify-between items-center flex-col">
        <Line className="singleLine">
          <Text>
            <span>"</span>C<span>o</span>DE<span>R</span>
          </Text>
        </Line>
        <Line className="singleLine">
          <Text>
            <span>DESI</span>G<span>N </span>A<span>DDICT</span>,
          </Text>
        </Line>
        <Line className="singleLine">
          <Text>
            <span>A</span>BST<span>RA</span>CT<span></span>
          </Text>
        </Line>
        <Line className="singleLine">
          <Text>
            <span>T</span>H<span>INK</span>E<span>R</span>."
          </Text>
        </Line>
      </div>
    </div>
  );
};

export default TextReveal;
