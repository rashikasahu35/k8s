import { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./slice/homePageSlice";
import FetchDataFromApi from "./utils/FetchDataFromApi";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const SearchResult = lazy(() => import("./pages/SearchResult/SearchResult"));
const Details = lazy(() => import("./pages/Details/Details"));
const Explore = lazy(() => import("./pages/Explore/Explore"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);


// ------------------------------------------- USE EFFECTS -----------------------------------------------

  useEffect(() => {
    fetchApiConfig();
    getGenresData();
  }, []);

  // ------------------------------------------- M E T H O D S -----------------------------------------------


  const fetchApiConfig = () => {
    FetchDataFromApi("/configuration").then((res) => {
      //console.log(res.data,res.data.images.secure_base_url)
      const url = {
        img_url: res.data.images.secure_base_url + "original",
      };

      // const url = {
      //     backdrop : res.data.images.secure_base_url + "original",
      //     poster : res.data.images.secure_base_url + "original",
      //     profile : res.data.images.secure_base_url + "original"
      // }
      dispatch(getApiConfiguration(url));
    });
  };

  const getGenresData = async  () =>{                                                      // getting both TV & movie genres data at once to be used later 
    const apiData = []
    const endpoints = ['tv','movie']
    const genresData = {}

    endpoints.map((endpoint) => {
      apiData.push(FetchDataFromApi(`/genre/${endpoint}/list`))
    })
    const response = await Promise.all(apiData)

    response.map((responseItem) => {
      const responseItemData = responseItem.data.genres
      responseItemData.map((data)=>{
        genresData[data['id']]= data['name']
      })
    })
    dispatch(getGenres(genresData))
  }

// ------------------------------------------- R E T U R N -----------------------------------------------

  
  return (
    <>
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/:mediaType/:id" element={<Details />} />
            <Route exact path="/search/:query" element={<SearchResult />} />
            <Route exact path="/explore/:mediaType" element={<Explore />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
      I
    </>
  );
}

export default App;
