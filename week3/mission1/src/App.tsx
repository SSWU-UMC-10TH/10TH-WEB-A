import React from 'react'
import MoviePage from './pages/MoviePage'

export default function App() {
  console.log(import.meta.env.VITE_TMDB_KEY)
  return (
    <MoviePage/>
  )
}
