import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: absolute;
    font-size: 64px;
    cursor: pointer;
`;

const BouncingDiv = () => {
    const boxRef = useRef();
    const [yipOrSkip, setYipOrSkip] = useState('yippee')

    const toggle = () => {
        const newYipOrSkip = yipOrSkip === 'yippee' ? 'skippee' : 'yippee'
        setYipOrSkip(newYipOrSkip)
    }

    useEffect(() => {
        const box = boxRef.current;
        let x = Math.random() * (window.innerWidth - box.offsetWidth);
        let y = Math.random() * (window.innerHeight - box.offsetHeight);
        let dx = (Math.random() - 0.5) * 12;
        let dy = (Math.random() - 0.5) * 12;
        const animate = () => {
            if (x < 0 || x > window.innerWidth - box.offsetWidth) dx = -dx;
            if (y < 0 || y > window.innerHeight - box.offsetHeight) dy = -dy;
            x += dx;
            y += dy;
            box.style.left = x + 'px';
            box.style.top = y + 'px';
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <Box ref={boxRef} onClick={toggle}>{yipOrSkip}</Box>;
}

export default BouncingDiv