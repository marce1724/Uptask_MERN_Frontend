import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e =>{
         e.preventDefault()

         if([email, password].includes('')){
             setAlerta({
                 msg: "Todos los campos son obligatorios",
                 error: true
             })
             return
         }
         
         //Autenticar usuario
         try {
             const {data} = await clienteAxios.post('/usuarios/login', {email, password})
             setAlerta({})
             localStorage.setItem('token', data.token)
             setAuth(data)
             navigate('/proyectos')
        
         } catch (error) {

             console.log(error)
             setAlerta({
                 msg: error.response.data.msg,
                 error: true
             })
         }
    }

     const {msg} = alerta

    return (
      <>
          <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus 
          <span className="text-slate-700"> proyectos</span></h1>

          {msg && <Alerta alerta={alerta}/>}

          <form 
             className="my-10 bg-white shadow rounded-lg px-10 py-10"
             onSubmit={handleSubmit}
          >
               <div className="my-5">
                  <label 
                     className="uppercase text-gray-600 block text-xl font-bold"
                     htmlFor="email"
                  >Email</label>

                  <input
                     id="email"
                     type="email"
                     placeholder="Email de Registro"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>

               <div className="my-5">
                  <label 
                     className="uppercase text-gray-600 block text-xl font-bold"
                     htmlFor="password"
                  >Password</label>

                  <input
                     id="password"
                     type="password"
                     placeholder="Password de Registro"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>

              <input
                  type="submit" 
                  value="Iniciar Sesión"
                  className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded-xl
                   hover: cursor-pointer hover:bg-sky-800 transition-colors"
               
               />
          </form>

          <nav className="lg:flex lg:justify-between">
               <Link
                   to="registrar"
                   className="block text-center my-5 text-slate-500 uppercase text-sm" 
               >¿No tienes una cuenta? Regístrate</Link>

               <Link
                   to="olvide-password"
                   className="block text-center my-5 text-slate-500 uppercase text-sm" 
               >Olvide mi password</Link>
          </nav>
      </>
  )
}

export default Login