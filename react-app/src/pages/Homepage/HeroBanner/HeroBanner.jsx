import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import LazyLoadImg from "../../../components/LazyLoadImg/LazyLoadImg";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

export default function HeroBanner() {
  const { data } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  const [searchInput, setSearchInput] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const navigate = useNavigate()
  
// ------------------------------------------- USE EFFECTS -----------------------------------------------

  useEffect(() => {
    // background img changed inly when successfull response from api
    const bgLink =
      url.img_url +
      data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroundImg(bgLink);
  }, [data]);
  
// ------------------------------------------- M E T H O D S -----------------------------------------------

  const searchInputHandler = (e) => {
    if (e.key === "Enter" && searchInput.length > 0) {
      navigate(`/search/${searchInput}`)
    }
  };
// ------------------------------------------- R E T U R N -----------------------------------------------

  return (
    <div className="heroBanner">
      {data && (                                         // if data is present then only render the img
        <div className="backdrop-img">
          <LazyLoadImg src={backgroundImg} />
          {/* <img src={backgroundImg} alt=""  loading="lazy"/> */}
        </div>
      )}
      <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or Tv show..."
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={searchInputHandler}
              />
              <button onClick={()=> navigate(`/search/${searchInput}`)}>Search</button>
            </div>
          </div>
        </ContentWrapper>
    </div>
    
  );
}
