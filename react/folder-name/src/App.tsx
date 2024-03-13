import tw from 'twin.macro'
import { Button, Logo } from './components'
import axios from 'axios'
import { useEffect } from 'react'

const getPokemon = async () => {
  const pokemon = axios.get('http://localhost:8080/evolution').then((response) => response.data)
  return pokemon;
}

const App = () => {
  useEffect(() => {
    getPokemon();
  }, []);

  return (
  <div tw="flex flex-col w-full h-full items-center justify-center">
    <h1>Levelling Up</h1>
    <div tw="flex-1 flex flex-row ">
      <div tw="flex-1">
        
      </div>
      <div tw="flex-1">
      
      </div>
      <div tw="flex-1">
      
      </div>
    </div>
  </div>
)}

export default App
