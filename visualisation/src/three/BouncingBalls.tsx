import {useFrame, useThree} from "@react-three/fiber";
import {Color, Vector3, Mesh} from "three";
import {Ground} from "./Ground";
import {star10Balls as positions} from "./data/Positions";
import useDynamicRefs from "use-dynamic-refs";
import {useEffect, useState} from "react";
import {OrbitControls as OrbitControlsImpl} from "three-stdlib/controls/OrbitControls";


export function BouncingBalls() {
    const {camera, controls} = useThree();
    useEffect(() => {
        camera.position.set(0, 50, 0);
        if (controls instanceof OrbitControlsImpl) {
            controls.target.set(0, 0, 0);
        }
    }, [camera, controls]);


    const [getRef, setRef] = useDynamicRefs() as ((key: string) => (React.RefObject<Mesh>))[];
    const [visited, setVisited] = useState(new Set<{ x: number, y: number }>())
    const colors = ["red", "blue"]
    useFrame(({clock}) => {
        const tick = (clock.getElapsedTime() % positions.length) * 10;

        positions[0].forEach((start, i, a) => {
            const tack = tick - i * 0.1;
            const step = Math.min(Math.floor(tack), positions.length - 1);
            const target = Math.min(Math.floor(tack + 1), positions.length - 1);
            const ball = getRef("" + i);
            if (ball.current) {
                const from = new Vector3(positions[step][i].x, 0.5, positions[step][i].y)
                const to = new Vector3(positions[target][i].x, 0.5, positions[target][i].y);
                const pos = from.lerp(to, tack % 1);
                ball.current.position.copy(pos);
            }
            if (i == a.length - 1) {
                if (!visited.has(positions[step][i])) {
                    setVisited(new Set([...visited, positions[step][i]]))
                }
            }
            if (step == 0) {
                setVisited(new Set());
            }
        })
    })
    return <>
        <pointLight position={[10, 10, 10]}/>
        {positions[0].map(({x, y}, i) => <mesh position={[x, 0.5, y]} ref={setRef(i + "")}>
            <sphereGeometry args={[0.5 - i * 0.02, 32, 16]}/>
            <meshStandardMaterial
                color={new Color(colors[0]).lerp(new Color(colors[1]), (i + 1) / (positions[0].length))} transparent/>
        </mesh>)}
        {
            [...visited].map(({x, y}) => <mesh position={[x, 0, y]} rotation={[-Math.PI / 2, 0, 0]}>
                <sphereGeometry args={[0.3, 32, 16]}/>
                <meshStandardMaterial color={"hotpink"} transparent/>
            </mesh>)
        }
        <Ground/>
    </>;
}