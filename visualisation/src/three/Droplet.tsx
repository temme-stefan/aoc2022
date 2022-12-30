import {Droplet_stardata} from "./data/DropletData";
import {Box3, BoxGeometry, Color, EdgesGeometry, LineBasicMaterial, MeshStandardMaterial, Vector3} from "three";
import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import {OrbitControls as OrbitControlsImpl} from "three-stdlib/controls/OrbitControls";

export function Droplet() {
    const geo = new BoxGeometry(1, 1, 1);
    const edge = new EdgesGeometry(geo);
    const mArea = new MeshStandardMaterial({color: "red"});
    const mLine = new LineBasicMaterial({color:"darkred"});
    const box = new Box3();
    Droplet_stardata.forEach(v => box.expandByPoint(v));
    const {controls, camera} = useThree()
    const c = box.getCenter(new Vector3());
    useEffect(() => {
        camera.position.set(box.min.x - 10, box.min.y - 10, box.min.z - 10);
        if (controls instanceof OrbitControlsImpl) {
            controls.target.copy(c);
        }
    }, [controls, camera])
    return (
        <>
            <pointLight key={"light_1"} position={[box.min.x - 10, 0, 0]} intensity={1}/>
            <pointLight key={"light_2"} position={[0, box.min.y - 10, 0]} intensity={0.9}/>
            <pointLight key={"light_3"} position={[0, 0, box.min.z - 10]} intensity={0.8}/>
            <pointLight key={"light_4"} position={[box.max.x + 10, 0, 0]} intensity={0.7}/>
            <pointLight key={"light_5"} position={[0, box.max.y + 10, 0]} intensity={0.6}/>
            <pointLight key={"light_6"} position={[0, 0, box.max.z + 10]} intensity={0.5}/>
            {
                Droplet_stardata.map((v,i) =>
                    <>
                        <mesh key={`m_${i}`} position={v} geometry={geo} material={mArea}/>
                        <lineSegments key={`l_${i}`} geometry={edge} position={v} material={mLine} />
                    </>
                )
            }
        </>
    )

}