const axios = require('axios');

const YOUTUBE_API_KEY = 'AIzaSyAzcshHkrkZE30ixwyBFldctqs88Q45BmU';

// Helper function to convert duration from ISO 8601 format to seconds
const convertDurationToSeconds = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
};

// Function to split video into 30-second segments
const splitVideoIntoSegments = (videoId, totalDuration) => {
    const segments = [];
    const segmentLength = 30;
    const numberOfSegments = Math.ceil(totalDuration / segmentLength);

    for (let i = 0; i < numberOfSegments; i++) {
        const startTime = i * segmentLength;
        const endTime = Math.min((i + 1) * segmentLength, totalDuration);
        
        segments.push({
            videoId,
            startTime,
            endTime,
            embedUrl: `https://www.youtube.com/embed/${videoId}?start=${startTime}&end=${endTime}&autoplay=1`
        });
    }

    return segments;
};

// Controller to get recommended YouTube videos
const getRecommendedVideos = async (req, res) => {
    const { keyword, maxResults = 10, order = 'relevance', videoDuration = 'any' } = req.query;

    try {
        // First get video search results
        const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                maxResults: maxResults,
                q: keyword,
                key: YOUTUBE_API_KEY,
                order: order,
                videoDuration: videoDuration,
                type: 'video'
            }
        });

        // Get video IDs from search results
        const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

        // Get additional video details including statistics and content details
        const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'statistics,contentDetails',
                id: videoIds,
                key: YOUTUBE_API_KEY
            }
        });

        // Combine search results with video details and create segments
        const videos = searchResponse.data.items.map(searchItem => {
            const videoDetails = videoDetailsResponse.data.items.find(
                detailItem => detailItem.id === searchItem.id.videoId
            );
            
            // Calculate video duration and create segments
            const duration = videoDetails?.contentDetails?.duration;
            const totalDuration = duration ? convertDurationToSeconds(duration) : 0;
            const segments = splitVideoIntoSegments(searchItem.id.videoId, totalDuration);
            
            return {
                ...searchItem,
                statistics: videoDetails?.statistics,
                contentDetails: videoDetails?.contentDetails,
                duration: totalDuration,
                segments
            };
        });

        res.json(videos);
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        res.status(500).json({ 
            message: 'Error fetching YouTube data', 
            error: error.message 
        });
    }
};

module.exports = { 
    getRecommendedVideos,
    splitVideoIntoSegments,
    convertDurationToSeconds
};

