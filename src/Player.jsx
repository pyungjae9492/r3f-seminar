import { Box, useBounds } from "@react-three/drei"
import React, { useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls, FirstPersonControls } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export const Player = () => {

    const ref = useRef()
    const boxRef = useRef()
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, flatShading: true })

    const [, get] = useKeyboardControls()
    const bounds = useBounds()

    useFrame((state, delta) => {
      const { forward, backward, left, right } = get()

      if (right) {
        ref.current.applyImpulse({ x: 0, y: 1, z: 1 })
        bounds.refresh().clip.fit()
      }

      if (left) {
        ref.current.applyImpulse({ x: 0, y: 1, z: -1 })
      }

      if (forward) {
        console.log("forward")
        ref.current.applyImpulse({ x: 0, y: 2, z: 0 })
      }

    })

    return (
      <>
        <RigidBody ref={ref} position={[0, 20, 0]} type="dynamic">
          <Box 
            position={[1, 0, 0]} 
            material={material}
            castShadow 
            receiveShadow
          />
          <Box 
            ref={boxRef}
            position={[0, 0, 0]} 
            material={material}
            castShadow 
            receiveShadow 
          />
          <Box 
            position={[0, 0, 1]} 
            material={material}
            castShadow 
            receiveShadow 
          />
        </RigidBody>
      </>
    )
}