import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar"; 
import { getToken } from "../API/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../redux/rolSlice";
import { fetchUsuarios } from "../redux/usuariosSlice";
import { fetchMetas } from "../redux/metaahorroSlice";
import { fetchAhorro } from "../redux/ahorroSlice";

const Home = () =>{
    
    const [token, setToken] = useState(getToken());
    const dispatch = useDispatch();

    const rolState = useSelector(state => state.roles);
    const usuarioState = useSelector(state => state.usuarios);
    const metaState = useSelector(state => state.metas);
    const ahorroState = useSelector(state => state.ahorros);
    //console.log(rolState);
    useEffect(() => {dispatch(fetchRoles())}, [rolState]);
    useEffect(() => {dispatch(fetchUsuarios())}, [usuarioState]);
    useEffect(() => {dispatch(fetchMetas())}, [metaState]);
    useEffect(() => {dispatch(fetchAhorro())}, [ahorroState]);

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