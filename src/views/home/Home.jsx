import { useEffect, useState } from "react";
import Navbar from "../../components/navBar/NavBar"; 
import { getToken } from "../../API/auth";

const Home = () =>{

    const [token, setToken] = useState(getToken());
    useEffect(() => {

        const intervalId = setInterval(() => {
            const currentToken = getToken();
            if (currentToken !== token) {
              setToken(currentToken);
            }
          }, 1000); // Intervalo de 1 segundo

        return () => clearInterval(intervalId);

    }, [token]);

    //console.log(token);
    return (
      <>
        <h1 className="text-3xl font-bold ">
      Hello world!
    </h1>
      </>
    )
  
  }

  export default Home;