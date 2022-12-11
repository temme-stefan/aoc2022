export function Ground() {
    return <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]}/>
        <meshStandardMaterial color="lightgreen" transparent/>
    </mesh>;
}
