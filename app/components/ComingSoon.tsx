'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const ComingSoon = () => {
    const pageRef = useRef<HTMLDivElement>(null)

    const logoRef = useRef<HTMLDivElement>(null)
    const logoImageRef = useRef<HTMLImageElement>(null)

    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    const glowRef = useRef<HTMLDivElement>(null)
    const orbRef = useRef<HTMLDivElement>(null)

    const topTextRef = useRef<HTMLDivElement>(null)
    const bottomTextRef = useRef<HTMLDivElement>(null)

    const particlesRef = useRef<HTMLSpanElement[]>([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const page = pageRef.current

            if (!page) return

            // ----------------------------------------
            // INITIAL STATE
            // ----------------------------------------

            gsap.set(logoRef.current, {
                opacity: 0,
                scale: 0.5,
                y: 40,
            })

            gsap.set(logoImageRef.current, {
                opacity: 0,
                scale: 1,
                rotation: -10,
            })

            gsap.set(titleRef.current, {
                opacity: 0,
                y: 70,
            })

            gsap.set(subtitleRef.current, {
                opacity: 0,
                y: 25,
            })

            gsap.set(lineRef.current, {
                scaleX: 0,
                transformOrigin: 'center',
            })

            gsap.set(topTextRef.current, {
                opacity: 0,
                y: -15,
            })

            gsap.set(bottomTextRef.current, {
                opacity: 0,
                y: 15,
            })

            gsap.set(glowRef.current, {
                opacity: 0,
                scale: 0.5,
            })

            gsap.set(orbRef.current, {
                opacity: 0,
                scale: 0.4,
            })

            gsap.set(particlesRef.current, {
                opacity: 0,
                scale: 0,
            })

            // ----------------------------------------
            // MAIN ENTRANCE
            // ----------------------------------------

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            })

            tl.to(glowRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.8,
                ease: 'power2.out',
            })

            tl.to(
                orbRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'back.out(1.5)',
                },
                '-=1.4'
            )

            // Logo circle
            tl.to(
                logoRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.15,
                    ease: 'back.out(1.6)',
                },
                '-=0.8'
            )

            // Logo itself
            tl.to(
                logoImageRef.current,
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    ease: 'power3.out',
                },
                '-=0.75'
            )

            // Top text
            tl.to(
                topTextRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                '-=0.5'
            )

            // Main title
            tl.to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power4.out',
                },
                '-=0.35'
            )

            // Line
            tl.to(
                lineRef.current,
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: 'power3.inOut',
                },
                '-=0.55'
            )

            // Subtitle
            tl.to(
                subtitleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                },
                '-=0.4'
            )

            // Bottom text
            tl.to(
                bottomTextRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                '-=0.3'
            )

            // ----------------------------------------
            // PARTICLES
            // ----------------------------------------

            particlesRef.current.forEach((particle, index) => {
                const angle =
                    (index / particlesRef.current.length) *
                    Math.PI *
                    2

                const radius = 160 + Math.random() * 150

                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                tl.to(
                    particle,
                    {
                        opacity: 0.5 + Math.random() * 0.5,
                        scale: 0.7 + Math.random() * 0.8,
                        duration: 0.35,
                        ease: 'back.out(2)',
                    },
                    '-=0.7'
                )

                gsap.to(particle, {
                    x,
                    y,
                    duration: 3 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random(),
                })
            })

            // ----------------------------------------
            // INFINITE LOGO MOTION
            // ----------------------------------------

            gsap.to(logoRef.current, {
                y: -7,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            gsap.to(logoImageRef.current, {
                scale: 1.035,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            // ----------------------------------------
            // ORBIT ROTATION
            // ----------------------------------------

            gsap.to(orbRef.current, {
                rotation: 360,
                duration: 24,
                repeat: -1,
                ease: 'none',
            })

            // ----------------------------------------
            // GLOW BREATHING
            // ----------------------------------------

            gsap.to(glowRef.current, {
                scale: 1.12,
                opacity: 0.65,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            // ----------------------------------------
            // MOUSE PARALLAX
            // ----------------------------------------

            const handleMouseMove = (event: MouseEvent) => {
                const x =
                    (event.clientX / window.innerWidth - 0.5) * 2

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 2

                gsap.to(logoRef.current, {
                    x: x * 10,
                    y: y * 10,
                    duration: 1,
                    ease: 'power3.out',
                    overwrite: true,
                })

                gsap.to(glowRef.current, {
                    x: x * 35,
                    y: y * 35,
                    duration: 1.4,
                    ease: 'power3.out',
                    overwrite: true,
                })

                gsap.to(orbRef.current, {
                    x: x * -12,
                    y: y * -12,
                    duration: 1.2,
                    ease: 'power3.out',
                    overwrite: true,
                })
            }

            window.addEventListener('mousemove', handleMouseMove)

            // Cleanup event
            return () => {
                window.removeEventListener(
                    'mousemove',
                    handleMouseMove
                )
            }
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <main
            ref={pageRef}
            className="
                relative
                min-h-screen
                w-full
                overflow-hidden
                bg-[#faf9f7]
                text-black
            "
        >
            {/* ====================================== */}
            {/* BACKGROUND */}
            {/* ====================================== */}

            <div className="absolute inset-0 overflow-hidden">
                {/* Main radial light */}
                <div
                    ref={glowRef}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[500px]
                        w-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        blur-[110px]
                        opacity-0
                        bg-[radial-gradient(circle,rgba(236,72,153,0.10),rgba(234,179,8,0.08),rgba(37,99,235,0.05),transparent_70%)]
                    "
                />

                {/* Subtle grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
                        [background-size:70px_70px]
                    "
                />

                {/* Noise */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.4%22/%3E%3C/svg%3E')]
                    "
                />
            </div>

            {/* ====================================== */}
            {/* TOP BRAND MARK */}
            {/* ====================================== */}

            <div
                ref={topTextRef}
                className="
                    absolute
                    left-1/2
                    top-8
                    z-20
                    -translate-x-1/2
                    text-center
                "
            >
                <div
                    className="
                        text-[9px]
                        uppercase
                        tracking-[0.6em]
                        text-black/40
                    "
                >
                    A new beginning
                </div>
            </div>

            {/* ====================================== */}
            {/* CENTER CONTENT */}
            {/* ====================================== */}

            <section
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    flex-col
                    items-center
                    justify-center
                    px-6
                    pb-20
                    pt-20
                "
            >
                {/* ================================== */}
                {/* ORBIT */}
                {/* ================================== */}

                <div
                    ref={orbRef}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[360px]
                        w-[360px]
                        -translate-x-1/2
                        -translate-y-[58%]
                        rounded-full
                        border
                        border-black/[0.055]
                        md:h-[470px]
                        md:w-[470px]
                    "
                >
                    {/* orbit dots */}
                    <span
                        className="
                            absolute
                            left-1/2
                            top-[-3px]
                            h-[6px]
                            w-[6px]
                            -translate-x-1/2
                            rounded-full
                            bg-[#eab308]
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-[-3px]
                            left-1/2
                            h-[6px]
                            w-[6px]
                            -translate-x-1/2
                            rounded-full
                            bg-[#2563eb]
                        "
                    />

                    <span
                        className="
                            absolute
                            left-[-3px]
                            top-1/2
                            h-[6px]
                            w-[6px]
                            -translate-y-1/2
                            rounded-full
                            bg-[#22c55e]
                        "
                    />

                    <span
                        className="
                            absolute
                            right-[-3px]
                            top-1/2
                            h-[6px]
                            w-[6px]
                            -translate-y-1/2
                            rounded-full
                            bg-[#ec4899]
                        "
                    />
                </div>

                {/* ================================== */}
                {/* PARTICLES */}
                {/* ================================== */}

                {Array.from({ length: 24 }).map((_, index) => (
                    <span
                        key={index}
                        ref={(el) => {
                            if (el) {
                                particlesRef.current[index] = el
                            }
                        }}
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-[3px]
                            w-[3px]
                            rounded-full
                            bg-black/30
                        "
                    />
                ))}

                {/* ================================== */}
                {/* LOGO */}
                {/* ================================== */}

                <div
                    ref={logoRef}
                    className="
                        relative
                        z-10
                        mb-12
                        flex
                        overflow-hidden
                        h-[190px]
                        w-[190px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/[0.06]
                        bg-white/80
                        shadow-[0_25px_90px_rgba(0,0,0,0.10)]
                        backdrop-blur-sm
                        md:h-[245px]
                        md:w-[245px]
                    "
                >
                    {/* Inner circle */}
                    <div
                        className="
                            absolute
                            inset-[8px]
                            rounded-full
                            border
                            border-black/[0.035]
                        "
                    />

                    <img
                        ref={logoImageRef}
                        src="/logos/logo.jpeg"
                        alt="Foundation logo"
                        className="
                            relative
                            z-10
                            w-[155px]
                            object-contain
                            md:w-[200px]
                        "
                    />
                </div>

                {/* ================================== */}
                {/* TITLE */}
                {/* ================================== */}

                <div className="relative z-10 text-center">
                    <p
                        className="
                            mb-5
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.65em]
                            text-black/35
                        "
                    >
                        We are creating something meaningful
                    </p>

                    <h1
                        ref={titleRef}
                        className="
                            font-serif
                            text-[48px]
                            font-light
                            leading-[0.9]
                            tracking-[-0.04em]
                            text-black
                            sm:text-[64px]
                            md:text-[90px]
                            lg:text-[110px]
                        "
                    >
                        COMING
                        <br />

                        <span className="italic text-black/65">
                            SOON
                        </span>
                    </h1>

                    {/* Animated divider */}
                    <div
                        ref={lineRef}
                        className="
                            mx-auto
                            my-7
                            h-px
                            w-[100px]
                            bg-black/25
                            md:w-[150px]
                        "
                    />

                    <p
                        ref={subtitleRef}
                        className="
                            mx-auto
                            max-w-[430px]
                            text-[12px]
                            leading-6
                            tracking-[0.08em]
                            text-black/45
                            md:text-[13px]
                        "
                    >
                        A space built with purpose,
                        <br />
                        compassion and hope.
                    </p>
                </div>
            </section>

            {/* ====================================== */}
            {/* BOTTOM */}
            {/* ====================================== */}

            <div
                ref={bottomTextRef}
                className="
                    absolute
                    bottom-8
                    left-1/2
                    z-20
                    -translate-x-1/2
                    text-center
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        whitespace-nowrap
                        text-[8px]
                        uppercase
                        tracking-[0.45em]
                        text-black/30
                    "
                >
                    <span>Building</span>

                    <span className="h-1 w-1 rounded-full bg-black/25" />

                    <span>A better tomorrow</span>
                </div>
            </div>

            {/* ====================================== */}
            {/* CORNER DETAILS */}
            {/* ====================================== */}

            <div
                className="
                    absolute
                    bottom-8
                    left-8
                    hidden
                    text-[8px]
                    uppercase
                    tracking-[0.4em]
                    text-black/20
                    md:block
                "
            >
                2026
            </div>

            <div
                className="
                    absolute
                    bottom-8
                    right-8
                    hidden
                    text-[8px]
                    uppercase
                    tracking-[0.4em]
                    text-black/20
                    md:block
                "
            >
                Stay tuned
            </div>
        </main>
    )
}

export default ComingSoon