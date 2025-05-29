import React, { useEffect } from 'react'
import './Details.scss'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './DetailsBanner/DetailsBanner'
import Cast from './Cast/Cast'
import VideosSection from './VideosSection/VideosSection'
import Carousel from '../../components/Carousel/Carousel'

export default function Details() {
  const {mediaType, id} = useParams()
  const {data:videosData, loading:videosLoading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:creditsData, loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  const {data:similarData , loading:similarDataLoading} = useFetch(`/${mediaType}/${id}/similar`)
  const {data:recommendationsData, loading:recommendationsDataLoading} = useFetch(`/${mediaType}/${id}/recommendations`)

  return (
    <div>
      <DetailsBanner video={videosData?.data?.results?.[0]} crew={creditsData?.data.crew}/>
      {creditsData?.data.cast.length>0 && <Cast cast={creditsData?.data.cast} loading={creditsLoading}/>}
      {videosData?.data?.results.length>0 && <VideosSection videos={videosData?.data?.results} loading={videosLoading}/>}
      {similarData?.data?.results.length>0 && <Carousel title={(mediaType=="tv")? "Similar TV Shows":"Similar Movies"} data={similarData?.data?.results} endPoint={mediaType} loading={similarDataLoading}/>}
      {recommendationsData?.data?.results.length>0 && <Carousel title={"Recommendations"} data={recommendationsData?.data?.results}  endPoint={mediaType} loading={recommendationsDataLoading}/>}
    </div>
  )
}
