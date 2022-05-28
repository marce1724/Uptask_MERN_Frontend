
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  
   const [tokenValido, setTokenInvalido] = useState(false)
   const [alerta, setAlerta] = useState({}) 
   const [password, setPasword] = useState('')
   const [passwordModificado, setpasswordModificado] = useState(false)

   const params = useParams()
   const {token} = params

   useEffect(() =>{
      
       const comprobarToken = async () =>{

           try {
               await clienteAxios(`/usuarios/olvide-password/${token}`) 
               setTokenInvalido(true)

           } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
           }
       }
       comprobarToken()
       
   }, [])

   const handleSubmit = async e => {
      e.preventDefault()

      if(password.length < 6){
         setAlerta({
             msg: "El password debe de ser minimo de 6 caracteres",
             error: true
         })
         return
      }
      
      try {

         const url = `/usuarios/olvide-password/${token}`
         const {data} = await clienteAxios.post(url, {password}) 
         setAlerta({
            msg: data.msg,
            error: false
         })  
         setPasword('')
         setpasswordModificado(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
      })
      }
   }
   const {msg} = alerta

  return (
      <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y no pierdas acceso a tus 
            <span className="text-slate-700"> proyectos</span>
        </h1>

        {msg && <Alerta alerta={alerta}/>}

        {tokenValido && (
            <form 
               className="my-10 bg-white shadow rounded-lg px-10 py-10"
               onSubmit={handleSubmit}
            >
              <div className="my-5">
                  <label 
                     className="uppercase text-gray-600 block text-xl font-bold"
                     htmlFor="password"
                  >Nuevo Password</label>

                  <input
                     id="password"
                     type="password"
                     placeholder="Escribe tu Nuevo Password"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                     value={password}
                     onChange={e => setPasword(e.target.value)}
                  />
              </div>

              <input
                  type="submit" 
                  value="Guardar Nuevo Password"
                  className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl
                  hover: cursor-pointer hover:bg-sky-800 transition-colors"
              />
        </form>
        )}

        {passwordModificado && (
           <Link
              to="/"
              className="block text-center my-5 text-slate-500 uppercase text-sm" 
           >Inicia Sesión</Link>
        )}
      </>
  )
}

export default NuevoPassword