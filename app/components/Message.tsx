'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Hearts
function FloatingHeart({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ff1493"
          emissive="#ff69b4"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// 3D Animated Sphere
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 100]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

// 3D Background Scene
function Scene3D({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff1493" intensity={0.5} />

      <AnimatedSphere />

      {/* Floating Hearts - Less on mobile */}
      {Array.from({ length: isMobile ? 6 : 12 }, (_, i) => (
        <FloatingHeart
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 3
          ]}
        />
      ))}

      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 2000 : 5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}

export default function Message() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    {
      emoji: '💌',
      title: 'Lời Nhắn',
      gradient: 'from-pink-500 via-rose-500 to-red-500',
    },
    {
      emoji: '💝',
      title: 'Kỷ Niệm',
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    },
    {
      emoji: '🌸',
      title: 'Lời Chúc',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
    },
  ];

  const contents = [
    // Tab 1: Lời nhắn với glassmorphism cards
    <div key="message" className="space-y-4 sm:space-y-6">
      {[
        {
          text: "Chào em của anh! 🥰",
          delay: 0.1
        },
        {
          text: "Trong ngày đặc biệt này, anh muốn gửi đến em những lời yêu thương chân thành nhất. Em là ánh sáng trong cuộc sống của anh, là nguồn động lực giúp anh vượt qua mọi khó khăn.",
          delay: 0.2
        },
        {
          text: "Mỗi ngày bên em đều là một món quà tuyệt vời với anh. Cảm ơn em đã luôn ở đó, lắng nghe và chia sẻ mọi niềm vui nỗi buồn cùng anh.",
          delay: 0.3
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30, rotateY: isMobile ? 0 : -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: item.delay, duration: 0.8, type: "spring" }}
          whileHover={isMobile ? {} : { scale: 1.02, rotateY: 2, transition: { duration: 0.3 } }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-2xl">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white font-light">
              {item.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>,

    // Tab 2: Kỷ niệm với 3D cards
    <div key="memories" className="space-y-4 sm:space-y-6">
      {[
        {
          icon: '🎭',
          title: 'Lần Đầu Gặp',
          text: 'Anh còn nhớ lần đầu gặp em, những năm tháng học đường ấy, nụ cười ấy của em đã khiến anh không thể quên. Đó là khoảnh khắc đẹp nhất trong cuộc đời anh, nguồn động lực để anh vượt qua mọi khó khăn trong cuộc sống.',
          gradient: 'from-purple-500/30 to-pink-500/30',
          border: 'border-purple-400/50'
        },
        {
          icon: '🌅',
          title: 'Chuyến đi',
          text: 'Những chuyến đi chơi cùng nhau, cùng khám phá những điều mới mẻ. Mỗi kỷ niệm đều là báu vật trong tim anh.',
          gradient: 'from-amber-500/30 to-orange-500/30',
          border: 'border-amber-400/50'
        },
      ].map((memory, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, rotateX: isMobile ? 0 : -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          whileHover={isMobile ? {} : {
            scale: 1.03,
            rotateX: 5,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="relative group perspective-1000"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${memory.gradient} rounded-xl sm:rounded-2xl blur-lg sm:blur-xl group-hover:blur-2xl transition-all`} />
          <div className={`relative bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border ${memory.border} shadow-2xl transform-gpu`}>
            <div className="flex items-start gap-3 sm:gap-4">
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0"
                animate={isMobile ? {} : { rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {memory.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="truncate">{memory.title}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-yellow-300 flex-shrink-0"
                  >
                    ✨
                  </motion.span>
                </h3>
                <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                  {memory.text}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>,

    // Tab 3: Lời chúc với particle effects
    <div key="wishes" className="space-y-4 sm:space-y-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4 sm:mb-6 md:mb-8"
      >
        <motion.div
          className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 inline-block"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          🌟
        </motion.div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold pacifico text-white drop-shadow-lg">
          Chọn vào lời chúc để xem nhiều hơn nha em
          <br />
          Anh chúc em
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {[
          {
            icon: '💖',
            text: 'Luôn tràn đầy yêu thương và hạnh phúc',
            color: 'from-pink-500 to-rose-500',
            poem: `Không chúc em giàu có,
Chỉ chúc em bình yên.
Không chúc em lộng lẫy,
Chỉ chúc em không muộn phiền!`
          },
          {
            icon: '✨',
            text: 'Tỏa sáng và thành công trong cuộc sống',
            color: 'from-purple-500 to-indigo-500',
            poem: `Tặng em một khúc ca,
Anh hát em pha trà.
Đời mình đều vui vẻ ,
Dừng chân tại nơi nhau!`
          },
          {
            icon: '🌸',
            text: 'Mãi mãi xinh đẹp và tươi trẻ',
            color: 'from-red-500 to-pink-500',
            poem: `Như hoa tươi nở mỗi sáng,
Em mãi nụ cười xinh.
Lòng anh như xao xuyến,
Mỗi khi được gần bên!`
          },
          {
            icon: '🎯',
            text: 'Đạt được mọi ước mơ em khao khát',
            color: 'from-blue-500 to-cyan-500',
            poem: `Gửi em chút lạc quan,
Không chờ ngày lấy lại.
Dù ngày mai ngang trái,
Mong em ít thở dài!`
          },
          {
            icon: '💪',
            text: 'Luôn khỏe mạnh và tràn đầy năng lượng',
            color: 'from-green-500 to-emerald-500',
            poem: `Chúc em khỏe mạnh mỗi ngày,
Năng lượng tràn đầy như nắng ban mai.
Hạnh phúc bên em luôn đầy,
Vì anh đây luôn chăm tưới!`
          },
          {
            icon: '🥰',
            text: 'Mỗi ngày đều là một ngày tuyệt vời',
            color: 'from-amber-500 to-orange-500',
            poem: `Mỗi ngày bên em là điều kỳ diệu,
Như được sống trong cổ tích.
Cảm ơn em đã đến bên anh,
Làm cuộc đời anh thêm ý nghĩa!`
          },
        ].map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5, rotateZ: isMobile ? 0 : -10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className="relative"
          >
            <motion.div
              onClick={() => setSelectedPoem(selectedPoem === index ? null : index)}
              whileHover={isMobile ? {} : {
                scale: 1.1,
                rotateZ: 3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${wish.color} rounded-lg sm:rounded-xl blur-sm sm:blur-md group-hover:blur-lg transition-all opacity-50`} />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-white/30 shadow-xl">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <motion.span
                    className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0"
                    animate={isMobile ? {} : {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {wish.icon}
                  </motion.span>
                  <p className="text-white font-medium flex-1 text-xs sm:text-sm md:text-base">{wish.text}</p>
                  <motion.span
                    animate={{ rotate: selectedPoem === index ? 180 : 0 }}
                    className="text-white/60 text-lg"
                  >
                    📜
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Poem Expand */}
            <AnimatePresence>
              {selectedPoem === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="mt-3 relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${wish.color} rounded-lg sm:rounded-xl blur-md opacity-30`} />
                    <div className="relative bg-white/20 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-white/40 shadow-xl">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">📜</span>
                        <h4 className="text-white font-bold text-base sm:text-lg flex-1">
                          Thơ tặng em
                        </h4>
                      </div>
                      <div className="poem-text text-white/90 text-sm sm:text-base md:text-lg whitespace-pre-line font-normal pl-4 border-l-2 border-white/40">
                        {wish.poem}
                      </div>
                      <div className="mt-4 text-right">
                        <span className="text-yellow-300 text-xl">✨</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>,
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          <Suspense fallback={null}>
            <Scene3D isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/40 via-transparent to-pink-900/40 -z-10" />

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12"
      >
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          {/* Animated background blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30 rounded-3xl blur-2xl animate-pulse" />

          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 sm:p-8 md:p-12 text-center overflow-hidden">
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    animate={{
                      x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                      y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <motion.div
                animate={{
                  rotateY: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 relative z-10"
              >
                💐
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pacifico mb-3 sm:mb-4 drop-shadow-2xl relative z-10"
              >
                Happy 20/10
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl relative z-10"
              >
                Dành tặng người anh yêu nhất 💕
              </motion.p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/20 bg-black/20">
              {tabs.map((tab, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTab(index)}
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 sm:py-4 md:py-6 px-2 sm:px-4 md:px-6 text-center transition-all duration-300 relative ${currentTab === index
                      ? 'text-white font-bold'
                      : 'text-white/60 hover:text-white/80'
                    }`}
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-2 relative z-10">
                    <motion.span
                      className="text-xl sm:text-2xl md:text-3xl"
                      animate={currentTab === index && !isMobile ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {tab.emoji}
                    </motion.span>
                    <span className="text-xs sm:text-sm md:text-base">{tab.title}</span>
                  </div>

                  {currentTab === index && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient}`}
                        initial={false}
                      />
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-20`}
                        layoutId="activeBg"
                      />
                    </>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12 min-h-[400px] sm:min-h-[500px]">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, x: isMobile ? 20 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -20 : -50 }}
                transition={{ duration: isMobile ? 0.3 : 0.5 }}
              >
                {contents[currentTab]}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="relative bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 text-center border-t border-white/20">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl pacifico font-bold mb-2 sm:mb-3 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                  Anh yêu em! 💖
                </p>
                <p className="text-white/80 text-sm sm:text-base md:text-lg">
                  20/10/2025 - Anh ở đây mệt thì về với anh ✨
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements - Less on mobile */}
        {!isMobile && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {['💕', '💖', '💝', '🌸', '🌺', '✨', '💫', '🌹'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl sm:text-3xl md:text-4xl opacity-20"
                animate={{
                  y: ['100vh', '-10vh'],
                  x: [
                    Math.sin(i) * 100,
                    Math.sin(i + 1) * 100,
                    Math.sin(i + 2) * 100,
                  ],
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear',
                }}
                style={{
                  left: `${(i * 12) % 100}%`,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
