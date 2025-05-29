import React, { useRef } from "react";
import "./MovieCard.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import FallBackImg from "../../assets/no-poster.png";
import LazyLoadImg from "../LazyLoadImg/LazyLoadImg";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

export default function Carousel({ data, mediaType }) {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  
  return (
    <div className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
      <div className="posterBlock">
        <LazyLoadImg
          src={data.poster_path ? url.img_url + data.poster_path : FallBackImg}
          className="lazy-load-image-background"
        />
        {data.vote_average && (
          <CircleRating rating={data.vote_average.toFixed(1)} />
        )}
        {data.genre_ids && <Genres data={data.genre_ids.slice(0, 2)} />}
      </div>
      <div className="textBlock">
        <div className="title">{data.title || data.name}</div>
        <div className="date">
          {dayjs(data.release_Date || data.first_air_date).format(
            "MMM D, YYYY"
          )}
        </div>
      </div>
    </div>
  );
}
