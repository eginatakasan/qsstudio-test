import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from "dotenv";
import { Generation, MainClient, PokemonClient } from 'pokenode-ts';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const INFINITE = 9999;

interface Pokemon {
    name: string;
    height: number;
}

app.get('/evolution', async (req: Request, res: Response) => {
  try {
    // const random = await getRandomPokemon();
    res.send('Hello World');
    // res.json(random[0]);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

const getRandomPokemon = async() => {
  const api = new MainClient();

  const randomChain = await api.evolution.getEvolutionChainById(Math.random() * 10);
}

const getPokemon = async () => {
  const api = new MainClient();

  try {
    const generations = await api.game.listGenerations(undefined, INFINITE);
    generations.results.map(async (gen) => {
      const generation = await api.game.getGenerationByName(gen.name);
      console.log(`GENERATION ${gen.name}`);
      // if (generation.id == 1) {
      //   generation.pokemon_species.forEach((x) => {
      //     console.log(x.name);
      //   });
      // } 

      let strongestFirePokemon: string = '';
      let strongestFireAttck = 0;
      
      generation.pokemon_species.forEach(async (pokemon) => {
        console.log(pokemon.name);
        const p = await api.pokemon.getPokemonByName(pokemon.name);
        if (p.types.some((t) => t.type.name === 'fire')) {
          const attack = p.stats[0];
          if (attack.base_stat && attack.base_stat > strongestFireAttck) {
            strongestFireAttck = attack.base_stat;
            strongestFirePokemon = p.name;
          }
        }
      });
      console.log();
      console.log('Strongest Fire Pokemon:' + strongestFirePokemon);
      
      console.log("-");
      console.log();
    })
    
  } catch (error) {
    console.error(error);
  }
};

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
