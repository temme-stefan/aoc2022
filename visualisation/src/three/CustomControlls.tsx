import {useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {OrbitControls} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const CustomControlls = ()=>{
    return (
        <OrbitControls makeDefault enablePan={false} target={[0,0,0]} />
    )




}

export default CustomControlls;