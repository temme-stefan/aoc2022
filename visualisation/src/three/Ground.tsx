export function Ground() {
    return <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 300]}/>
        <meshStandardMaterial color="lightgreen" transparent/>
    </mesh>;
}
