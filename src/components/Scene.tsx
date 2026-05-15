import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const CDN = "https://cdn.poehali.dev/projects/64ce6965-fcc2-46b7-be6c-95f6cb962f5c/files"

const images = [
  // Стоя
  `${CDN}/5dc0d39e-a04f-4c79-99c4-2cd4030afd0c.jpg`,
  `${CDN}/0168435b-6eba-4a9f-b40a-ed17c95adb5c.jpg`,
  `${CDN}/1d7fcb58-164d-4176-a7d7-5127ebecd7c9.jpg`,
  `${CDN}/f6bf4289-9bff-4496-a9bf-7d4c414a2b2c.jpg`,
  // Сидя
  `${CDN}/15596972-bcc6-42ba-816c-0d96e4fccc7c.jpg`,
  `${CDN}/d75a8a2f-47ad-4156-9e84-dd4baa4a1453.jpg`,
  `${CDN}/b46412d0-0184-47b3-bcc2-495dca35f58f.jpg`,
  // Лёжа
  `${CDN}/7f7594f3-fc77-45a1-a43d-97e9fafcc5f4.jpg`,
  `${CDN}/593bd625-7747-419d-96b7-e5f1699c5ae6.jpg`,
  `${CDN}/35708e23-0ca0-4c50-beb5-523a06db5c75.jpg`,
  // Повторы для объёма галереи
  `${CDN}/5dc0d39e-a04f-4c79-99c4-2cd4030afd0c.jpg`,
  `${CDN}/1d7fcb58-164d-4176-a7d7-5127ebecd7c9.jpg`,
  `${CDN}/15596972-bcc6-42ba-816c-0d96e4fccc7c.jpg`,
  `${CDN}/7f7594f3-fc77-45a1-a43d-97e9fafcc5f4.jpg`,
  `${CDN}/0168435b-6eba-4a9f-b40a-ed17c95adb5c.jpg`,
  `${CDN}/593bd625-7747-419d-96b7-e5f1699c5ae6.jpg`,
]

const imagePositions = [
  { pos: [-3.2, 1.8, -2.5] as [number, number, number], rot: [0, 0.4, 0] as [number, number, number], scale: 0.7 },
  { pos: [2.8, -1.2, -3] as [number, number, number], rot: [0, -0.5, 0] as [number, number, number], scale: 0.8 },
  { pos: [-1.5, 2.5, -1.8] as [number, number, number], rot: [0, 0.3, 0] as [number, number, number], scale: 0.65 },
  { pos: [3.5, 0.8, -2.2] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], scale: 0.75 },
  { pos: [-2.8, -2.1, -2.8] as [number, number, number], rot: [0, 0.5, 0] as [number, number, number], scale: 0.7 },
  { pos: [1.2, 2.2, -2.5] as [number, number, number], rot: [0, -0.3, 0] as [number, number, number], scale: 0.8 },
  { pos: [-3.5, 0.5, -2] as [number, number, number], rot: [0, 0.6, 0] as [number, number, number], scale: 0.65 },
  { pos: [2.2, -2.5, -2.6] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], scale: 0.75 },
  { pos: [-1.8, -0.8, -3.2] as [number, number, number], rot: [0, 0.3, 0] as [number, number, number], scale: 0.7 },
  { pos: [3.2, 1.5, -1.9] as [number, number, number], rot: [0, -0.5, 0] as [number, number, number], scale: 0.8 },
  { pos: [-2.5, 2.8, -2.4] as [number, number, number], rot: [0, 0.4, 0] as [number, number, number], scale: 0.65 },
  { pos: [0.8, -1.8, -2.7] as [number, number, number], rot: [0, -0.3, 0] as [number, number, number], scale: 0.75 },
  { pos: [-3.8, -1.5, -2.3] as [number, number, number], rot: [0, 0.5, 0] as [number, number, number], scale: 0.7 },
  { pos: [2.5, 2.8, -2.9] as [number, number, number], rot: [0, -0.4, 0] as [number, number, number], scale: 0.8 },
  { pos: [-0.8, -2.8, -2.1] as [number, number, number], rot: [0, 0.3, 0] as [number, number, number], scale: 0.65 },
  { pos: [3.8, -0.5, -2.5] as [number, number, number], rot: [0, -0.5, 0] as [number, number, number], scale: 0.75 },
]

interface FloatingImageProps {
  texture: THREE.Texture
  index: number
  rotation: number
}

function FloatingImage({ texture, index, rotation }: FloatingImageProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const config = imagePositions[index]

  useFrame((state) => {
    if (!meshRef.current) return

    const targetRotY = config.rot[1] + rotation
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.12)

    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = config.pos[1] + Math.sin(time * 0.5 + index) * 0.1
  })

  return (
    <mesh ref={meshRef} position={config.pos} rotation={config.rot} scale={config.scale}>
      <planeGeometry args={[0.833, 1.2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.95}
        side={THREE.DoubleSide}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

export default function Scene() {
  const [rotation, setRotation] = useState(0)
  const [targetRotation, setTargetRotation] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [lastInteraction, setLastInteraction] = useState(Date.now())
  const { camera, size } = useThree()
  const mousePosition = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragRotation = useRef(0)

  const textures = useTexture(images)

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - dragStart.current.x
        const rotationAmount = (deltaX / size.width) * Math.PI * 2
        setTargetRotation(dragRotation.current + rotationAmount)
      } else {
        mousePosition.current = {
          x: (e.clientX / size.width) * 2 - 1,
          y: -(e.clientY / size.height) * 2 + 1,
        }
      }
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [size])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      dragStart.current = { x: e.clientX, y: e.clientY }
      dragRotation.current = targetRotation
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [targetRotation])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      dragRotation.current = targetRotation
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        const deltaX = e.touches[0].clientX - dragStart.current.x
        const rotationAmount = (deltaX / size.width) * Math.PI * 2
        setTargetRotation(dragRotation.current + rotationAmount)
      }
      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    const handleTouchEnd = () => {
      isDragging.current = false
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [targetRotation, size])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setTargetRotation((prev) => prev + Math.PI / 3)
        setLastInteraction(Date.now())
        setIsAutoPlaying(false)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setTargetRotation((prev) => prev - Math.PI / 3)
        setLastInteraction(Date.now())
        setIsAutoPlaying(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    let isThrottled = false

    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return

      isThrottled = true
      setTimeout(() => {
        isThrottled = false
      }, 400)

      if (e.deltaY > 0) {
        setTargetRotation((prev) => prev + Math.PI / 3)
      } else {
        setTargetRotation((prev) => prev - Math.PI / 3)
      }

      setLastInteraction(Date.now())
      setIsAutoPlaying(false)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [])

  // Auto-play after 3s of inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction
      if (timeSinceLastInteraction > 3000) {
        setIsAutoPlaying(true)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [lastInteraction])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setTargetRotation((prev) => prev + Math.PI / 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useFrame(() => {
    if (!isDragging.current) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.current.x * 0.5, 0.1)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.current.y * 0.5, 0.1)
    }
    camera.lookAt(0, 0, 0)

    setRotation((prev) => THREE.MathUtils.lerp(prev, targetRotation, 0.12))
  })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ff6b35" />
      <spotLight position={[0, 5, 5]} intensity={0.3} angle={0.6} penumbra={1} />

      {textures.map((texture, index) => (
        <FloatingImage key={index} texture={texture} index={index} rotation={rotation} />
      ))}


    </>
  )
}