import axios from "axios";

const http = axios.create(
    {
        baseURL : 'http://localhost',
        headers : getHeader()
    }
)


function getHeader() {
    if (localStorage.getItem('token')) {
        console.log('token exists');
        return {
            Authorization : 'Bearer ' + localStorage.getItem('token')
        };
    }else{
        console.log('token Not Exists');
        return {};
    }
}

export default http