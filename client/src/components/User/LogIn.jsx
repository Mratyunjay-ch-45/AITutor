import React,{useState} from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LogIn = () => {
    const [userdata,setUserdata] = useState({
        email:"",   
        password:""
    });

    const handleChange = (e) => {
        setUserdata({...userdata,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/login",userdata,{
                withCredentials:true
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col w-full justify-between items-center bg-[#020617] text-white min-h-screen'>
            <style>
                {`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    * {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl p-6 md:p-10 flex items-center justify-between"
            >
                <motion.div 
                    className="w-1/2 pr-12"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.form
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="space-y-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/10"
                        onSubmit={handleSubmit}
                    >
                        <motion.div 
                            className="flex items-center justify-center gap-4 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Welcome Back
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <label className="block text-lg font-medium mb-2">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email..."
                                    onChange={handleChange}
                                    className="relative w-full pl-4 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 text-white placeholder-gray-400 text-lg"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <label className="block text-lg font-medium mb-2">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password..."
                                    onChange={handleChange}
                                    className="relative w-full pl-4 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 text-white placeholder-gray-400 text-lg"
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-8"
                        >
                            Sign In
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </motion.button>
                    </motion.form>
                </motion.div>

                <motion.div 
                    className="w-1/2 pl-12"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
                        <img 
                            src="/airobo.png" 
                            alt="AI Tutor" 
                            className="relative w-full object-cover rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300"
                        />
                    </div>
                    <motion.div 
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Your AI Learning Partner
                        </h2>
                        <p className="mt-4 text-gray-300">
                            Ready to continue your personalized learning journey with advanced AI assistance
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default LogIn;

