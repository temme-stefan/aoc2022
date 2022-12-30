import {Canvas} from "@react-three/fiber";
import CustomControlls from "./three/CustomControlls";
import {BouncingBalls} from "./three/BouncingBalls";
import {Droplet} from "./three/Droplet";


function Scene() {
    return (
        <Canvas>
            <CustomControlls/>
            <ambientLight/>
            <Droplet/>
            {/*<BouncingBalls/>*/}
        </Canvas>
    );

}

export default Scene;