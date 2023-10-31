import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: absolute;
    font-size: 64px;
    cursor: pointer;
`;

const Sparkle = styled.div`
    position: absolute;
    font-size: 64px;
`;

const BouncingDiv = ({ setActivatedYippee, setActivatedSkippee, noScoreAllowed, setNoScoreAllowed }) => {
    const boxRef = useRef();
    const [yipOrSkip, setYipOrSkip] = useState('yippee')
    const [showSparkles, setShowSparkles] = useState(false)
    const [sparkleCoords, setSparkleCoords] = useState([0, 0])

    const toggle = event => {
        if (!noScoreAllowed) {
            const newYipOrSkip = yipOrSkip === 'yippee' ? 'skippee' : 'yippee'
            const x = event.pageX
            const y = event.pageY

            if (newYipOrSkip === 'yippee') {
                setActivatedSkippee(true);
                setNoScoreAllowed(true)
            } else if (newYipOrSkip === 'skippee') {
                setActivatedYippee(true);
            }

            setYipOrSkip(newYipOrSkip)
            setSparkleCoords([x, y])
            setShowSparkles(true)
            setTimeout(() => {
                setShowSparkles(false)
            }, 500)
        }
    }

    useEffect(() => {
        const box = boxRef.current;
        let x = Math.random() * (window.innerWidth - box.offsetWidth);
        let y = Math.random() * (window.innerHeight - box.offsetHeight);
        let dx = (Math.random() - 0.5) * 7;
        let dy = (Math.random() - 0.5) * 7;
        const animate = () => {
            if (x < 20 || x > window.innerWidth - box.offsetWidth - 20) dx = -dx;
            if (y < 20 || y > window.innerHeight - box.offsetHeight - 20) dy = -dy;
            x += dx;
            y += dy;
            box.style.left = x + 'px';
            box.style.top = y + 'px';
            requestAnimationFrame(animate);
        }

        animate();
    }, []);


    return (
        <>
            <Box ref={boxRef} onClick={toggle} className={`${showSparkles ? 'sparkle' : ''}`}>{yipOrSkip}</Box>
            {showSparkles && <Sparkle className="sparkle" style={{ left: sparkleCoords[0], top: sparkleCoords[1] }}>✨</Sparkle>}
        </>
    )
}

export default BouncingDiv