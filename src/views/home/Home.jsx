import Navbar from "../../components/navBar/NavBar"; 
import { getToken } from "../../API/auth";
const token = getToken();
console.log(token);

const Home = () =>{

    return (
        <>
            <Navbar/>
        </>
    );
}

export default Home;