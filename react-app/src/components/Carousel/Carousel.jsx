import React, { useRef } from "react";
import "./Carousel.scss";
import {
  BsFillArrowLeftCircleFill as LeftArrow,
  BsFillArrowRightCircleFill as RightArrow,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import FallBackImg from "../../assets/no-poster.png";
import LazyLoadImg from "../LazyLoadImg/LazyLoadImg";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";


export default function Carousel({ data, endPoint, title}) {
  const { url, genres } = useSelector((state) => state.home);
  const carouselContainer = useRef();
  const navigate = useNavigate();

  // ------------------------------------------- USE EFFECTS -----------------------------------------------
  // ------------------------------------------- M E T H O D S -----------------------------------------------

  const navigation = (direction) => {
    const container = carouselContainer.current;                              // for the reference of all carousel items
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)                 // to shift left
        : container.scrollLeft + (container.offsetWidth + 20);                //to shift right

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };



  // ------------------------------------------- R E T U R N -----------------------------------------------

  return (
    <div className="carousel">
      <ContentWrapper className="contentWrapper">
        {title && <div className="carouselTitle">{title}</div> }
        <LeftArrow
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <RightArrow
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {data ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data.map((content, index) => {
              return (
                
                <div className="carouselItem" key={index} onClick={()=> navigate(`/${content.media_type || endPoint}/${content.id}`)}>
                  <div className="posterBlock">
                    <LazyLoadImg
                      src={content.poster_path ? url.img_url + content.poster_path : FallBackImg}
                      className="lazy-load-image-background"
                    />
                    {content.vote_average && <CircleRating rating={content.vote_average.toFixed(1)} />}
                    {content.genre_ids && <Genres data={content.genre_ids.slice(0, 2)} />}
                  </div>
                  <div className="textBlock">
                    <div className="title">{content.title || content.name}</div>
                    <div className="date">
                      {dayjs(
                        content.release_Date || content.first_air_date
                      ).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {Array.from({ length: 5 }, (_, index) => (
              <React.Fragment key={index}>{skeletonItem()}</React.Fragment>            //rendering skeleton 5 times
          ))}

          </div>
        )}
      </ContentWrapper>
    </div>
  );
}
