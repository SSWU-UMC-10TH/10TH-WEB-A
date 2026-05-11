import React from 'react'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'

const FirstPage = () => <h1>첫번째 페이지</h1>
const SecondPage = () => <h1>두번째 페이지</h1>
const ThirdPage = () => <h1>세번째 페이지</h1>
const NotFoundPage = () => <h1>404</h1>

const Header = () => {
  return(
    <nav style={ {display : 'flex', gap : '10px'}} >
      <Link to='/first'>First</Link>
      <Link to='/second'>Second</Link>
      <Link to='/third'>Third</Link>
      <Link to='*'>Not Found</Link>
    </nav>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/first' element={<FirstPage/>}/>
        <Route path='/second' element={<SecondPage/>}/>
        <Route path='/third' element={<ThirdPage/>}/>
        <Route path='/*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App