import { useEffect, useState } from "react";
import NavbarC from "../components/navBar/NavBar"; 
import { getToken } from "../API/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "../redux/rolSlice";
import { fetchUsuarios } from "../redux/usuariosSlice";
import { fetchGasto } from "../redux/gastoSlice";
import { fetchIngreso } from "../redux/ingresoSlice";

const Home = () =>{
    
    const [token, setToken] = useState(getToken());
    const dispatch = useDispatch();

    const rolState = useSelector(state => state.roles);
    const usuarioState = useSelector(state => state.usuarios);
    const gastoState = useSelector(state => state.gastos);
    const ingresoState = useSelector(state => state.ingresos);
    
    
    useEffect(() => {dispatch(fetchRoles())}, [rolState]);
    useEffect(() => {dispatch(fetchUsuarios())}, [usuarioState]);
    useEffect(() => {dispatch(fetchGasto())}, [gastoState]);
    useEffect(() => {dispatch(fetchIngreso())}, [ingresoState]);

    useEffect(() => {

        const intervalId = setInterval(() => {
            const currentToken = getToken();
            if (currentToken !== token) {
              setToken(currentToken);
            }
          }, 1000);

        return () => clearInterval(intervalId);

    }, [token]);

   
    
    let aux = 0;
    let gastosAux = 0;
    let ingresosAux = 0;

    if(gastoState.gastos){
      gastoState.gastos.forEach(gasto => gastosAux = gastosAux - gasto.monto);
    }
    if(ingresoState.ingresos){
      ingresoState.ingresos.forEach(ingreso => ingresosAux = ingresosAux + ingreso.monto);
    }

    aux = gastosAux + ingresosAux;
    return (
      <>
        <h1 className="mt-10 text-3xl text-center font-bold ">TOTAL AHORRADO</h1>
        <h1 className="text-3xl text-center">${aux}</h1>

      </>
    )
  
  }

  export default Home;