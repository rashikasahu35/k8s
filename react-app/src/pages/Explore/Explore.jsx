import React, { useEffect, useState } from "react";
import "./Explore.scss";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import FetchDataFromApi from "../../utils/FetchDataFromApi";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import MovieCard from "../../components/MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";


export default function Explore() {
  const { mediaType } = useParams();
  const [genre, setGenre] = useState(null);
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const [selectedOption, setSelectedOption] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  let filter = {};
  const sortbyData = [
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  const ApiCall = (condition) => {
    {condition === "initialCall" && setLoading(true)}

    FetchDataFromApi(`/discover/${mediaType}?page=${pageNo}`, filter).then((response) => {
      if (condition == "initialCall") {
        setData(response);
      } else {
        setData((prev) => {
          return {
            ...prev,
            data: {
              ...prev.data,
              results: [...prev.data.results, ...response?.data?.results],
            },
          };
        });
      }
    });

    setPageNo((prev) => prev+1)
    setLoading(false)
    console.log(pageNo)
  };

  const handleChange = (selectedOption, action) => {
    if (action.name == "genres") {
      if (action.action == "clear") {
        delete filter.with_genres;
      } else {
        let genreId = selectedOption.map((s) => s.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filter.with_genres = genreId;
      }
    } else {
      if (action.action == "clear") {
        delete filter.sort_by;
      } else {
        filter.sort_by = selectedOption.value;
      }
    }
    ApiCall("initialCall");
    setPageNo(1);
  };

  useEffect(() => {
    filter = {};
    setPageNo(1);
    setData(null);
    ApiCall("initialCall");               // api call should be after setting page no as it will again set the page no to 1
  }, [mediaType]);




  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              placeholder="Select Genres"
              name="genres"
              onChange={handleChange}
              options={genresData?.data?.genres}
              isSearchable
              closeMenuOnSelect={false}
              className="react-select-container genresDD"
              classNamePrefix="react-select"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
            />
            <Select
              //value={genre}
              placeholder="Sort by"
              name="sort_by"
              onChange={handleChange}
              options={sortbyData}
              isSearchable
              closeMenuOnSelect={false}
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <CircularSpinner />}
        {data && 
          <>
            { data?.data?.results?.length>0 ? (
                <InfiniteScroll 
                className="content"
                dataLength = {data?.data?.results?.length || []}
                next = {() => ApiCall("")}
                hasMore = {pageNo <= data?.data?.total_pages}
                loader = {<CircularSpinner/>}>
                 {data?.data?.results?.map((content,index) => {
                    if(content.media_type === "person") return
                    return (
                      <MovieCard
                          key={index}
                          data={content}
                          mediaType={mediaType}
                      />
                    )

                 })}
                </InfiniteScroll>
              ):(
                <span className="resultNotFound">
                Sorry, Results not found!
                </span>

              )
            }
          </>
        }
      </ContentWrapper>
    </div>
  );
}
