import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import { easing, vector2 } from 'maath'
import { state } from './store'
import { useSnapshot } from 'valtio'
import { Scene, Vector2, Vector3 } from 'three'

export function App(props) {
  const position = [-2, 0, 10]
  const fov = 25
  const snap = useSnapshot(state)
  const [selectedBox, setSelectedBox] = useState(1)
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment files="sand.hdr" />
      {snap.boxs.map((item, index) => {
        return <Box key={index} id={item.id} color={item.color} pos={item.pos} selectedBox={selectedBox} setSelectedBox={setSelectedBox} />
      })}
      <OrbitControls enablePan={false} enableZoom={false} makeDefault />
    </Canvas>
  )
}

const num = new Vector3()
const num1 = new Vector2()
// const boxposition = new Vector2();

export function Box({ color, pos, id, selectedBox, setSelectedBox }) {
  const snap = useSnapshot(state)
  const ref = useRef()
  const refRot = useRef()
  const [stateScale, setStateScale] = useState(0.3)
  const [statePosition, setStatePosition] = useState(0)

  const handleClick = (selectedId) => {
    setSelectedBox(selectedId)
  }

  useEffect(() => {
    let newBoxs = []
    snap.boxs.forEach((box) => {
      if (box.id == selectedBox) {
        newBoxs.push({ ...box, color: snap.color })
      } else {
        newBoxs.push({ ...box })
      }
    })
    state.boxs = newBoxs
  }, [snap.color])

  // const [stateBoxadd, setStateBoxadd] = useState();

  useFrame((state, delta) => {
    easing.dampC(ref.current.color, color, 0.2, delta)
    easing.damp3(refRot.current.scale, num.set(stateScale, stateScale, stateScale), 0.5, delta)
    easing.damp2(refRot.current.position, num1.set(pos, pos + statePosition, 0), 0.3, delta)
    if (stateScale === 0.3) {
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
        setStateScale(0.4)
        setStatePosition(0)
      }}
      onPointerDown={() => handleClick(id)}
      onPointerOut={() => {
        setStateScale(0.3)
        setStatePosition(0)
      }}>
      <boxGeometry />
      <meshStandardMaterial ref={ref} />
    </mesh>
  )
}
