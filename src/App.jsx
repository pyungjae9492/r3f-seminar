import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { KeyboardControls, OrbitControls, Plane, Bounds } from '@react-three/drei'
import * as THREE from 'three'
import { Player } from './Player'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'

function App() {

  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x928927, flatShading: true })

  const map = [
    { name: "forward", keys: ["ArrowUp", "w", "W"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
  ]

  return (
    <div className='h-screen w-screen'>
      <KeyboardControls map={map}>
        <Canvas
          shadows
          camera={{ position: [0, 10, 10], fov: 100 }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[0, 200, -200]} intensity={1} castShadow />
          <Physics debug>
            <RigidBody position={[0, -10, 0]} type="fixed">
              <Plane 
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                args={[10000, 10000]}
                material={planeMaterial}
                receiveShadow
              />
              <CuboidCollider args={[10000, 0.1, 10000]} />
            </RigidBody>
            <Player />
          </Physics>
          <OrbitControls />
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default App
