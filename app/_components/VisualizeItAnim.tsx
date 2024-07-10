'use client'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
// Register ScrollTrigger plugin if needed
gsap.registerPlugin(ScrollTrigger);

const VisualizeItAnim = () => {
    const boxRef = useRef(null);
    const [displayText, setDisplayText] = useState('It.');
    useEffect(() => {
      gsap.set(boxRef.current, { transformOrigin: 'left bottom' }); // Set transform origin to left bottom corner
    gsap.to(boxRef.current, {
      rotation: 180, // Rotate 180 degrees (or any desired angle)
      duration: 1,
      transformOrigin: 'left bottom',
      y:-10,
      x:-40,
      ease: 'power2.inOut',
      onComplete: () => {
        setDisplayText('It............'); // Update text after animation completes
      } // Example easing function
    });
    }, [])
  return (
    <div className='md:text-9xl sm:text-4xl '>
      <h1 style={{ display: 'inline-block' }}>
        Visualize <span ref={boxRef} className='animated-text' style={{ display: 'inline-block' }}>{displayText}</span>
      </h1>
    </div>
  )
}

export default VisualizeItAnim