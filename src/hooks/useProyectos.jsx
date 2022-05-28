
import { useContext } from "react"
import ProyectosContext from '../context/ProyectosProviders'


const useProyectos = () => {

     return useContext(ProyectosContext)
}

 
export default useProyectos  