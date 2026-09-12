'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const Loader = () => {
    const rootRef = useRef<HTMLDivElement>(null)

    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    const logoCircleRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLImageElement>(null)

    const ring1Ref = useRef<HTMLDivElement>(null)
    const ring2Ref = useRef<HTMLDivElement>(null)

    const loadingRef = useRef<HTMLDivElement>(null)
    const dotsRef = useRef<HTMLSpanElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    const particlesRef = useRef<HTMLSpanElement[]>([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const root = rootRef.current
            const top = topRef.current
            const bottom = bottomRef.current
            const logoCircle = logoCircleRef.current
            const logo = logoRef.current
            const ring1 = ring1Ref.current
            const ring2 = ring2Ref.current
            const loading = loadingRef.current
            const progress = progressRef.current

            if (
                !root ||
                !top ||
                !bottom ||
                !logoCircle ||
                !logo ||
                !loading
            ) {
                return
            }

            // ---------------------------------------
            // INITIAL STATES
            // ---------------------------------------

            gsap.set(root, {
                opacity: 1,
            })

            gsap.set([top, bottom], {
                yPercent: 0,
            })

            gsap.set(logoCircle, {
                scale: 0.45,
                opacity: 0,
            })

            gsap.set(logo, {
                scale: 0.7,
                opacity: 0,
                rotation: -8,
            })

            gsap.set([ring1, ring2], {
                scale: 0.4,
                opacity: 0,
            })

            gsap.set(loading, {
                opacity: 0,
                y: 15,
            })

            gsap.set(progress, {
                scaleX: 0,
                transformOrigin: 'left center',
            })

            gsap.set(particlesRef.current, {
                scale: 0,
                opacity: 0,
            })

            // ---------------------------------------
            // PARTICLES
            // ---------------------------------------

            particlesRef.current.forEach((particle, index) => {
                const angle =
                    (index / particlesRef.current.length) *
                    Math.PI *
                    2

                const distance = 140 + Math.random() * 110

                gsap.set(particle, {
                    x: 0,
                    y: 0,
                })

                gsap.to(particle, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    duration: 2.2 + Math.random() * 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 1,
                })
            })

            // ---------------------------------------
            // LOADING DOTS
            // ---------------------------------------

            const dots = {
                value: 0,
            }

            gsap.to(dots, {
                value: 3,
                duration: 1.2,
                repeat: -1,
                ease: 'steps(3)',
                onUpdate: () => {
                    if (dotsRef.current) {
                        dotsRef.current.textContent =
                            '.'.repeat(Math.max(0, Math.ceil(dots.value)))
                    }
                },
            })

            // ---------------------------------------
            // PROGRESS
            // ---------------------------------------

            gsap.to(progress, {
                scaleX: 1,
                duration: 3.3,
                ease: 'power2.inOut',
            })

            // ---------------------------------------
            // MAIN TIMELINE
            // ---------------------------------------

            const tl = gsap.timeline()

            // Rings appear first
            tl.to(
                ring2,
                {
                    scale: 1,
                    opacity: 0.18,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            )

            tl.to(
                ring1,
                {
                    scale: 1,
                    opacity: 0.3,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                '-=0.55'
            )

            // Circular logo background
            tl.to(
                logoCircle,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'back.out(1.7)',
                },
                '-=0.5'
            )

            // Logo itself
            tl.to(
                logo,
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 1.1,
                    ease: 'back.out(1.4)',
                },
                '-=0.6'
            )

            // Loading text
            tl.to(
                loading,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '-=0.5'
            )

            // ---------------------------------------
            // HOLD
            // ---------------------------------------

            tl.to({}, {
                duration: 1.1,
            })

            // ---------------------------------------
            // LOGO EXIT
            // ---------------------------------------

            tl.to(
                logoCircle,
                {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.45,
                    ease: 'power3.in',
                }
            )

            tl.to(
                loading,
                {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                },
                '<'
            )

            // ---------------------------------------
            // PARTICLE BURST
            // ---------------------------------------

            particlesRef.current.forEach((particle, index) => {
                const angle =
                    (index / particlesRef.current.length) *
                    Math.PI *
                    2

                const distance = 260 + Math.random() * 180

                tl.to(
                    particle,
                    {
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance,
                        scale: 1.4,
                        opacity: 0,
                        duration: 0.75,
                        ease: 'power3.out',
                    },
                    '<'
                )
            })

            // ---------------------------------------
            // PAGE REVEAL
            // ---------------------------------------

            tl.to(
                top,
                {
                    yPercent: -100,
                    duration: 1.25,
                    ease: 'expo.inOut',
                },
                '-=0.25'
            )

            tl.to(
                bottom,
                {
                    yPercent: 100,
                    duration: 1.25,
                    ease: 'expo.inOut',
                },
                '<'
            )

            // ---------------------------------------
            // REMOVE LOADER
            // ---------------------------------------

            tl.set(root, {
                display: 'none',
            })
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={rootRef}
            className="
                fixed
                inset-0
                z-[99999]
                overflow-hidden
                pointer-events-none
                bg-[#faf9f7]
            "
        >
            {/* ================================= */}
            {/* TOP PAGE PANEL */}
            {/* ================================= */}

            <div
                ref={topRef}
                className="
                    absolute
                    top-0
                    left-0
                    w-full
                    h-1/2
                    bg-[#faf9f7]
                    z-20
                "
            />

            {/* ================================= */}
            {/* BOTTOM PAGE PANEL */}
            {/* ================================= */}

            <div
                ref={bottomRef}
                className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    h-1/2
                    bg-[#faf9f7]
                    z-20
                "
            />

            {/* ================================= */}
            {/* CENTER LOGO SYSTEM */}
            {/* ================================= */}

            <div
                className="
                    absolute
                    inset-0
                    z-30
                    flex
                    items-center
                    justify-center
                "
            >
                <div
                    className="
                        relative
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                >
                    {/* -------------------------------- */}
                    {/* OUTER RING */}
                    {/* -------------------------------- */}

                    <div
                        ref={ring2Ref}
                        className="
                            absolute
                            w-[360px]
                            h-[360px]
                            md:w-[430px]
                            md:h-[430px]
                            rounded-full
                            border
                            border-black/[0.05]
                        "
                    />

                    {/* -------------------------------- */}
                    {/* INNER RING */}
                    {/* -------------------------------- */}

                    <div
                        ref={ring1Ref}
                        className="
                            absolute
                            w-[290px]
                            h-[290px]
                            md:w-[350px]
                            md:h-[350px]
                            rounded-full
                            border
                            border-black/[0.08]
                        "
                    />

                    {/* ================================= */}
                    {/* PARTICLES */}
                    {/* ================================= */}

                    {Array.from({ length: 18 }).map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => {
                                if (el) {
                                    particlesRef.current[index] = el
                                }
                            }}
                            className="
                                absolute
                                w-[4px]
                                h-[4px]
                                rounded-full
                                bg-black/25
                            "
                        />
                    ))}

                    {/* ================================= */}
                    {/* CIRCULAR LOGO CONTAINER */}
                    {/* ================================= */}

                    <div
                        ref={logoCircleRef}
                        className="
                            relative
                            w-[210px]
                            h-[210px]
                            md:w-[260px]
                            md:h-[260px]
                            rounded-full
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            bg-white
                            border
                            border-black/[0.06]
                            shadow-[0_25px_80px_rgba(0,0,0,0.12)]
                        "
                    >
                        {/* subtle inner glow */}
                        <div
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-[radial-gradient(circle,rgba(255,255,255,1)_35%,rgba(0,0,0,0.025)_100%)]
                            "
                        />

                        <img
                            ref={logoRef}
                            src="/logos/logo.jpeg"
                            alt="Logo"
                            className="
                                relative
                                z-10
                                w-[175px]
                                md:w-[215px]
                                h-auto
                                object-contain
                            "
                        />
                    </div>

                    {/* ================================= */}
                    {/* LOADING */}
                    {/* ================================= */}

                    <div
                        ref={loadingRef}
                        className="
                            absolute
                            top-full
                            mt-10
                            flex
                            flex-col
                            items-center
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                text-[10px]
                                uppercase
                                tracking-[0.5em]
                                text-black/45
                            "
                        >
                            <span>Loading</span>

                            <span
                                ref={dotsRef}
                                className="
                                    w-[18px]
                                    text-left
                                "
                            >
                                .
                            </span>
                        </div>

                        {/* Loading bar */}
                        <div
                            className="
                                mt-4
                                w-[130px]
                                md:w-[170px]
                                h-[1px]
                                overflow-hidden
                                bg-black/[0.08]
                            "
                        >
                            <div
                                ref={progressRef}
                                className="
                                    h-full
                                    w-full
                                    bg-black/40
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader