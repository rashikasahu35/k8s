import React from 'react'
import './Genres.scss'
import {useSelector} from 'react-redux'


export default function Genres({data}) {
    const { genres } = useSelector((state) => state.home)
  return (
    <div className='genres'>
        { data?.map((genre,index)=> {
            if(!genres[genre]) return;                                             //if key does'nt exist then return
            return(
                <div key={index} className='genre'>{genres[genre]}</div>
            )
            
        })}
    </div>
  )
}
