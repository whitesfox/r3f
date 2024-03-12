import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { easing } from 'maath'
import { state } from './store'
import { useSnapshot } from 'valtio'
import { Vector2, Vector3 } from 'three'

export function App(props) {
  const position = [-2, 0, 10]
  const fov = 25
  const snap = useSnapshot(state)
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment files="sand.hdr" />
      {snap.boxs.map((item, index) => {
        console.log(index)
        return <Box key={index} id={item.id} color={item.color} pos={index / 2} />
      })}
      <OrbitControls enablePan={false} enableZoom={false} makeDefault />
    </Canvas>
  )
}

const num = new Vector3()
const num1 = new Vector2()

export function Box({ color, pos, id }) {
  const snap = useSnapshot(state)
  const ref = useRef()
  const refRot = useRef()
  const [statePosition, setStatePosition] = useState(0)
  console.log('id: ', id)
  console.log('state.selectedID: ', state.selectedID)

  useFrame((state, delta) => {
    easing.dampC(ref.current.color, color, 0.2, delta)
    easing.damp3(refRot.current.scale, snap.selectedID === id ? num.set(0.5, 0.5, 0.5) : num.set(0.3, 0.3, 0.3), 0.5, delta)
    easing.damp2(refRot.current.position, num1.set(pos, pos + statePosition, 0), 0.3, delta)
    if (snap.selectedID !== id) {
      refRot.current.rotation.y += 0.02
      refRot.current.rotation.x += 0.02
    }
  })

  return (
    <mesh
      position={[0, 0, pos]}
      scale={0.3}
      ref={refRot}
      onPointerOver={() => {
        // setStateScale(0.4)
        setStatePosition(0)
      }}
      onPointerDown={() => {
        state.selectedID = id
      }}
      onPointerOut={() => {
        // setStateScale(0.3)
        setStatePosition(0)
      }}>
      <boxGeometry />
      <meshStandardMaterial ref={ref} />
    </mesh>
  )
}
