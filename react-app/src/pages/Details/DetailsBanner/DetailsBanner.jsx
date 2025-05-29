import React, { useState } from "react";
import "./DetailsBanner.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/Genres/Genres";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import LazyLoadImage from "../../../components/LazyLoadImg/LazyLoadImg";
import CircleRating from "../../../components/CircleRating/CircleRating";
import PosterFallBackImg from "../../../assets/no-poster.png";
import PlayBtn from "../../../components/PlayBtn/PlayBtn";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import dayjs from "dayjs";

export default function DetailsBanner({ crew, video }) {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.data?.genres?.map((g) => g.id);
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const director = crew?.filter((member) => member.job === "Director");
  const writer = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Story" ||
      member.job === "Screenplay"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="backdrop-img">
                {data.data?.backdrop_path && (
                  <LazyLoadImage src={url.img_url + data.data?.backdrop_path} />
                )}
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    <LazyLoadImage
                      className="posterImg"
                      src={
                        data.data?.poster_path
                          ? url.img_url + data.data?.poster_path
                          : PosterFallBackImg
                      }
                    />
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.data?.name || data.data?.title} (${dayjs(
                        data.data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.data?.tagline}</div>
                    {_genres.length > 0 && <Genres data={_genres} />}

                    {(data.data?.vote_average || video?.key) && (
                      <div className="row">
                        {data.data?.vote_average && (
                          <CircleRating
                            rating={data.data?.vote_average.toFixed(1)}
                          />
                        )}

                        <div
                          className="playbtn"
                          onClick={() => {
                            setShowVideo(true);
                            setVideoId(video?.key);
                          }}
                        >
                          <PlayBtn />
                          <span className="text"> Watch Trailer</span>
                        </div>
                      </div>
                    )}
                    {data.data?.overview && (
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data.data?.overview}</div>
                      </div>
                    )}

                    <div className="info">
                      {data.data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:</span>
                          <span className="text">{data.data?.status}</span>
                        </div>
                      )}
                      {data.data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release:</span>
                          <span className="text">
                            {dayjs(data.data?.release_date).format(
                              "MMM D, YYYY"
                            )}
                          </span>
                        </div>
                      )}
                      {data.data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Duration:</span>
                          <span className="text">
                            {toHoursAndMinutes(data.data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {index < director.length - 1 && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((w, index) => (
                            <span key={index}>
                              {w.name}
                              {index < writer.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data.data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data.data?.created_by?.map((d, index) => (
                            <span key={index}>
                              {d.name}
                              {index < data.data?.created_by?.length - 1 &&
                                ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  showVideo={showVideo}
                  setShowVideo={setShowVideo}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}

const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};
