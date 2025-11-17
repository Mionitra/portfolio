import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import "../assets/horizontalScroll.css";
import CursorPage from "./cursor/CursorPage";
import CertificationsSection from "./CertificationsSection";
import HackathonPortfolio from "./HackathonPortfolio";

const HorizontalScroll = ({ children1, children2, darkMode, language = 'en' }) => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const nextSection = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    let pinAnim = null;

    const setup = () => {
      // cleanup previous trigger if any
      if (pinAnim) {
        pinAnim.scrollTrigger.kill();
        pinAnim.kill();
        pinAnim = null;
        ScrollTrigger.refresh();
      }

      const wrapper = sectionRef.current;
      // find the first section element inside the horizontal wrapper
      const firstSection = wrapper.querySelector(".section-1");

      // extra vertical scroll needed to reveal entire first section content
      const extraHeight = firstSection
        ? Math.max(firstSection.scrollHeight - window.innerHeight, 0)
        : 0;

      // total horizontal scroll distance needed for the horizontal sections
      const totalHorizontalScroll = Math.max(
        wrapper.scrollWidth - window.innerWidth,
        0
      );

      // start is delayed by extraHeight so users can scroll vertically the first section content
      const startValue = `top top+=${Math.round(extraHeight)}`;
      // end should equal the total horizontal scroll so the pin releases smoothly
      const endValue = `+=${Math.round(totalHorizontalScroll)}`;

      // create the horizontal tween (move by one viewport to show the next section)
      pinAnim = gsap.fromTo(
        wrapper,
        { x: 0 },
        {
          x: () => `-${window.innerWidth}px`, // move one viewport to the left (two sections layout)
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: startValue,
            end: endValue,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    };

    setup();
    const onResize = () => {
      setup();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (pinAnim) {
        pinAnim.scrollTrigger && pinAnim.scrollTrigger.kill();
        pinAnim.kill();
        pinAnim = null;
      }
    };
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-x-hidden ">
        <div ref={triggerRef}>
          <div
            className="main-wrapper flex w-[200vw] h-screen relative"
            ref={sectionRef}
          >
            {/* Première section avec CertificationsSection
                Ajustée pour être responsive : autorise un scroll interne si le contenu excède la hauteur de la fenêtre */}
            <section className={`section-1 w-screen h-screen flex items-start justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <div className="w-full overflow-auto max-h-screen">
                {/* PDFViewer centré */}
                <div className="">
                  <CertificationsSection darkMode={darkMode} language={language} />
                </div>
              </div>
            </section>

            {/* Deuxième section existante */}
            <section
              className={`section-2 w-screen h-screen relative bg-cover bg-center ${darkMode ? 'bg-opacity-80' : ''}`}
              style={{ backgroundImage: "url('/img/gallery-2.webp')" }}
            >
             <CursorPage />
            </section>
          </div>
        </div>
      </div>
      <div className="next-section overflow-x-hidden" ref={nextSection}>
        <HackathonPortfolio darkMode={darkMode} language={language} />
      </div>
    </>
  );
};

export default HorizontalScroll;