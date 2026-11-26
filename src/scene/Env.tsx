import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

interface EnvProps {
  intensity: number
  rotationX: number
  rotationY: number
  rotationZ: number
  asBackground: boolean
  bgIntensity: number
  bgBlur: number
}

export default function Env({
  intensity,
  rotationX,
  rotationY,
  rotationZ,
  asBackground,
  bgIntensity,
  bgBlur,
}: EnvProps) {
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    let active = true
    let environment: THREE.DataTexture | null = null
    const url = `${import.meta.env.BASE_URL}textures/env.hdr`

    void fetch(url, { method: 'HEAD' })
      .then((response) => {
        const contentType = response.headers.get('content-type') ?? ''
        if (!response.ok || contentType.includes('text/html') || !active) return
        new RGBELoader().load(
          url,
          (texture) => {
            if (!active) {
              texture.dispose()
              return
            }
            environment = texture
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.environment = texture
            if (asBackground) scene.background = texture
          },
          undefined,
          (error: unknown) => console.warn('Unable to load the optional local HDR environment.', error),
        )
      })
      .catch((error: unknown) => {
        if (active) console.warn('Unable to check the optional local HDR environment.', error)
      })

    return () => {
      active = false
      if (scene.environment === environment) scene.environment = null
      if (scene.background === environment) scene.background = null
      environment?.dispose()
    }
  }, [scene, asBackground])

  useEffect(() => {
    scene.environmentIntensity = intensity
    scene.backgroundIntensity = bgIntensity
    scene.backgroundBlurriness = bgBlur
    const rotation = new THREE.Euler(
      THREE.MathUtils.degToRad(rotationX),
      THREE.MathUtils.degToRad(rotationY),
      THREE.MathUtils.degToRad(rotationZ),
    )
    scene.environmentRotation.copy(rotation)
    scene.backgroundRotation.copy(rotation)
  }, [scene, intensity, rotationX, rotationY, rotationZ, bgIntensity, bgBlur])

  return null
}
