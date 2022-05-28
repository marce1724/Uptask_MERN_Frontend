import { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {

  const [email, setEmail] = useState('')
  const {mostrarAlerta, alerta, sumbitColaborador} = useProyectos()

  const handleSubmit = e =>{
       e.preventDefault()

       if(email === ''){
          mostrarAlerta({
             msg: 'El Email es obligatorio',
             error: true
          })
          return
       }

       sumbitColaborador(email)
  }

  const {msg} = alerta

  return (
      <form
         className="bg-white py-10 px-5 W-full md:w-1/2 rounded-lg shadow w-full"
         onSubmit={handleSubmit}
      >
         {msg && <Alerta alerta={alerta}/>}
         <div className="mb-5">
             <label
             className='text-gray-700 uppercase font-bold text-sm'
             htmlFor='nombre'
             >Email Colaborador</label>
             
            <input
             type="email"
             id="nombre"
             placeholder="Email del Usuario"
             className='border-2 w-full p-2 mt-2 placeholder-gay-400 rounded-md'
             value={email}
             onChange={e => setEmail(e.target.value)}
            />
         </div>

         <input
             type="submit"
             className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded'
             value='Buscar Colaborador'
         />
      </form>
  )
}

export default FormularioColaborador