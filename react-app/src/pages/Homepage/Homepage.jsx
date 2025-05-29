import React from 'react'
import './Homepage.scss'
import HeroBanner from './HeroBanner/HeroBanner'
import HomepageCarousel from './HomepageCarousel/HomepageCarousel'

export default function Homepage() {
  return (
    <div>
        <HeroBanner/>
        <HomepageCarousel title={"Trending"} tabs={['Day','Week']}/>
        <HomepageCarousel title={"What's Popular"} tabs={['Movies','TV Shows']}/>
        <HomepageCarousel title={"Top Rated"} tabs={['Movies','TV Shows']}/>

    </div>
  )
}
