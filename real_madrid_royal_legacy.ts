import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Crown, Menu, Pause, Play, X } from "lucide-react";
import * as THREE from "three";

/**
 * REAL MADRID — THE ROYAL LEGACY
 *
 * Single-file React 19 / TypeScript experience. This source intentionally uses
 * React.createElement rather than JSX so it can be saved as a .ts file.
 *
 * Install the dependencies listed in the project brief, then mount <App />.
 * The visual portrait treatment intentionally uses labeled initials rather than
 * passing off generic or unlicensed imagery as authentic player photography.
 * Replace the portrait placeholder component with approved club/licensed assets
 * when those assets are available. The stadium photograph is an atmospheric,
 * non-editorial Unsplash image and is not represented as an official Bernabéu
 * photograph. Historical facts and trophy totals are presented as a dated
 * editorial snapshot; confirm all figures against official sources before
 * publication.
 */

gsap.registerPlugin(ScrollTrigger);
const h = React.createElement;

type Profile = {
  name: string;
  role: string;
  nation: string;
  years: string;
  detail: string;
  stats: string[];
  initials: string;
  number?: string;
  category: "legend" | "present" | "manager";
};

const legends: Profile[] = [
  { name: "Cristiano Ronaldo", role: "Forward", nation: "Portugal", years: "2009–2018", detail: "A record-setting era of goals, decisive nights and four European crowns helped define one of the most prolific chapters in the club's history.", stats: ["451 goals", "438 appearances", "4 European Cups"], initials: "CR", category: "legend" },
  { name: "Alfredo Di Stéfano", role: "Forward", nation: "Argentina / Spain", years: "1953–1964", detail: "The complete footballer and central force of the team that won the first five European Cups in succession.", stats: ["308 goals", "5 European Cups", "2 Ballon d'Or awards"], initials: "AD", category: "legend" },
  { name: "Zinedine Zidane", role: "Midfielder", nation: "France", years: "2001–2006", detail: "An artist in midfield whose volley in the 2002 final became one of the competition's defining images; later a historic coach.", stats: ["49 goals", "1 European Cup as player", "3 European Cups as coach"], initials: "ZZ", category: "legend" },
  { name: "Raúl González", role: "Forward", nation: "Spain", years: "1994–2010", detail: "A captain and symbol of a generation, known for intelligent movement, composure and an enduring connection with supporters.", stats: ["323 goals", "3 European Cups", "6 La Liga titles"], initials: "RG", category: "legend" },
  { name: "Iker Casillas", role: "Goalkeeper", nation: "Spain", years: "1999–2015", detail: "A homegrown captain whose reflex saves and leadership were central to the club's return to European glory.", stats: ["725 appearances", "3 European Cups", "5 La Liga titles"], initials: "IC", category: "legend" },
  { name: "Sergio Ramos", role: "Defender", nation: "Spain", years: "2005–2021", detail: "A forceful leader and clutch defender, remembered for the late equaliser in the 2014 final and four European crowns.", stats: ["101 goals", "4 European Cups", "22 major titles"], initials: "SR", category: "legend" },
  { name: "Roberto Carlos", role: "Left-back", nation: "Brazil", years: "1996–2007", detail: "A dynamic, attacking full-back whose speed, power and unforgettable left foot made him a landmark figure of the modern game.", stats: ["370 appearances", "3 European Cups", "4 La Liga titles"], initials: "RC", category: "legend" },
  { name: "Luís Figo", role: "Midfielder", nation: "Portugal", years: "2000–2005", detail: "A gifted wide creator and Ballon d'Or winner who brought balance and imagination to the early Galácticos era.", stats: ["57 goals", "1 European Cup", "2 La Liga titles"], initials: "LF", category: "legend" },
  { name: "Ronaldo Nazário", role: "Forward", nation: "Brazil", years: "2002–2007", detail: "A two-time world champion whose acceleration, touch and finishing made him one of football's most naturally gifted forwards.", stats: ["104 goals", "2 La Liga titles", "1 Intercontinental Cup"], initials: "RN", category: "legend" },
  { name: "Karim Benzema", role: "Forward", nation: "France", years: "2009–2023", detail: "A selfless creator turned all-time great scorer, he led the attack through five Champions League-winning campaigns.", stats: ["354 goals", "5 European Cups", "Ballon d'Or 2022"], initials: "KB", category: "legend" },
  { name: "Luka Modrić", role: "Midfielder", nation: "Croatia", years: "2012–2025", detail: "A master of rhythm and space whose vision and technical control shaped an extraordinary era of European success.", stats: ["6 European Cups", "Ballon d'Or 2018", "4 Club World Cups"], initials: "LM", category: "legend" },
  { name: "Toni Kroos", role: "Midfielder", nation: "Germany", years: "2014–2024", detail: "An elite passer with extraordinary composure, he retired from club football after helping secure the 2024 European Cup.", stats: ["5 European Cups with Madrid", "28 goals", "4 La Liga titles"], initials: "TK", category: "legend" },
  { name: "Ferenc Puskás", role: "Forward", nation: "Hungary / Spain", years: "1958–1966", detail: "A prolific left-footed finisher whose scoring brilliance became part of the club's early European mythology.", stats: ["242 goals", "3 European Cups", "4 Pichichi trophies"], initials: "FP", category: "legend" }
];

// First-team snapshot references the 2024–25 season and should be re-verified
// against the official roster whenever this experience is republished.
const currentPlayers: Profile[] = [
  { name: "Kylian Mbappé", role: "Forward", nation: "France", years: "Joined 2024", number: "9", detail: "A world champion forward beginning a new chapter in Madrid after years of elite performances in European football.", stats: ["Forward", "France", "No. 9"], initials: "KM", category: "present" },
  { name: "Vinícius Júnior", role: "Forward", nation: "Brazil", years: "2018–present", number: "7", detail: "An explosive wide attacker whose direct running and big-game impact have made him central to the modern side.", stats: ["Forward", "Brazil", "No. 7"], initials: "VJ", category: "present" },
  { name: "Jude Bellingham", role: "Midfielder", nation: "England", years: "2023–present", number: "5", detail: "A versatile midfielder who combines forward runs, technical quality and remarkable influence in the final third.", stats: ["Midfielder", "England", "No. 5"], initials: "JB", category: "present" },
  { name: "Federico Valverde", role: "Midfielder", nation: "Uruguay", years: "2016–present", number: "8", detail: "A powerful, tactically adaptable midfielder valued for relentless work rate, long-range quality and leadership.", stats: ["Midfielder", "Uruguay", "No. 8"], initials: "FV", category: "present" },
  { name: "Rodrygo", role: "Forward", nation: "Brazil", years: "2019–present", number: "11", detail: "A technically gifted forward whose timing and composure have produced memorable moments on Europe's biggest stage.", stats: ["Forward", "Brazil", "No. 11"], initials: "RO", category: "present" },
  { name: "Eduardo Camavinga", role: "Midfielder", nation: "France", years: "2021–present", number: "6", detail: "A dynamic, left-footed midfielder with the range to influence games from several central and defensive roles.", stats: ["Midfielder", "France", "No. 6"], initials: "EC", category: "present" },
  { name: "Aurélien Tchouaméni", role: "Midfielder", nation: "France", years: "2022–present", number: "14", detail: "A composed defensive midfielder who brings physical presence, intelligent positioning and progressive distribution.", stats: ["Midfielder", "France", "No. 14"], initials: "AT", category: "present" },
  { name: "Arda Güler", role: "Midfielder", nation: "Türkiye", years: "2023–present", number: "15", detail: "A creative young left-footed playmaker, admired for close control, imagination and precision from distance.", stats: ["Midfielder", "Türkiye", "No. 15"], initials: "AG", category: "present" },
  { name: "Thibaut Courtois", role: "Goalkeeper", nation: "Belgium", years: "2018–present", number: "1", detail: "An imposing goalkeeper whose reach, shot-stopping and calm presence have delivered defining performances.", stats: ["Goalkeeper", "Belgium", "No. 1"], initials: "TC", category: "present" }
];

const managers: Profile[] = [
  { name: "Miguel Muñoz", role: "Manager", nation: "Spain", years: "1960–1974", detail: "The club's longest-serving and most decorated historic manager established a lasting standard of domestic and European success.", stats: ["14 seasons", "2 European Cups", "9 La Liga titles"], initials: "MM", category: "manager" },
  { name: "Vicente del Bosque", role: "Manager", nation: "Spain", years: "1999–2003", detail: "A calm, trusted leader who guided a star-studded side to two European Cups and brought understated authority to the touchline.", stats: ["2 European Cups", "2 La Liga titles", "Intercontinental Cup"], initials: "VB", category: "manager" },
  { name: "Carlo Ancelotti", role: "Manager", nation: "Italy", years: "2013–2015 · 2021–2025", detail: "A tactically astute and empathetic coach who led Madrid to three Champions League titles across two spells.", stats: ["3 European Cups", "2 La Liga titles", "Club World Cup titles"], initials: "CA", category: "manager" },
  { name: "Zinedine Zidane", role: "Manager", nation: "France", years: "2016–2018 · 2019–2021", detail: "A former Madrid legend whose first coaching spell produced the unprecedented modern achievement of three consecutive Champions League titles.", stats: ["3 consecutive European Cups", "2 La Liga titles", "11 trophies"], initials: "ZZ", category: "manager" },
  { name: "José Mourinho", role: "Manager", nation: "Portugal", years: "2010–2013", detail: "A demanding, forceful coach who broke domestic records and rebuilt the team's competitive edge in a defining rivalry era.", stats: ["La Liga title", "Copa del Rey", "Spanish Super Cup"], initials: "JM", category: "manager" }
];

const timeline = [
  { year: "1902", title: "A club is born", text: "Madrid Football Club is officially established on 6 March, formalising a football movement already taking root in the capital." },
  { year: "1920", title: "A royal distinction", text: "King Alfonso XIII grants the club the title Real, meaning royal, and permission to use the crown in its identity." },
  { year: "1950s", title: "Europe, conquered", text: "Led by Di Stéfano, Puskás and an extraordinary generation, Madrid win the first five European Cups." },
  { year: "1980s", title: "La Quinta del Buitre", text: "A homegrown generation, named after Emilio Butragueño, wins five consecutive Spanish league titles." },
  { year: "2000s", title: "The Galácticos", text: "A new era of global superstars brings star power, domestic success and the 2002 European Cup." },
  { year: "2014", title: "La Décima", text: "Sergio Ramos's late equaliser and extra-time goals deliver the long-awaited tenth European Cup in Lisbon." },
  { year: "2016–18", title: "Three in a row", text: "Madrid become the first club in the modern Champions League era to win three consecutive titles." },
  { year: "2022", title: "La Decimocuarta", text: "A remarkable run of comebacks ends with a final victory over Liverpool and a fourteenth European Cup." },
  { year: "2024", title: "La Decimoquinta", text: "A Wembley final victory over Borussia Dortmund secures the club's fifteenth European Cup." }
];

const trophies = [
  { name: "European Cup / Champions League", count: "15", year: "1956 · 1957 · 1958 · 1959 · 1960 · 1966 · 1998 · 2000 · 2002 · 2014 · 2016 · 2017 · 2018 · 2022 · 2024", copy: "The club's defining competition and the most successful record in its history." },
  { name: "La Liga", count: "36", year: "Most recent title: 2024", copy: "A record number of Spanish league championships, built across generations of domestic dominance." },
  { name: "Copa del Rey", count: "20", year: "Most recent title: 2023", copy: "A historic national cup record shaped by memorable finals and changing eras of Spanish football." },
  { name: "FIFA Club World Cup", count: "5", year: "2014 · 2016 · 2017 · 2018 · 2022", copy: "FIFA Club World Cup titles in the tournament's previous format. Counts depend on the competition definition; Intercontinental Cup honours are separate." },
  { name: "UEFA Super Cup", count: "6", year: "2002 · 2014 · 2016 · 2017 · 2022 · 2024", copy: "Six European Super Cup victories, each earned by meeting the continental champions in a one-match showcase." },
  { name: "Intercontinental Cup", count: "3", year: "1960 · 1998 · 2002", copy: "Three titles from the former meeting between Europe's and South America's continental champions." }
];

const navItems = ["HOME", "HERITAGE", "LEGENDS", "THE PRESENT", "MANAGERS", "TROPHIES", "BERNABÉU"];
const sectionIds: Record<string, string> = { HOME: "home", HERITAGE: "heritage", LEGENDS: "legends", "THE PRESENT": "present", MANAGERS: "managers", TROPHIES: "trophies", "BERNABÉU": "bernabeu" };

const stadiumImage = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2200&q=85";

function CrestMark(props: { size?: number }) {
  const size = props.size ?? 46;
  return h("div", { className: "crest-mark", style: { width: size, height: size }, "aria-label": "Royal legacy monogram" },
    h("span", null, "R"), h("i", null, "M"), h("b", null, "C"), h("small", null, "✦"));
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = cursor.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = (event: MouseEvent) => { tx = event.clientX; ty = event.clientY; };
    const tick = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      if (el) el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    const hover = (event: Event) => el.classList.toggle("is-hover", (event.target as HTMLElement)?.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", hover); tick();
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", hover); cancelAnimationFrame(raf); };
  }, []);
  return h("div", { className: "custom-cursor", ref: cursor, "aria-hidden": true });
}

function LegacyOrb() {
  const group = useRef<THREE.Group | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    if (!group.current) return;
    pointer.current.x += (state.pointer.y * 0.14 - pointer.current.x) * Math.min(1, delta * 2);
    pointer.current.y += (state.pointer.x * 0.2 - pointer.current.y) * Math.min(1, delta * 2);
    group.current.rotation.x = pointer.current.x;
    group.current.rotation.y += delta * 0.12 + pointer.current.y * 0.005;
  });
  return h("group", { ref: group },
    h("mesh", { castShadow: true }, h("sphereGeometry", { args: [1.08, 48, 48] }), h("meshStandardMaterial", { color: "#f4f0e8", roughness: 0.38, metalness: 0.1 })),
    h("mesh", { rotation: [0.4, 0.3, 0.15], scale: 1.012 }, h("sphereGeometry", { args: [1.08, 24, 16] }), h("meshStandardMaterial", { color: "#a68c5b", wireframe: true, transparent: true, opacity: 0.2 })),
    h("mesh", { position: [0, 0, 1.075], scale: [0.33, 0.33, 0.04] }, h("circleGeometry", { args: [1, 32] }), h("meshStandardMaterial", { color: "#c8a96a", metalness: 0.7, roughness: 0.25 })));
}

function StadiumScene() {
  const building = useRef<THREE.Mesh | null>(null);
  const ball = useRef<THREE.Mesh | null>(null);
  useFrame((state, delta) => {
    if (building.current) {
      building.current.rotation.y += delta * 0.04;
      building.current.rotation.x += (state.pointer.y * 0.025 - building.current.rotation.x) * 0.03;
    }
    if (ball.current) ball.current.rotation.y += delta * 0.18;
  });
  return h(React.Fragment, null,
    h("ambientLight", { intensity: 0.7 }),
    h("spotLight", { position: [2, 6, 4], intensity: 120, color: "#f0d59a", angle: 0.65, penumbra: 0.8 }),
    h("group", { ref: building, position: [0, -0.5, 0] },
      h("mesh", { receiveShadow: true }, h("cylinderGeometry", { args: [2.3, 2.05, 1.35, 64, 1, true] }), h("meshStandardMaterial", { color: "#c4c7c8", metalness: 0.68, roughness: 0.3, side: THREE.DoubleSide })),
      h("mesh", { position: [0, 0.6, 0] }, h("cylinderGeometry", { args: [1.9, 1.92, 0.12, 64, 1, true] }), h("meshStandardMaterial", { color: "#c8a96a", metalness: 0.5, roughness: 0.35, side: THREE.DoubleSide })),
      h("mesh", { position: [0, -0.05, 0] }, h("cylinderGeometry", { args: [1.9, 1.9, 0.07, 64] }), h("meshStandardMaterial", { color: "#182c25", roughness: 0.95 })),
      h("mesh", { position: [0, 0.95, 0] }, h("torusGeometry", { args: [2.15, 0.055, 10, 80] }), h("meshStandardMaterial", { color: "#c8a96a", emissive: "#9a7331", emissiveIntensity: 0.55, metalness: 0.8 })),
      h("mesh", { position: [0, -0.1, 1.98], ref: ball }, h("sphereGeometry", { args: [0.22, 24, 24] }), h("meshStandardMaterial", { color: "#eee9dc", roughness: 0.45 }))
    ), h(Sparkles, { count: 52, scale: 7, size: 1.5, speed: 0.18, color: "#d9c18e" }), h(Environment, { preset: "city" }));
}

function Portrait(props: { profile: Profile; large?: boolean }) {
  return h("div", { className: `portrait ${props.large ? "portrait-large" : ""}`, "data-initials": props.profile.initials, role: "img", "aria-label": `${props.profile.name} portrait placeholder — replace with an approved licensed photograph` },
    h("div", { className: "portrait-glow" }),
    h("span", { className: "portrait-label" }, "ARCHIVE PORTRAIT"),
    h("strong", null, props.profile.initials),
    h("small", null, "APPROVED IMAGE REQUIRED"));
}

function App() {
  const [active, setActive] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedTrophy, setSelectedTrophy] = useState<(typeof trophies)[number] | null>(null);
  const [selectedYear, setSelectedYear] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ duration: reduced ? 0.2 : 1.15, smoothWheel: !reduced, touchMultiplier: 1.25 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => setProgress(limit > 0 ? scroll / limit : 0);
    lenis.on("scroll", onScroll);
    const updateActive = () => {
      let current = "HOME";
      for (const item of navItems) {
        const el = document.getElementById(sectionIds[item]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.42) current = item;
      }
      setActive(current);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      gsap.to(".hero-copy", { yPercent: 24, opacity: 0, ease: "none", scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 0.7 } });
      gsap.to(".hero-scene", { scale: 1.1, yPercent: 8, ease: "none", scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".stadium-image", { yPercent: -9, ease: "none", scrollTrigger: { trigger: "#bernabeu", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".timeline-track").forEach((track) => {
        if (window.matchMedia("(min-width: 850px)").matches) {
          gsap.to(track, { x: () => Math.min(0, -(track.scrollWidth - window.innerWidth + 130)), ease: "none", scrollTrigger: { trigger: track.parentElement, start: "top 72%", end: "bottom 35%", scrub: 0.7 } });
        }
      });
    });
    return () => { ctx.revert(); window.removeEventListener("scroll", updateActive); lenis.destroy(); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelectedProfile(null); setSelectedTrophy(null); setMenuOpen(false); } };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  const goTo = useCallback((label: string) => {
    const el = document.getElementById(sectionIds[label]);
    if (el) {
      if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -20 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
    setActive(label); setMenuOpen(false);
  }, []);

  const scrollTimeline = (direction: number) => setSelectedYear((old) => Math.max(0, Math.min(timeline.length - 1, old + direction)));

  const nav = h("nav", { className: `floating-nav ${menuOpen ? "nav-open" : ""}`, "aria-label": "Main navigation" },
    h("button", { className: "brand", onClick: () => goTo("HOME"), "aria-label": "Return to home" }, h(CrestMark, { size: 38 }), h("span", null, "REAL MADRID", h("small", null, "THE ROYAL LEGACY"))),
    h("div", { className: "nav-links" }, navItems.map((item) => h("button", { key: item, className: active === item ? "active" : "", onClick: () => goTo(item) }, item))),
    h("button", { className: "menu-toggle", onClick: () => setMenuOpen(!menuOpen), "aria-label": menuOpen ? "Close navigation" : "Open navigation" }, menuOpen ? h(X, { size: 20 }) : h(Menu, { size: 20 })));

  const heading = (eyebrow: string, title: string, sub?: string) => h("div", { className: "section-heading reveal" }, h("span", { className: "eyebrow" }, h("i"), eyebrow), h("h2", null, title), sub ? h("p", null, sub) : null);

  const cards = (items: Profile[], className: string) => h("div", { className }, items.map((profile) => h(motion.button, {
    key: profile.name,
    className: "player-card",
    onClick: () => setSelectedProfile(profile),
    whileHover: { y: -8, transition: { duration: 0.25 } },
    whileTap: { scale: 0.98 },
    "aria-label": `Open profile for ${profile.name}`
  }, h(Portrait, { profile }), h("div", { className: "player-card-meta" }, h("span", null, profile.role.toUpperCase()), h("h3", null, profile.name), h("p", null, profile.years), h(ArrowUpRight, { size: 17 })))));

  return h(React.Fragment, null,
    h("style", null, styles),
    h(CustomCursor),
    h("div", { className: "scroll-progress", style: { transform: `scaleX(${progress})` } }),
    nav,
    h("main", null,
      h("section", { className: "hero", id: "home", ref: heroRef },
        h("div", { className: "hero-image", style: { backgroundImage: `url(${stadiumImage})` } }),
        h("div", { className: "hero-shade" }),
        h("div", { className: "hero-scene" }, h(Canvas, { camera: { position: [0, 0, 5], fov: 42 }, dpr: [1, 1.5], gl: { antialias: true, alpha: true }, fallback: h("div", { className: "webgl-fallback" }, "A legacy in motion") }, h("ambientLight", { intensity: 1.15 }), h("directionalLight", { position: [3, 4, 5], intensity: 2.5, color: "#fff4dc" }), h(Float, { speed: 1.2, rotationIntensity: 0.18, floatIntensity: 0.22 }, h(LegacyOrb)), h(Sparkles, { count: 38, scale: 6, size: 1.2, speed: 0.14, color: "#e1c78c" }), h(Environment, { preset: "city" }))),
        h("div", { className: "hero-copy" }, h("span", { className: "eyebrow hero-eyebrow" }, h(Crown, { size: 13 }), "A CENTURY OF GLORY"), h("h1", null, "REAL", h("br"), h("em", null, "MADRID")), h("div", { className: "hero-rule" }), h("h2", null, "MORE THAN A CLUB. A LEGACY."), h("p", null, "Over a century of greatness. Generations of legends. An eternal pursuit of glory."), h("button", { className: "gold-button magnetic", onClick: () => goTo("HERITAGE") }, "ENTER THE LEGACY", h(ArrowRight, { size: 15 }))),
        h("div", { className: "hero-bottom" }, h("span", null, "EST. 1902 · MADRID, SPAIN"), h("button", { onClick: () => setIsPlaying(!isPlaying), className: "sound-toggle", "aria-label": isPlaying ? "Pause ambient presentation" : "Resume ambient presentation" }, isPlaying ? h(Pause, { size: 13 }) : h(Play, { size: 13 }), " AMBIENCE "), h("button", { className: "scroll-cue", onClick: () => goTo("HERITAGE"), "aria-label": "Scroll to heritage" }, h(ArrowDown, { size: 17 })) ),
        h("div", { className: "hero-caption" }, "AN INTERACTIVE ARCHIVE OF GREATNESS")),

      h("section", { id: "heritage", className: "heritage section-pad" },
        h("div", { className: "heritage-intro" }, heading("A STORY WRITTEN IN WHITE", "BUILT ON\nGREATNESS.", "From a Madrid football club founded in 1902 to a name synonymous with football's grandest nights."), h("div", { className: "heritage-copy reveal" }, h("p", null, "On 6 March 1902, a group of football enthusiasts formally established Madrid Football Club. The young club grew with the city, and in 1920 King Alfonso XIII granted it the title Real — royal — and the right to bear a crown."), h("p", null, "White became an enduring symbol of the team's identity: a clear, unmistakable expression of unity and ambition. Across generations, that identity has been carried by players, members and supporters around the world."), h("div", { className: "president-note" }, h(Crown, { size: 17 }), h("span", null, h("b", null, "A club owned by its members."), " Real Madrid is a member-owned sporting association, not a conventional privately owned club. Florentino Pérez is its president; verify officeholder details before republication.")))),
        h("div", { className: "heritage-stats reveal" }, [["15", "EUROPEAN CUPS"], ["36", "LEAGUE TITLES"], ["20", "COPA DEL REY"], ["1902", "THE BEGINNING"]].map((x) => h("div", { key: x[1] }, h("strong", null, x[0]), h("span", null, x[1])))),
        h("div", { className: "heritage-image-block reveal" }, h("div", { className: "archive-image", style: { backgroundImage: `linear-gradient(0deg,rgba(6,12,19,.4),rgba(6,12,19,.08)),url(${stadiumImage})` } }, h("span", null, "THE WHITE JERSEY. THE ROYAL CROWN. AN OPEN HORIZON.")), h("div", { className: "image-caption" }, h("span", null, "MADRID · A CITY AND ITS CLUB"), h("span", null, "01 / THE ORIGIN"))),
        h("div", { className: "timeline-heading reveal" }, h("div", null, h("span", { className: "eyebrow" }, "MOMENTS THAT MADE HISTORY"), h("h3", null, "A LEGACY,\nIN TIME.")), h("div", { className: "timeline-controls" }, h("button", { onClick: () => scrollTimeline(-1), "aria-label": "Previous timeline event" }, h(ArrowLeft, { size: 18 })), h("span", null, `${String(selectedYear + 1).padStart(2, "0")} / ${String(timeline.length).padStart(2, "0")}`), h("button", { onClick: () => scrollTimeline(1), "aria-label": "Next timeline event" }, h(ArrowRight, { size: 18 })))),
        h("div", { className: "timeline-window" }, h("div", { className: "timeline-track" }, timeline.map((item, index) => h("button", { className: `timeline-item ${selectedYear === index ? "selected" : ""}`, key: item.year, onClick: () => setSelectedYear(index) }, h("span", { className: "timeline-year" }, item.year), h("i", { className: "timeline-dot" }), h("h4", null, item.title), h("p", null, item.text), h("span", { className: "timeline-read" }, "EXPLORE MOMENT", h(ArrowUpRight, { size: 13 }))))))
      ),

      h("section", { id: "bernabeu", className: "bernabeu" }, h("div", { className: "stadium-image", style: { backgroundImage: `url(${stadiumImage})` } }), h("div", { className: "stadium-overlay" }), h("div", { className: "stadium-scene" }, h(Canvas, { camera: { position: [0, 2, 6], fov: 45 }, dpr: [1, 1.5], gl: { antialias: true, alpha: true }, fallback: h("div", { className: "webgl-fallback" }, "Santiago Bernabéu") }, h(StadiumScene))), h("div", { className: "stadium-copy reveal" }, h("span", { className: "eyebrow" }, "THE HOME OF THE IMPOSSIBLE"), h("h2", null, "SANTIAGO\nBERNABÉU."), h("p", null, "Opened in 1947 and named for the visionary president who transformed the club, the stadium has grown into one of football's defining stages."), h("p", null, "A major modernisation brought a retractable roof, an adaptable pitch and a renewed exterior. The current stadium capacity is commonly listed at approximately 78,000; check the club's latest published figure for event-specific capacity."), h("div", { className: "stadium-facts" }, h("div", null, h("b", null, "1947"), h("span", null, "INAUGURATED")), h("div", null, h("b", null, "~78K"), h("span", null, "APPROX. CAPACITY")), h("div", null, h("b", null, "MADRID"), h("span", null, "CHAMARTÍN"))), h("button", { className: "text-link", onClick: () => goTo("TROPHIES") }, "FROM THIS PITCH, HISTORY", h(ArrowRight, { size: 16 })), h("span", { className: "image-source-note" }, "Atmospheric stadium image; not an official Bernabéu photograph."))),

      h("section", { id: "legends", className: "legends section-pad dark-section" }, h("div", { className: "section-topline reveal" }, h("span", { className: "eyebrow" }, "THE IMMORTALS · 01"), h("span", null, "A GALLERY OF GREATNESS")), heading("THE NAMES THAT NEVER FADE", "ETERNAL\nLEGENDS.", "Thirteen extraordinary careers. A shared history in white. Select a name to explore a profile."), cards(legends, "player-grid legends-grid"), h("p", { className: "asset-disclaimer" }, "Portraits are intentionally marked as placeholders: add official or appropriately licensed player photographs before publishing.")),

      h("section", { id: "present", className: "present section-pad" }, h("div", { className: "present-heading reveal" }, h("div", null, h("span", { className: "eyebrow" }, "A NEW CHAPTER · SQUAD SNAPSHOT 2024–25"), h("h2", null, "THE FUTURE\nWEARS WHITE.")), h("p", null, "A new generation arrives with ambition, skill and a connection to the club's enduring standards.")), cards(currentPlayers, "player-grid present-grid"), h("p", { className: "asset-disclaimer" }, "Squad information is a 2024–25 editorial snapshot, not a live roster. Verify names, numbers, statistics and status with the official club squad before launch.")),

      h("section", { id: "managers", className: "managers section-pad dark-section" }, h("div", { className: "manager-intro reveal" }, h("div", null, h("span", { className: "eyebrow" }, "TACTICIANS · LEADERS · LEGENDS"), h("h2", null, "THE MINDS\nBEHIND THE GLORY.")), h("p", null, "Different eras. Different methods. One shared responsibility: carry the weight of the white shirt.")), h("div", { className: "manager-track" }, managers.map((manager, index) => h("button", { className: "manager-card", key: manager.name, onClick: () => setSelectedProfile(manager) }, h("span", { className: "manager-index" }, `0${index + 1}`), h(Portrait, { profile: manager }), h("div", { className: "manager-card-info" }, h("span", null, manager.years), h("h3", null, manager.name), h("p", null, manager.stats.slice(0, 2).join(" · ")), h(ArrowUpRight, { size: 17 }))))), h("p", { className: "asset-disclaimer" }, "Manager portrait placeholders are identified explicitly. Add approved licensed imagery before publishing.")),

      h("section", { id: "trophies", className: "trophies section-pad" }, h("div", { className: "trophy-top reveal" }, h("div", null, h("span", { className: "eyebrow" }, "THE CABINET OF GLORY"), h("h2", null, "GOLD,\nREMEMBERED.")), h("p", null, "A record shaped by countless nights, every one earned on the pitch. Select a trophy to discover its place in the story.")), h("div", { className: "trophy-experience reveal" }, h("div", { className: "trophy-canvas" }, h(Canvas, { camera: { position: [0, 0, 5], fov: 44 }, dpr: [1, 1.5], gl: { antialias: true, alpha: true }, fallback: h("div", { className: "webgl-fallback" }, "THE TROPHY ROOM") }, h("ambientLight", { intensity: 0.55 }), h("pointLight", { position: [-2, 2, 4], intensity: 90, color: "#ffe2a6" }), h("pointLight", { position: [2, -1, 2], intensity: 35, color: "#ffffff" }), h(Float, { speed: 1.15, rotationIntensity: 0.1, floatIntensity: 0.22 }, h("group", null, h("mesh", { position: [0, 0.75, 0] }, h("torusGeometry", { args: [0.44, 0.11, 18, 48] }), h("meshStandardMaterial", { color: "#d5b56e", metalness: 0.9, roughness: 0.18 })), h("mesh", { position: [0, 0.12, 0] }, h("cylinderGeometry", { args: [0.36, 0.42, 0.95, 32] }), h(MeshDistortMaterial, { color: "#c8a96a", metalness: 0.86, roughness: 0.18, distort: 0.09, speed: 1 })), h("mesh", { position: [0, -0.48, 0] }, h("cylinderGeometry", { args: [0.43, 0.53, 0.18, 32] }), h("meshStandardMaterial", { color: "#b89655", metalness: 0.8, roughness: 0.22 })), h("mesh", { position: [0, -0.66, 0] }, h("cylinderGeometry", { args: [0.62, 0.62, 0.15, 32] }), h("meshStandardMaterial", { color: "#242322", metalness: 0.55, roughness: 0.38 })))), h(Sparkles, { count: 50, scale: 5, size: 1.4, speed: 0.16, color: "#e4c583" }), h(Environment, { preset: "city" }))), h("div", { className: "trophy-caption" }, h("span", null, "A SYMBOL OF CONTINENTAL EXCELLENCE"), h("span", null, "01 / 06"))), h("div", { className: "trophy-list" }, trophies.map((trophy, index) => h("button", { key: trophy.name, className: `trophy-row ${selectedTrophy?.name === trophy.name ? "selected" : ""}`, onMouseEnter: () => setSelectedTrophy(trophy), onFocus: () => setSelectedTrophy(trophy), onClick: () => setSelectedTrophy(trophy) }, h("span", null, `0${index + 1}`), h("span", { className: "trophy-title" }, trophy.name), h("strong", null, trophy.count), h(ArrowUpRight, { size: 16 })))), h(AnimatePresence, null, selectedTrophy ? h(motion.div, { className: "trophy-detail", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 }, key: selectedTrophy.name }, h("span", { className: "eyebrow" }, "IN THE RECORD BOOKS · " + selectedTrophy.year), h("p", null, selectedTrophy.copy)) : null)), h("p", { className: "asset-disclaimer" }, "Counts reflect the stated competition definitions and the 2024 European Cup snapshot. FIFA Club World Cup and Intercontinental Cup are shown separately; validate all totals before publication.")),

      h("footer", { className: "footer" }, h("div", { className: "footer-image", style: { backgroundImage: `url(${stadiumImage})` } }), h("div", { className: "footer-shade" }), h("div", { className: "footer-main" }, h(CrestMark, { size: 58 }), h("span", { className: "eyebrow" }, "ONE CLUB. ONE CITY. COUNTLESS STORIES."), h("h2", null, "HALA MADRID.\nY NADA MÁS."), h("button", { className: "gold-button", onClick: () => goTo("HOME") }, "BACK TO THE BEGINNING", h(ArrowUpRight, { size: 15 }))), h("div", { className: "footer-bottom" }, h("span", null, "© 2025 · THE ROYAL LEGACY · INDEPENDENT EDITORIAL EXPERIENCE"), h("div", null, ["HERITAGE", "LEGENDS", "THE PRESENT", "TROPHIES", "BERNABÉU"].map((item) => h("button", { key: item, onClick: () => goTo(item) }, item))), h("span", null, "HALA MADRID"))))),

    h(AnimatePresence, null, selectedProfile ? h(motion.div, { className: "modal-backdrop", role: "presentation", onMouseDown: (event: React.MouseEvent) => { if (event.target === event.currentTarget) setSelectedProfile(null); }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }, h(motion.div, { className: "profile-modal", role: "dialog", "aria-modal": true, "aria-label": `${selectedProfile.name} profile`, initial: { y: 25, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 12, opacity: 0, scale: 0.99 }, transition: { duration: 0.3 } }, h("button", { className: "modal-close", onClick: () => setSelectedProfile(null), "aria-label": "Close profile" }, h(X, { size: 20 })), h("div", { className: "modal-portrait" }, h(Portrait, { profile: selectedProfile, large: true })), h("div", { className: "modal-content" }, h("span", { className: "eyebrow" }, selectedProfile.category === "present" ? "THE PRESENT" : selectedProfile.category === "manager" ? "THE TOUCHLINE" : "THE IMMORTALS"), h("h2", null, selectedProfile.name), h("div", { className: "profile-meta" }, h("span", null, selectedProfile.role), h("i"), h("span", null, selectedProfile.nation), h("i"), h("span", null, selectedProfile.years)), selectedProfile.number ? h("p", { className: "shirt-number" }, "NO. ", selectedProfile.number) : null, h("p", { className: "profile-detail" }, selectedProfile.detail), h("div", { className: "profile-stats" }, selectedProfile.stats.map((stat) => h("span", { key: stat }, stat))), h("p", { className: "asset-disclaimer" }, "Portrait placeholder: replace with approved licensed photography before publishing.")))) : null),
    h("div", { className: "sr-only", role: "status", "aria-live": "polite" }, `Current section: ${active}`));
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
:root{font-family:'DM Sans',Arial,sans-serif;color:#f4f1eb;background:#080a0f;font-synthesis:none;text-rendering:optimizeLegibility;--gold:#c8a96a;--navy:#071426;--cream:#f2efe8;--muted:#a8a8a5;--serif:'Playfair Display',Georgia,serif}*{box-sizing:border-box}html{scroll-behavior:auto;background:#080a0f}body{margin:0;background:#080a0f;color:var(--cream);overflow-x:hidden}button{font:inherit;color:inherit}button:focus-visible,a:focus-visible{outline:2px solid var(--gold);outline-offset:4px}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.scroll-progress{position:fixed;z-index:1000;top:0;left:0;width:100%;height:2px;background:var(--gold);transform-origin:left;pointer-events:none}.custom-cursor{position:fixed;z-index:1001;top:-7px;left:-7px;width:14px;height:14px;border:1px solid rgba(230,211,169,.9);border-radius:50%;pointer-events:none;mix-blend-mode:difference;transition:width .2s,height .2s,background .2s}.custom-cursor.is-hover{width:28px;height:28px;background:rgba(200,169,106,.25)}.crest-mark{position:relative;flex:none;display:grid;place-items:center;border:1px solid rgba(200,169,106,.75);border-radius:50% 50% 44% 44%;color:var(--gold);font:600 16px var(--serif);letter-spacing:-5px;padding-right:4px;transform:rotate(-8deg)}.crest-mark i,.crest-mark b{font-style:normal;font-size:.68em}.crest-mark small{position:absolute;top:-7px;right:2px;font:9px sans-serif;letter-spacing:0;color:#efe5ce}.floating-nav{position:fixed;z-index:100;top:20px;left:50%;transform:translateX(-50%);width:min(1250px,calc(100% - 56px));height:60px;padding:0 21px;display:flex;align-items:center;justify-content:space-between;background:rgba(9,12,17,.55);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(18px);border-radius:3px}.brand{display:flex;align-items:center;gap:12px;padding:0;border:0;background:none;text-align:left;cursor:pointer;font-size:11px;letter-spacing:.14em}.brand span{display:grid;gap:4px}.brand small{color:#a9a49a;font-size:8px;letter-spacing:.18em}.nav-links{display:flex;align-items:center;gap:clamp(14px,2.2vw,32px)}.nav-links button,.footer-bottom button{padding:8px 0;border:0;background:none;color:#c8c7c3;font-size:9px;letter-spacing:.12em;cursor:pointer;transition:color .2s}.nav-links button:hover,.nav-links button.active,.footer-bottom button:hover{color:var(--gold)}.menu-toggle{display:none;background:none;border:0;cursor:pointer}.hero{height:100svh;min-height:720px;position:relative;display:flex;align-items:center;overflow:hidden;background:#0a1118}.hero-image,.hero-shade,.hero-scene,.stadium-image,.stadium-overlay,.stadium-scene,.footer-image,.footer-shade{position:absolute;inset:0}.hero-image{background-size:cover;background-position:center 48%;opacity:.43;transform:scale(1.04);filter:saturate(.58)}.hero-shade{background:linear-gradient(90deg,rgba(5,10,17,.92) 0%,rgba(5,10,17,.65) 44%,rgba(5,10,17,.2) 100%),linear-gradient(0deg,#080a0f 0%,transparent 32%,rgba(6,10,15,.1) 80%,rgba(6,10,15,.7) 100%)}.hero-scene{inset:11% 2% 10% 43%;opacity:.82}.hero-copy{position:relative;z-index:2;margin-left:max(8.2vw,50px);margin-top:18px;width:min(700px,58vw)}.eyebrow{display:flex;align-items:center;gap:10px;color:var(--gold);font-size:9px;font-weight:600;letter-spacing:.23em;text-transform:uppercase}.eyebrow i{display:inline-block;width:22px;height:1px;background:var(--gold)}.hero-eyebrow svg{stroke:var(--gold)}.hero h1{margin:20px 0 10px;font-size:clamp(86px,12.8vw,190px);line-height:.78;letter-spacing:-.09em;font-weight:500}.hero h1 em{font-family:var(--serif);font-style:italic;font-weight:500;letter-spacing:-.08em}.hero-rule{width:72px;height:1px;background:var(--gold);margin:31px 0 19px}.hero-copy h2{font-size:12px;letter-spacing:.23em;font-weight:500}.hero-copy p{max-width:390px;color:#ccc9c1;font-size:14px;line-height:1.8}.gold-button{display:inline-flex;align-items:center;justify-content:center;gap:25px;margin-top:22px;padding:15px 19px;border:1px solid rgba(200,169,106,.8);background:rgba(200,169,106,.08);color:#f1e7d1;font-size:9px;letter-spacing:.16em;cursor:pointer;transition:background .25s,color .25s,transform .25s}.gold-button:hover{background:var(--gold);color:#101010;transform:translateY(-2px)}.hero-bottom{position:absolute;z-index:4;bottom:31px;left:5.2%;right:5.2%;display:flex;align-items:center;justify-content:space-between;color:#c1bdb4;font-size:8px;letter-spacing:.16em}.sound-toggle,.scroll-cue{display:flex;align-items:center;gap:8px;background:none;border:0;color:#ddd4c4;font-size:8px;letter-spacing:.13em;cursor:pointer}.scroll-cue{border:1px solid rgba(255,255,255,.3);width:35px;height:35px;justify-content:center;border-radius:50%;transition:border-color .2s,transform .2s}.scroll-cue:hover{border-color:var(--gold);transform:translateY(3px)}.hero-caption{position:absolute;right:5.3%;top:50%;writing-mode:vertical-rl;color:rgba(255,255,255,.55);font-size:8px;letter-spacing:.25em}.section-pad{padding:130px max(8vw,40px)}.heritage{background:#f1eee7;color:#10151a}.section-heading{max-width:670px}.section-heading h2,.present-heading h2,.manager-intro h2,.trophy-top h2,.stadium-copy h2{white-space:pre-line;font-family:var(--serif);font-size:clamp(55px,8vw,112px);font-weight:500;line-height:.93;letter-spacing:-.055em;margin:24px 0}.section-heading>p{color:#66655f;font-size:14px;line-height:1.8;max-width:460px}.heritage-intro{display:grid;grid-template-columns:1.15fr .85fr;gap:9vw;align-items:end}.heritage .section-heading h2{font-size:clamp(66px,8.7vw,120px)}.heritage-copy{padding-bottom:8px}.heritage-copy>p{color:#4f504f;font-size:14px;line-height:1.95;margin:0 0 18px}.president-note{display:flex;gap:12px;align-items:flex-start;border-top:1px solid #d6d1c5;padding-top:18px;margin-top:26px;color:#625b4e;font-size:11px;line-height:1.7}.president-note svg{flex:none;color:#a3834f}.president-note b{color:#171a1d}.heritage-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #d4d0c7;border-bottom:1px solid #d4d0c7;margin:85px 0 92px;padding:28px 0}.heritage-stats>div{display:grid;gap:5px;padding-left:24px;border-left:1px solid #d4d0c7}.heritage-stats>div:first-child{border:0;padding-left:0}.heritage-stats strong{font:500 clamp(36px,5vw,65px) var(--serif);color:#1b2022}.heritage-stats span{font-size:8px;letter-spacing:.17em;color:#716b5e}.heritage-image-block{position:relative}.archive-image{height:clamp(260px,47vw,620px);background-size:cover;background-position:center 45%;display:flex;align-items:flex-end;padding:34px}.archive-image span{font:italic 22px var(--serif);letter-spacing:.04em}.image-caption{display:flex;justify-content:space-between;padding-top:12px;color:#79756c;font-size:8px;letter-spacing:.17em}.timeline-heading{display:flex;justify-content:space-between;align-items:end;margin:125px 0 45px}.timeline-heading h3{font:500 clamp(45px,6vw,78px)/.98 var(--serif);white-space:pre-line;margin:18px 0 0}.timeline-controls{display:flex;align-items:center;gap:16px;color:#767166;font-size:9px;letter-spacing:.13em}.timeline-controls button{width:39px;height:39px;display:grid;place-items:center;border:1px solid #c9c4b9;background:none;color:#171a1d;cursor:pointer}.timeline-controls button:hover{border-color:#9b7b46;color:#9b7b46}.timeline-window{overflow:hidden;margin-right:-9vw}.timeline-track{display:flex;gap:0;width:max-content}.timeline-item{position:relative;width:300px;padding:0 35px 0 0;border:0;background:none;text-align:left;color:#15191b;cursor:pointer;white-space:normal}.timeline-year{font:500 38px var(--serif);color:#a08453}.timeline-dot{display:block;width:8px;height:8px;background:#a88e5e;border-radius:50%;margin:20px 0 20px;position:relative}.timeline-dot:after{position:absolute;content:"";height:1px;width:320px;left:8px;top:4px;background:#c9c4b9}.timeline-item h4{font:500 20px var(--serif);margin:0 0 10px}.timeline-item p{font-size:11px;color:#686760;line-height:1.7;max-width:240px;margin:0}.timeline-read{display:flex;align-items:center;gap:7px;margin-top:17px;color:#9b7b46;font-size:8px;letter-spacing:.13em;opacity:0;transition:opacity .2s}.timeline-item:hover .timeline-read,.timeline-item.selected .timeline-read{opacity:1}.dark-section{background:#090c11}.bernabeu{height:min(900px,100svh);min-height:740px;position:relative;overflow:hidden;background:#10151c}.stadium-image{background-size:cover;background-position:center 45%;opacity:.48;filter:saturate(.68)}.stadium-overlay{background:linear-gradient(90deg,rgba(7,10,15,.94),rgba(7,10,15,.73) 48%,rgba(7,10,15,.38)),linear-gradient(0deg,rgba(7,10,15,.65),transparent 55%)}.stadium-scene{left:43%;top:8%;bottom:4%;opacity:.8}.stadium-copy{position:absolute;z-index:2;left:max(8vw,45px);top:50%;transform:translateY(-50%);width:min(520px,43vw)}.stadium-copy h2{font-size:clamp(55px,7.5vw,94px);margin:25px 0}.stadium-copy>p{font-size:13px;line-height:1.9;color:#d1d0cb;max-width:445px}.stadium-facts{display:flex;gap:36px;margin-top:31px;padding-top:22px;border-top:1px solid rgba(255,255,255,.2)}.stadium-facts div{display:grid;gap:6px}.stadium-facts b{font:500 25px var(--serif);color:var(--gold)}.stadium-facts span{font-size:8px;letter-spacing:.15em;color:#cbc6b9}.text-link{display:flex;align-items:center;gap:12px;margin-top:31px;padding:0;border:0;background:none;color:#eee4cf;font-size:9px;letter-spacing:.15em;cursor:pointer}.image-source-note{display:block;margin-top:20px;color:#b6b3ab;font-size:9px}.legends{padding-top:130px;padding-bottom:140px}.section-topline{display:flex;justify-content:space-between;color:#96948d;font-size:8px;letter-spacing:.16em}.legends .section-heading{margin:60px 0 65px}.legends .section-heading h2,.manager-intro h2{font-size:clamp(63px,9vw,120px)}.legends .section-heading>p{color:#aaa9a3}.player-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:36px 18px}.player-card{position:relative;text-align:left;padding:0;border:0;background:none;cursor:pointer;overflow:hidden}.portrait{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;aspect-ratio:4/5;overflow:hidden;background:linear-gradient(145deg,#272a2d,#111316 72%);color:#e9e0cf;transition:filter .4s,transform .45s}.portrait:before{content:"";position:absolute;inset:10% 12% 0;background:radial-gradient(ellipse at 50% 32%,rgba(226,215,190,.18),transparent 47%),linear-gradient(180deg,transparent 35%,rgba(5,7,10,.9));border:1px solid rgba(207,180,125,.1);border-radius:48% 48% 3px 3px}.portrait-glow{position:absolute;inset:-30% 0 auto;height:60%;background:radial-gradient(ellipse,rgba(200,169,106,.17),transparent 65%);opacity:.6;transition:opacity .35s}.portrait strong{position:relative;z-index:1;font:500 clamp(64px,10vw,135px)/1 var(--serif);letter-spacing:-.08em;color:rgba(235,225,204,.78);text-shadow:0 0 35px rgba(200,169,106,.2);margin-bottom:20%}.portrait-label,.portrait small{position:absolute;z-index:2;left:15px;color:rgba(224,217,202,.55);font-size:7px;letter-spacing:.17em}.portrait-label{top:15px}.portrait small{bottom:12px;font-size:6px}.player-card:hover .portrait,.manager-card:hover .portrait{filter:brightness(1.16)}.player-card:hover .portrait-glow{opacity:1}.player-card-meta{position:relative;padding:14px 29px 0 0}.player-card-meta>span,.manager-card-info>span{color:#a99266;font-size:8px;letter-spacing:.16em}.player-card-meta h3{margin:7px 0 4px;font:500 21px var(--serif)}.player-card-meta p{margin:0;color:#989894;font-size:10px}.player-card-meta svg{position:absolute;right:0;top:24px;color:#c2a56e;opacity:.7}.asset-disclaimer{margin-top:30px;color:#87867f;font-size:9px;line-height:1.7;letter-spacing:.03em}.present{background:#eeece6;color:#15191b}.present-heading,.manager-intro,.trophy-top{display:flex;align-items:end;justify-content:space-between;gap:40px;margin-bottom:58px}.present-heading h2,.trophy-top h2{font-size:clamp(62px,8vw,105px);margin-bottom:0}.present-heading>p,.trophy-top>p,.manager-intro>p{max-width:345px;color:#676862;font-size:13px;line-height:1.85}.present-grid .portrait{background:linear-gradient(145deg,#d6d2c8,#98958e 72%);color:#252522}.present-grid .portrait:before{background:radial-gradient(ellipse at 50% 32%,rgba(250,247,237,.4),transparent 48%),linear-gradient(180deg,transparent 30%,rgba(26,28,29,.82));border-color:rgba(120,96,55,.16)}.present-grid .portrait strong{color:rgba(245,242,231,.86)}.present-grid .portrait-label,.present-grid .portrait small{color:rgba(255,255,255,.72)}.present-grid .player-card-meta p{color:#6e6d67}.present-grid .player-card-meta h3{color:#161a1b}.managers{overflow:hidden}.manager-intro{margin-bottom:48px}.manager-intro h2{margin-bottom:0}.manager-intro>p{color:#aaa9a3}.manager-track{display:grid;grid-template-columns:repeat(5,minmax(190px,1fr));gap:17px}.manager-card{position:relative;padding:0;background:none;border:0;text-align:left;cursor:pointer}.manager-index{position:absolute;z-index:2;top:12px;left:14px;color:#e8d8b7;font:italic 14px var(--serif)}.manager-card .portrait{aspect-ratio:3/4}.manager-card-info{position:relative;padding:15px 22px 0 0}.manager-card-info h3{font:500 19px var(--serif);margin:7px 0}.manager-card-info p{font-size:9px;color:#aaa9a3}.manager-card-info svg{position:absolute;right:0;top:22px;color:var(--gold)}.trophies{background:#f1eee7;color:#171a1b}.trophy-top{margin-bottom:55px}.trophy-top h2{font-size:clamp(64px,8.8vw,112px)}.trophy-top>p{color:#66665f}.trophy-experience{display:grid;grid-template-columns:1fr 1fr;gap:7vw;align-items:center}.trophy-canvas{position:relative;height:500px;background:radial-gradient(ellipse at 50% 52%,#e0d7c2,#d4d0c6 40%,#eeeae2 75%);overflow:hidden}.trophy-canvas canvas{position:absolute;inset:0}.trophy-caption{position:absolute;left:22px;right:22px;bottom:19px;display:flex;justify-content:space-between;color:#625b4f;font-size:8px;letter-spacing:.15em}.trophy-list{border-top:1px solid #cbc6ba}.trophy-row{display:grid;grid-template-columns:34px 1fr 42px 20px;gap:10px;align-items:center;width:100%;padding:19px 0;border:0;border-bottom:1px solid #cbc6ba;background:none;color:#1a1c1d;text-align:left;cursor:pointer;transition:padding .2s,color .2s}.trophy-row:hover,.trophy-row.selected{padding-left:8px;color:#957442}.trophy-row>span:first-child{font-size:8px;color:#9a927f}.trophy-title{font:500 15px var(--serif)}.trophy-row strong{font:500 27px var(--serif)}.trophy-row svg{color:#a98d59}.trophy-detail{min-height:90px;margin-top:20px}.trophy-detail .eyebrow{font-size:8px}.trophy-detail p{color:#68665f;font-size:11px;line-height:1.8}.footer{position:relative;min-height:540px;padding:105px max(8vw,40px) 25px;overflow:hidden;background:#080a0f}.footer-image{background-size:cover;background-position:center 55%;opacity:.3;filter:grayscale(.4)}.footer-shade{background:linear-gradient(90deg,rgba(5,8,12,.93),rgba(5,8,12,.6)),linear-gradient(0deg,#080a0f,transparent 65%)}.footer-main{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start}.footer-main .eyebrow{margin-top:35px}.footer-main h2{font:500 clamp(58px,8vw,105px)/.98 var(--serif);letter-spacing:-.04em;white-space:pre-line;margin:20px 0}.footer-bottom{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:90px;border-top:1px solid rgba(255,255,255,.2);padding-top:21px;color:#a6a39b;font-size:8px;letter-spacing:.12em}.footer-bottom div{display:flex;gap:16px}.footer-bottom button{font-size:8px}.modal-backdrop{position:fixed;z-index:1200;inset:0;display:grid;place-items:center;padding:24px;background:rgba(3,5,8,.84);backdrop-filter:blur(10px)}.profile-modal{position:relative;display:grid;grid-template-columns:minmax(230px,.8fr) 1.2fr;width:min(900px,100%);max-height:min(740px,90vh);overflow:auto;background:#11151a;border:1px solid rgba(200,169,106,.35);box-shadow:0 30px 90px rgba(0,0,0,.5)}.modal-close{position:absolute;z-index:3;right:17px;top:17px;width:39px;height:39px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);background:rgba(0,0,0,.3);cursor:pointer}.modal-portrait{min-height:500px}.portrait-large{height:100%;min-height:500px}.portrait-large strong{font-size:clamp(100px,18vw,210px)}.modal-content{align-self:center;padding:55px 48px}.modal-content h2{font:500 clamp(40px,5vw,65px)/1 var(--serif);margin:20px 0}.profile-meta{display:flex;align-items:center;gap:10px;color:#b5b1a7;font-size:9px;letter-spacing:.08em}.profile-meta i{width:3px;height:3px;background:var(--gold);border-radius:50%}.shirt-number{font:italic 20px var(--serif);color:var(--gold)}.profile-detail{margin:28px 0;color:#c3c1ba;font-size:13px;line-height:1.9}.profile-stats{display:flex;flex-wrap:wrap;gap:8px}.profile-stats span{padding:9px 11px;border:1px solid rgba(200,169,106,.35);color:#e4d3b0;font-size:8px;letter-spacing:.08em}.modal-content .asset-disclaimer{margin-top:24px}.webgl-fallback{height:100%;display:grid;place-items:center;color:#cab88e;font:italic 24px var(--serif)}
@media(min-width:1500px){.section-pad{padding-left:max(11vw,120px);padding-right:max(11vw,120px)}.hero-copy{margin-left:11vw}.stadium-copy{left:11vw}.player-grid{gap:45px 24px}}@media(max-width:1000px){.floating-nav{width:calc(100% - 28px);padding:0 13px}.nav-links{gap:12px}.nav-links button{font-size:8px}.brand{gap:8px}.brand small{font-size:7px}.heritage-intro{gap:5vw}.player-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.manager-track{grid-template-columns:repeat(5,minmax(170px,1fr));overflow-x:auto;padding-bottom:15px}.manager-track::-webkit-scrollbar{height:3px}.manager-track::-webkit-scrollbar-thumb{background:#8c764e}.trophy-experience{gap:4vw}.trophy-canvas{height:440px}.footer-bottom{flex-wrap:wrap}.footer-bottom>span:first-child{width:100%}}@media(max-width:760px){.custom-cursor{display:none}.floating-nav{top:10px;height:54px}.brand{font-size:10px}.brand .crest-mark{width:33px!important;height:33px!important}.menu-toggle{display:grid;place-items:center;color:#f0e7d6}.nav-links{position:absolute;top:calc(100% + 8px);left:0;right:0;display:none;flex-direction:column;align-items:stretch;gap:0;padding:10px 18px;background:rgba(9,12,17,.95);border:1px solid rgba(255,255,255,.15);backdrop-filter:blur(18px)}.nav-open .nav-links{display:flex}.nav-links button{text-align:left;padding:14px 4px;border-bottom:1px solid rgba(255,255,255,.08);font-size:10px}.nav-links button:last-child{border:0}.hero{min-height:700px;height:100svh}.hero-image{background-position:55% center}.hero-shade{background:linear-gradient(90deg,rgba(5,10,17,.83),rgba(5,10,17,.46)),linear-gradient(0deg,#080a0f,transparent 45%,rgba(6,10,15,.45))}.hero-scene{inset:19% -7% 16% 35%;opacity:.65}.hero-copy{margin-left:7vw;width:88vw;margin-top:35px}.hero h1{font-size:clamp(85px,19vw,145px)}.hero-copy h2{font-size:10px;letter-spacing:.16em}.hero-copy p{max-width:300px;font-size:12px}.hero-caption{right:4%;font-size:7px}.hero-bottom{left:6%;right:6%;bottom:20px;font-size:7px}.section-pad{padding:88px 7vw}.heritage-intro{grid-template-columns:1fr;gap:24px}.heritage .section-heading h2{font-size:clamp(65px,15vw,100px)}.heritage-copy{max-width:590px}.heritage-stats{margin:55px 0;padding:20px 0}.heritage-stats>div{padding-left:10px}.heritage-stats strong{font-size:clamp(30px,8vw,50px)}.heritage-stats span{font-size:7px;letter-spacing:.08em}.archive-image{height:65vw;min-height:240px;padding:20px}.archive-image span{font-size:16px;max-width:250px}.timeline-heading{margin:80px 0 35px;align-items:end}.timeline-heading h3{font-size:50px}.timeline-window{overflow-x:auto;margin-right:-7vw;padding-bottom:12px}.timeline-track{transform:none!important}.timeline-item{width:260px;padding-right:25px}.timeline-item p{font-size:10px}.timeline-read{opacity:1}.timeline-controls{gap:7px}.timeline-controls button{width:34px;height:34px}.bernabeu{min-height:850px;height:auto}.stadium-image{background-position:center}.stadium-overlay{background:linear-gradient(90deg,rgba(7,10,15,.88),rgba(7,10,15,.58)),linear-gradient(0deg,rgba(7,10,15,.8),transparent)}.stadium-scene{inset:42% 0 0 12%;opacity:.6}.stadium-copy{left:7vw;right:7vw;top:12%;transform:none;width:auto}.stadium-copy h2{font-size:64px}.stadium-copy>p{font-size:12px}.stadium-facts{gap:24px}.legends .section-heading{margin:45px 0}.section-heading h2,.present-heading h2,.manager-intro h2,.trophy-top h2{font-size:clamp(55px,13vw,84px)}.player-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 12px}.player-card-meta h3{font-size:18px}.player-card-meta>span{font-size:7px}.present-heading,.manager-intro,.trophy-top{display:block;margin-bottom:40px}.present-heading>p,.trophy-top>p,.manager-intro>p{margin-top:24px}.manager-track{grid-template-columns:repeat(5,210px);margin-right:-7vw}.manager-card .portrait{aspect-ratio:3/4}.trophy-experience{grid-template-columns:1fr;gap:28px}.trophy-canvas{height:360px}.trophy-row{grid-template-columns:27px 1fr 35px 16px;padding:16px 0}.trophy-title{font-size:13px}.footer{padding:80px 7vw 20px;min-height:590px}.footer-main h2{font-size:68px}.footer-bottom{margin-top:65px;gap:15px}.footer-bottom div{flex-wrap:wrap;gap:12px}.footer-bottom>span:last-child{margin-left:auto}.profile-modal{display:block;width:min(520px,100%);max-height:90vh}.modal-portrait{height:35vh;min-height:220px;max-height:300px}.portrait-large{min-height:220px}.portrait-large strong{font-size:100px}.modal-content{padding:30px 26px 35px}.modal-content h2{font-size:42px}.profile-detail{font-size:12px;margin:20px 0}.profile-meta{flex-wrap:wrap}.modal-close{top:10px;right:10px}.image-source-note{font-size:8px}}@media(max-width:380px){.hero h1{font-size:78px}.section-pad{padding-left:6vw;padding-right:6vw}.player-grid{gap:24px 9px}.player-card-meta h3{font-size:16px}.heritage-stats strong{font-size:28px}.heritage-stats span{font-size:6px}.stadium-copy h2{font-size:55px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.hero-scene{opacity:.5}}
`;

export default App;

// Optional standalone entry point: mount this file directly with Vite by setting
// it as the entry module, or import App from this file in your own main.ts.
if (typeof document !== "undefined" && document.getElementById("root") && !document.querySelector("[data-app-mounted='true']")) {
  const rootElement = document.getElementById("root");
  if (rootElement && rootElement.childElementCount === 0) {
    rootElement.setAttribute("data-app-mounted", "true");
    createRoot(rootElement).render(h(React.StrictMode, null, h(App)));
  }
}
