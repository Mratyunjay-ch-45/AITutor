import { motion } from 'framer-motion';
import React from 'react';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
        >
            <div className="relative w-full max-w-md">
                <motion.div
                    className="relative"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{
                        y: {
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.img
                        src="/airobo.png"
                        alt="AI Tutor"
                        className="w-72 h-72 mx-auto object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]"
                        initial={{ scale: 0.8, rotate: -5 }}
                        animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, 0],
                            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(59,130,246,0.4))"
                        }}
                    />
                </motion.div>
            </div>
            
            <motion.div
                className="mt-16 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.h2 
                    className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
                    animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundSize: "200% auto"
                    }}
                >
                    AI Tutor
                </motion.h2>
                <div className="flex items-center justify-center space-x-4">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            animate={{
                                y: [-10, 10, -10],
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
                <motion.p 
                    className="text-gray-300 mt-8 text-xl font-light tracking-wide"
                    animate={{
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Creating your personalized experience...
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;