import React, { useEffect, useState } from "react";
import "./SearchResult.scss";
import FetchDataFromApi from "../../utils/FetchDataFromApi";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import Carousel from '../../components/Carousel/Carousel'
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from '../../components/MovieCard/MovieCard'

export default function SearchResult() {
  const { query } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(null)
  const [searchData, setSearchData] = useState(null);
  console.log(searchData)
  const ApiCall = () => {
    setLoading(true);
    
    FetchDataFromApi(`/search/multi?query=${query}&page=${pageNo}`)
    .then((response) =>{
      if(searchData?.data?.results){
        setSearchData((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data, 
                  results: [...prev.data.results, ...response?.data?.results],
              }
            };
        })
      }
      else{
        setSearchData(response)
      }
      setLoading(false);
      setPageNo((prev) => prev+1)
    })
  }

  useEffect(() => {
    setPageNo(1)
    ApiCall()
  },[query])


  return (
    <div className="searchResultsPage">
      {loading && <CircularSpinner/>}
      {searchData && 
        <ContentWrapper>
          {searchData?.data?.results?.length > 0 ? (
            <> 
              <div className="pageTitle">{`Search ${searchData?.data?.results?.length > 1 ? "results" : "result"} for '${query}'`}</div>
          
              <InfiniteScroll className="content"
                dataLength={searchData?.data?.results.length || []}
                next={ApiCall}
                hasMore={pageNo <= searchData?.data?.total_pages}
                loader={<CircularSpinner/>}>
                {searchData.data?.results.map((content,index) => {
                  if(content.media_type === "person") return;
                  return(
                    <MovieCard key={index} data={content} mediaType={query} />
                  )

                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">{`Sorry, no results found for '${query}'`}</span>
          )}
        </ContentWrapper>
      }
    </div>
  );
}


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
