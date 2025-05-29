import React,{useState} from 'react'
import './VideosSection.scss'
import VideoPopup from '../../../components/VideoPopup/VideoPopup'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import LazyLoadImg from '../../../components/LazyLoadImg/LazyLoadImg';
import PlayBtn from '../../../components/PlayBtn/PlayBtn'
import Avatar from '../../../assets/avatar.png'

export default function VideosSection({videos, loading}) {
    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    

    const loadingSkeleton = () => {
        return (
          <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
          </div>
        );
      };

      
  return (
    <div className="videosSection">
        <ContentWrapper>
            <div className="videosSectionHeading">Official Videos</div>
            {!loading ? (
                <div className="videoItems">
                    {videos?.map((video,index) => (
                        <div key={index} className='videoItem' onClick={()=>{
                            setShowVideo(true)
                            setVideoId(video.key)
                        }} >
                            <div className="videoThumbnail">
                                <LazyLoadImg src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                <PlayBtn/>
                            </div>
                            <div className="videoTitle">{video.name}</div>
                        </div>
                    ))}
                </div>
            ):(
                <div className="vidoeSkeleton">
                    {Array.from({ length: 5 }, (_, index) => (
                        <React.Fragment key={index}>{loadingSkeleton()}</React.Fragment>            //rendering skeleton 5 times
                    ))}
                </div>
            )

            }
        </ContentWrapper>
        <VideoPopup
            showVideo={showVideo}
            setShowVideo={setShowVideo}
            videoId={videoId}
            setVideoId={setVideoId}
        />
    </div>
  )
}
