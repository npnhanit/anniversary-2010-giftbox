'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Message from './components/Message';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const messages = [
    "Nhấn để mở quà nha cục dàng! 🎁",
    "Ngon lành! Tiếp tục cái nữa đi em! 🎉",
    "Haha! Cái nữa thôi! 💝",
    "Sắp đến rồi! Hẹ hẹ 🥰",
    "Cái cuối nè! Há há! 💕",
  ];

  // 5 layers with different styles
  const giftLayers = [
    { 
      bg: 'from-pink-400 via-rose-400 to-red-400', 
      pattern: '❤️',
      ribbonColor: 'from-yellow-300 to-yellow-500'
    },
    { 
      bg: 'from-purple-400 via-violet-400 to-indigo-400', 
      pattern: '💜',
      ribbonColor: 'from-amber-300 to-orange-500'
    },
    { 
      bg: 'from-blue-400 via-cyan-400 to-teal-400', 
      pattern: '⭐',
      ribbonColor: 'from-pink-300 to-rose-500'
    },
    { 
      bg: 'from-green-400 via-emerald-400 to-lime-400', 
      pattern: '💚',
      ribbonColor: 'from-red-300 to-pink-500'
    },
    { 
      bg: 'from-orange-400 via-amber-400 to-yellow-400', 
      pattern: '🌸',
      ribbonColor: 'from-purple-300 to-indigo-500'
    },
  ];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUnwrap = () => {
    if (clickCount < 5) {
      setClickCount(prev => prev + 1);
      
      if (clickCount === 4) {
        // Lần click thứ 5 (cuối cùng)
        setTimeout(() => {
          setShowConfetti(true);
          setShowMessage(true);
        }, 600);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#667eea', '#764ba2', '#f093fb', '#ff6b9d', '#ffd700']}
          numberOfPieces={250}
          recycle={false}
        />
      )}

      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="gift"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* Gift Box */}
            <div className="relative">
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnwrap}
                animate={clickCount > 0 && clickCount < 5 ? {
                  rotate: [0, -3, 3, -3, 3, 0],
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  {clickCount < 5 ? (
                    <motion.div
                      key={`layer-${5 - clickCount}`}
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ 
                        scale: 1.3,
                        opacity: 0,
                        rotate: clickCount % 2 === 0 ? -15 : 15,
                        y: -50
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`absolute inset-0 bg-gradient-to-br ${giftLayers[4 - clickCount].bg} rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden`}
                    >
                      {/* Pattern Background */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-20">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl">
                            {giftLayers[4 - clickCount].pattern}
                          </div>
                        ))}
                      </div>

                      {/* Ribbon */}
                      <div className={`absolute top-0 bottom-0 left-1/2 w-12 sm:w-16 -ml-6 sm:-ml-8 bg-gradient-to-b ${giftLayers[4 - clickCount].ribbonColor}`} />
                      <div className={`absolute left-0 right-0 top-1/2 h-12 sm:h-16 -mt-6 sm:-mt-8 bg-gradient-to-r ${giftLayers[4 - clickCount].ribbonColor}`} />
                      
                      {/* Bow */}
                      <motion.div 
                        className="absolute top-1/2 left-1/2 -mt-8 -ml-8 sm:-mt-12 sm:-ml-12 w-16 h-16 sm:w-24 sm:h-24 z-10"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="text-5xl sm:text-6xl md:text-7xl drop-shadow-lg">🎀</div>
                      </motion.div>

                      {/* Click Counter */}
                      {/* {clickCount > 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg"
                        >
                          <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
                            {clickCount}/5
                          </p>
                        </motion.div>
                      )} */}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="opened"
                      initial={{ scale: 0, rotateY: -90 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-3xl shadow-2xl flex items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl sm:text-7xl md:text-9xl"
                      >
                        🎁
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Instruction Text */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 sm:mt-10 md:mt-12 text-center"
              >
                {clickCount < 5 ? (
                  clickCount === 0 ? "🎁 Mở quà nhé!" : `🎁 Nhấn tiếp!`
                ) : (
                  "✨ Đang mở..."
                )}
              </motion.div> */}
            </div>

            {/* Text - Dynamic messages */}
            <motion.div
              key={`msg-${clickCount}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl pacifico gradient-text px-4"
            >
              {clickCount < 5 ? messages[clickCount] : "Đang mở quà... 🎊"}
            </motion.div>

            {/* Progress Bar */}
            {/* {clickCount > 0 && clickCount < 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 sm:mt-6 w-full max-w-xs sm:max-w-md mx-auto px-4"
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(clickCount / 5) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )} */}
          </motion.div>
        ) : (
          <Message />
        )}
      </AnimatePresence>
    </main>
  );
}

