import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Reel = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('programming tutorials');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showSegments, setShowSegments] = useState(false);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filters, setFilters] = useState({
        maxResults: 10,
        order: 'relevance',
        videoDuration: 'medium'
    });

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchVideos();
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setShowSegments(true);
        setCurrentSegmentIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseSegments = () => {
        setShowSegments(false);
        setSelectedVideo(null);
        setCurrentSegmentIndex(0);
        document.body.style.overflow = 'auto';
    };

    const handleWheel = (e) => {
        if (selectedVideo) {
            e.preventDefault();
            const threshold = 50;
            if (Math.abs(e.deltaY) > threshold) {
                const direction = e.deltaY > 0 ? 1 : -1;
                const newIndex = currentSegmentIndex + direction;
                
                if (newIndex >= 0 && newIndex < selectedVideo.segments.length) {
                    setCurrentSegmentIndex(newIndex);
                }
            }
        }
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (!touchStart) return;

        const currentTouch = e.touches[0].clientY;
        const diff = touchStart - currentTouch;

        if (Math.abs(diff) > 50) {
            const direction = diff > 0 ? 1 : -1;
            const newIndex = currentSegmentIndex + direction;

            if (newIndex >= 0 && newIndex < selectedVideo.segments.length) {
                setCurrentSegmentIndex(newIndex);
                setTouchStart(null);
            }
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null);
    };

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://aitutor-ctpy.onrender.com/reel/recommended', {
                params: {
                    keyword: searchTerm,
                    ...filters
                }
            });
            setVideos(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch videos');
            console.error('Error fetching videos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (loading) return <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-[#020617] text-white' : 'bg-gray-100 text-gray-800'}`}>Loading...</div>;
    if (error) return <div className={`flex justify-center items-center h-screen text-red-500 ${isDarkMode ? 'bg-[#020617]' : 'bg-gray-100'}`}>{error}</div>;

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-[#020617] text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold flex items-center flex-row gap-2"
          >
            AITUTOR
            <img src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309" alt="" className='w-10 h-10 rounded-full' />
          </motion.h1>
          <div className='flex gap-4'>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/chat')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-900 text-white"
                    >
                        <img 
                            src="https://cdna.artstation.com/p/assets/images/images/053/682/998/large/onur-inci-screenshot005-main-camera-1.jpg?1662767309"
                            alt="AI Avatar"
                            className="w-6 h-6 rounded-full"
                        />
                        <span>Chat with AI</span>
                    </motion.button>
                    
                    </div>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for videos..."
                                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <select
                                name="maxResults"
                                value={filters.maxResults}
                                onChange={handleFilterChange}
                                className={`px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            >
                                <option value="5">5 results</option>
                                <option value="10">10 results</option>
                                <option value="15">15 results</option>
                                <option value="20">20 results</option>
                            </select>
                            <select
                                name="order"
                                value={filters.order}
                                onChange={handleFilterChange}
                                className={`px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="date">Date</option>
                                <option value="rating">Rating</option>
                                <option value="viewCount">View Count</option>
                            </select>
                            <select
                                name="videoDuration"
                                value={filters.videoDuration}
                                onChange={handleFilterChange}
                                className={`px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                                    isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            >
                                <option value="any">Any duration</option>
                                <option value="short">Short (&lt; 4 mins)</option>
                                <option value="medium">Medium (4-20 mins)</option>
                                <option value="long">Long (&gt; 20 mins)</option>
                            </select>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <motion.div
                            key={video.id.videoId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-xl shadow-lg overflow-hidden h-full ${
                                isDarkMode ? 'bg-gray-800' : 'bg-white'
                            }`}
                        >
                            <div className="flex flex-col h-full">
                                <div className="relative pt-[56.25%]">
                                    <img 
                                        src={video.snippet.thumbnails.high.url} 
                                        alt={video.snippet.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                                        onClick={() => handleVideoSelect(video)}
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                                        {video.snippet.title}
                                    </h3>
                                    <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {video.snippet.channelTitle}
                                    </p>
                                    <div className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <p>{parseInt(video.statistics?.viewCount).toLocaleString()} views</p>
                                        <p>Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</p>
                                    </div>
                                    <button
                                        onClick={() => handleVideoSelect(video)}
                                        className="mt-auto w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                    >
                                        View 30s Segments
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Video Segment Viewer */}
                {showSegments && selectedVideo && (
                    <div className="fixed inset-0 bg-black z-50">
                        <div 
                            className="h-full w-full"
                            onWheel={handleWheel}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <button
                                onClick={handleCloseSegments}
                                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 bg-black bg-opacity-50 rounded-full"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={currentSegmentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full flex flex-col items-center justify-center"
                                >
                                    <div className="relative w-full h-[calc(100vh-120px)] max-w-[500px] mx-auto">
                                        <iframe
                                            className="w-full h-full rounded-lg"
                                            src={`${selectedVideo.segments[currentSegmentIndex].embedUrl}&controls=0`}
                                            title={`Segment ${currentSegmentIndex + 1}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-6 py-3 rounded-full text-sm flex items-center gap-2">
                                        <span>Scroll or swipe • </span>
                                        <span className="font-semibold">{currentSegmentIndex + 1}/{selectedVideo.segments.length}</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reel;

