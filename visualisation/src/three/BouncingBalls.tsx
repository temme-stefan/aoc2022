import {useEffect, useRef, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

export function BouncingBalls({step = 0}) {
    const {clock} = useThree();
    const red = useRef<THREE.Mesh>(null);
    const blue = useRef<THREE.Mesh>(null);
    const [start, setStart] = useState(clock.getElapsedTime())
    const [curr, setCurr] = useState(step)

    useEffect(() => {
        setStart(clock.getElapsedTime());
        setCurr(step);
        }, [step]
    );

    function getY(step: number) {
        return [0, 0.5, 0, -0.5][step % 4];
    }

    useFrame(() => {
        if (blue.current != null) {
                const scalar = Math.min(1, (clock.getElapsedTime() - start));
                blue.current.position.setY(2 + scalar * getY(curr));
        }
    })

    return <>
        <mesh position={[0, 1, 0]} ref={red}>
            <sphereGeometry args={[0.5, 32, 16]}/>
            <meshStandardMaterial color="red" transparent/>
        </mesh>
        <mesh position={[0, 2, 0]} ref={blue}>
            <sphereGeometry args={[0.5, 32, 16]}/>
            <meshStandardMaterial color="blue" transparent/>
        </mesh>
    </>;
}