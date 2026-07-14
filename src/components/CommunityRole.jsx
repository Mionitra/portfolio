import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Users, Zap, ChevronRight, Star, Globe, Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    id: 1,
    period: "2025 — 2026",
    title: "Présidente",
    org: "Club DSA",
    full: "Data Structure & Algorithm — INSI",
    description:
      "Diriger une communauté de passionnés d'algorithmique, organiser des sessions de formation, des compétitions de code et des workshops techniques.",
    icon: Trophy,
    accent: "#00FFD1",
    tag: "Leadership",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    stat: "50+ membres",
  },
  {
    id: 2,
    period: "2026",
    title: "Membre",
    org: "RISE Community",
    full: "Réseau d'Innovation & de Synergie Étudiante",
    description:
      "Intégrer un réseau d'excellence dédié à l'innovation, au partage de connaissances et à l'émergence des futurs leaders technologiques.",
    icon: Globe,
    accent: "#A78BFA",
    tag: "Innovation",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    stat: "Réseau actif",
  },
  {
    id: 3,
    period: "2026",
    title: "Staff",
    org: "HIU 2026",
    full: "Hackathon Inter-Universitaire 2026",
    description:
      "Contribuer à l'organisation d'un hackathon majeur rassemblant les meilleures équipes universitaires, gérer la logistique et accompagner les participants.",
    icon: Zap,
    accent: "#F59E0B",
    tag: "Événementiel",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    stat: "Multi-universités",
  },
];

function RoleCard({ role, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      { opacity: 0, y: 60, rotateX: 8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        delay: index * 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.7,
        delay: index * 0.18 + 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  useEffect(() => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      scale: hovered ? 1.07 : 1,
      duration: 0.55,
      ease: "power2.out",
    });
  }, [hovered]);

  const Icon = role.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.025)",
        borderRadius: "20px",
        border: `1px solid ${hovered ? role.accent + "55" : "rgba(255,255,255,0.08)"}`,
        overflow: "hidden",
        transition: "border-color 0.4s, background 0.4s, box-shadow 0.4s",
        boxShadow: hovered
          ? `0 0 40px ${role.accent}22, 0 8px 40px rgba(0,0,0,0.4)`
          : "0 4px 24px rgba(0,0,0,0.3)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: role.accent + "18",
          filter: "blur(50px)",
          pointerEvents: "none",
          transition: "opacity 0.4s",
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Image */}
      <div
        style={{
          height: 180,
          overflow: "hidden",
          position: "relative",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, #0A0F1E 100%)`,
            zIndex: 2,
          }}
        />
        <img
          ref={imageRef}
          src={role.image}
          alt={role.org}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transformOrigin: "center",
          }}
        />
        {/* Tag */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 3,
            padding: "4px 12px",
            borderRadius: 999,
            background: role.accent + "22",
            border: `1px solid ${role.accent}55`,
            color: role.accent,
            fontSize: "0.68rem",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {role.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Period */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            color: role.accent,
            letterSpacing: "0.15em",
          }}
        >
          {role.period}
        </div>

        {/* Title + Org */}
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.55rem",
              fontWeight: 800,
              color: "#F0F4FF",
              lineHeight: 1.15,
            }}
          >
            {role.title}
          </div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: role.accent,
              marginTop: 2,
            }}
          >
            {role.org}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "rgba(200,210,255,0.45)",
              fontFamily: "'Space Mono', monospace",
              marginTop: 2,
            }}
          >
            {role.full}
          </div>
        </div>

        {/* Divider line */}
        <div
          ref={lineRef}
          style={{
            height: 1,
            background: `linear-gradient(to right, ${role.accent}88, transparent)`,
            transformOrigin: "left",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(190,200,240,0.7)",
            lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
            flex: 1,
          }}
        >
          {role.description}
        </p>

        {/* Footer stat */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "rgba(200,210,255,0.55)",
              fontSize: "0.78rem",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <Icon size={14} color={role.accent} />
            {role.stat}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: role.accent,
              fontSize: "0.78rem",
              fontFamily: "'Space Mono', monospace",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          >
            Voir plus <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunitySection() {
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const gridRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);

  useEffect(() => {
    // Floating orbs
    gsap.to(orbRef1.current, {
      y: -30,
      x: 20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(orbRef2.current, {
      y: 25,
      x: -15,
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    // Header entrance
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.55 }
    );
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,209,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,209,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .scanline {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
        }
      `}</style>

      <section
        className="grid-bg scanline"
        style={{
          minHeight: "100vh",
          background: "#070C1A",
          padding: "80px 24px 100px",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating orbs */}
        <div
          ref={orbRef1}
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,209,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(10px)",
          }}
        />
        <div
          ref={orbRef2}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(10px)",
          }}
        />

        {/* Inner container */}
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div
            ref={badgeRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid rgba(0,255,209,0.3)",
              background: "rgba(0,255,209,0.07)",
              marginBottom: 28,
            }}
          >
            <Star size={12} color="#00FFD1" fill="#00FFD1" />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "#00FFD1",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Engagements & Communauté
            </span>
          </div>

          {/* Header */}
          <h2
            ref={headerRef}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#F0F4FF",
              marginBottom: 16,
              maxWidth: 700,
            }}
          >
            Implications{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00FFD1, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              & Rôles
            </span>
            <br />
            dans l'écosystème.
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontSize: "0.95rem",
              color: "rgba(190,200,240,0.55)",
              maxWidth: 540,
              lineHeight: 1.75,
              marginBottom: 60,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Des rôles concrets qui façonnent la communauté tech malgache — entre leadership, collaboration et innovation collective.
          </p>

          {/* Cards grid */}
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {roles.map((role, i) => (
              <RoleCard key={role.id} role={role} index={i} />
            ))}
          </div>

          {/* Bottom decoration */}
          <div
            style={{
              marginTop: 64,
              display: "flex",
              alignItems: "center",
              gap: 16,
              opacity: 0.35,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(0,255,209,0.4))" }} />
            <Code2 size={14} color="#00FFD1" />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                color: "#00FFD1",
                letterSpacing: "0.15em",
              }}
            >
              COMMUNITY · IMPACT · TECH
            </span>
            <Code2 size={14} color="#00FFD1" />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(0,255,209,0.4))" }} />
          </div>
        </div>
      </section>
    </>
  );
}