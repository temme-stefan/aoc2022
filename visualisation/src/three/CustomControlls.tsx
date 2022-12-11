import {useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {OrbitControls} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const CustomControlls = ()=>{
    const{camera}= useThree();
    const ref = useRef<OrbitControlsImpl>(null);

    useEffect(()=> {
        camera.position.set(0, 1.8, 4);
        ref.current?.update();
    });

    return (
        <OrbitControls makeDefault enablePan={false} target={[0,0,0]} ref={ref}/>
    )




}

export default CustomControlls;