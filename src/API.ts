export const APIURL = "https://intern-pokedex.myriadapps.com/api"
export const API_VERSION = "v1"
export const POKEMONURL = APIURL+'/'+API_VERSION+"/pokemon"

const api=<T>(url:string):Promise<T>=>{
    console.log("Fetching from: "+url)
    return fetch(url)
        .then(res=>{
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        })
        .then((data:{data:T})=>data.data)
        .catch(error=>{
            console.error(error);
            throw error;
        })
}

type StatsTypes = "hp"|"speed"|"attack"|"defense"|"special-attack"|"special-defense";

export interface PokemonAttributes{
    id:number,
    name: string,
    image: string,
    types:string[],
    stats:{
        [key in StatsTypes]:number
    }
    height: number,
    weight:number,
    abilities:string[],
    egg_groups:string[],
    genus:string,
    description:string
}
export const getPokemon = (id:number)=>api<PokemonAttributes>(POKEMONURL+'/'+id)