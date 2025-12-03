// FILE: TextReveal.jsx

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
// Kita asumsikan SplitText sudah terdaftar secara global atau diimpor di sini:
// Catatan: Jika Anda tidak mengimpor SplitText di sini, pastikan ia diimpor di App.jsx
// dan didaftarkan, atau Anda bisa coba impor dan daftarkan di sini jika itu cara kerjanya di setup Anda.
// Namun, mengikuti pola Shuffle.jsx, kita asumsikan registrasi dilakukan di entry point.

// Import dan definisikan GSAPSplitText (Asumsi ini dari 'gsap/SplitText')
// Jika Anda tidak mengimpornya di sini, pastikan di App.jsx Anda mengimpor dan mendaftarkannya sebelum TextReveal digunakan.
// Untuk keamanan, saya akan mengimpor dari 'gsap/SplitText' di App.jsx

const TextReveal = React.forwardRef(({ 
    text, 
    className = '', 
    tag = 'p', 
    delay = 0, 
    stagger = 0.05, 
    speed = 1.0, 
    colorTo 
}, ref) => {
    const el = useRef(null);
    const splitRef = useRef(null);

    // Dapatkan GSAPSplitText dari jendela global jika tidak diimpor
    // atau gunakan impor langsung jika lingkungan Anda mendukungnya.
    // Kita gunakan konvensi yang sama dengan Shuffle.jsx (mengandalkan pendaftaran global)
    const GSAPSplitText = window.SplitText; 

    useGSAP(() => {
        if (!el.current || !text || !GSAPSplitText) return;

        // 1. Clean up
        splitRef.current?.revert();
        
        // 2. Split text
        splitRef.current = new GSAPSplitText(el.current, { type: 'chars' });
        
        const chars = splitRef.current.chars || [];

        // 3. Set initial state (opacity 0, y small offset)
        // Jika colorTo ada, atur warna awal ke putih agar animasi warna terlihat
        gsap.set(chars, { 
            autoAlpha: 0, 
            y: 10, 
            color: colorTo ? '#FFFFFF' : null // Atur warna awal jika akan diubah
        });
        
        // 4. Animate in
        const tl = gsap.timeline({ delay: delay });
        
        tl.to(chars, {
            autoAlpha: 1,
            y: 0,
            duration: speed,
            ease: 'power3.out',
            stagger: stagger,
            // Animate warna jika colorTo diberikan
            color: colorTo || null
        });

    }, { dependencies: [text, delay, stagger, speed, colorTo], scope: el });

    const Tag = tag;
    return React.createElement(Tag, { ref: el, className: className }, text);
});

export default TextReveal;