import React, { useState } from "react";
import "./HomepageCarousel.scss";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/SwitchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

export default function HomepageCarousel({ title, tabs }) {

  const [endPoint, setEndPoint] = useState(getEndPoint(tabs[0]));              // initally 1st tab will be endPoint
  let url = getUrl(title);                                                    // url based on title of carousel
  const { data } = useFetch(url);

  // ------------------------------------------- M E T H O D S -----------------------------------------------

  const onTabChange = (activeTab) => {
    const newEndPoint = getEndPoint(activeTab);                               //getting the new endPoint
    setEndPoint(newEndPoint);
  };
  function getEndPoint(endPoint) {
    if (endPoint == "Day") return "day";
    else if (endPoint == "Week") return "week";
    else if (endPoint == "Movies") return "movie";
    else return "tv";
  }
  function getUrl(title) {
    if (title == "Trending") {
      return `/trending/all/${endPoint}`;
    } else if (title == "What's Popular") {
      return `/${endPoint}/popular`;
    } else {
      return `/${endPoint}/top_rated`;
    }
  }

  // ------------------------------------------- R E T U R N -----------------------------------------------

  return (
    <>
    {data?.data?.results.length>0 && <div className="carouselSection">
      <ContentWrapper className="contentWrapper">
        <span className="carouselTitle">{title}</span>
        <SwitchTabs tabs={tabs} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.data?.results} endPoint={endPoint} />{" "}
    </div>}
    </>
  );
}



