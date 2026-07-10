import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 0, speed = 20, onComplete }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let timer;
    const startTypewriter = () => {
      timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, speed);
    };
    const delayTimer = setTimeout(startTypewriter, delay);
    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, delay, speed, onComplete]);

  return <span>{displayed}</span>;
};

export default TypewriterText;
