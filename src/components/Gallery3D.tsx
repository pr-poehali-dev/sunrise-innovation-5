import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Scene from "./Scene"
import Overlay from "./Overlay"
import LoadingScreen from "./LoadingScreen"
import WelcomeScreen from "./WelcomeScreen"

const BG = "https://cdn.poehali.dev/projects/64ce6965-fcc2-46b7-be6c-95f6cb962f5c/files/06bd2849-0b92-4b3e-82f5-031e7e90f1dc.jpg"

export default function Gallery3D() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <AnimatePresence>
        {!entered && <WelcomeScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Фоновое фото на весь экран */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/55" />
            </div>

            {/* 3D Canvas поверх фото — прозрачный фон */}
            <div className="absolute inset-0 z-10">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>
            </div>

            <Overlay />
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
