import { useEffect, useState } from "react";
import NavbarC from "../components/navBar/NavBar"; 
import { getToken } from "../API/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../redux/rolSlice";
import { fetchUsuarios } from "../redux/usuariosSlice";

const Home = () =>{
    
    const [token, setToken] = useState(getToken());
    const dispatch = useDispatch();

    const rolState = useSelector(state => state.roles);
    const usuarioState = useSelector(state => state.usuarios);
    
    useEffect(() => {dispatch(fetchRoles())}, [rolState]);
    useEffect(() => {dispatch(fetchUsuarios())}, [usuarioState]);

    useEffect(() => {

        const intervalId = setInterval(() => {
            const currentToken = getToken();
            if (currentToken !== token) {
              setToken(currentToken);
            }
          }, 1000);

        return () => clearInterval(intervalId);

    }, [token]);

    //console.log(token);
    return (
      <>
        <h1 className="text-3xl font-bold ">Hello world!</h1>

      </>
    )
  
  }

  export default Home;