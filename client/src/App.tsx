import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import { Profile } from './pages/profile'
import { About } from './pages/about'
import { SignIn } from './pages/signin'
import { SignUp } from './pages/signup'
import { Header } from './components/header'
import PrivateRoute from './components/private-route'
import CreateListing from './pages/create-listing'
import UpdateListing from './pages/update-listing'
import { Listing } from './pages/listing'
import Search from './pages/search'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
        <Route path='/sign-in' element={<SignIn></SignIn>} />
        <Route path='/sign-up' element={<SignUp></SignUp>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
