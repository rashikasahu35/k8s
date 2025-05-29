import axios from "axios";

const Base_url = "https://api.themoviedb.org/3"
const TMBD_TOKEN = import.meta.env.VITE_APP_TMBD_TOKEN

const headers = {
    Authorization : "bearer " + TMBD_TOKEN
}

const FetchDataFromApi = async(url_endpoint, parameters) => {
    try{
        const response = await axios.get(Base_url + url_endpoint, {
            headers: headers,
            params: parameters
        })
        return response
    }
    catch(err){
        console.error(err)
        return err
    }

}
export default FetchDataFromApi