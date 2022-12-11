import {Canvas} from "@react-three/fiber";
import CustomControlls from "./three/CustomControlls";
import {Ground} from "./three/Ground";
import {BouncingBalls} from "./three/BouncingBalls";
import {useEffect, useState} from "react";


function Scene() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);
    }, []);
    return (
        <Canvas>
            <CustomControlls/>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <BouncingBalls step={count}/>
            <Ground/>
        </Canvas>
    );

}

export default Scene;