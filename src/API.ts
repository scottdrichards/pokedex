export const APIURL = "https://intern-pokedex.myriadapps.com/api"
export const API_VERSION = "v1"
const API_BASE = APIURL+'/'+API_VERSION
export const API_POKEMON_URL = API_BASE+"/pokemon"
export const API_TO_UI_URL = (apiURL:string)=>apiURL.slice(API_BASE.length)

const api=<T extends APIResponse>(url:string,queryParams?:string | string[][] | Record<string, string> | URLSearchParams ):Promise<T>=>{
    const query = queryParams?"?"+new URLSearchParams(queryParams).toString():"";
    console.log("Fetching from: "+url)
    return fetch(url+query)
        .then(res=>{
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        })
        .catch(error=>{
            console.error(error);
            throw error;
        })
}

interface APIResponse{
    data:Object,
    meta?:Object,
    links?:Object
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
export const getPokemon = (id:number)=>api<{data:PokemonAttributes}>(API_POKEMON_URL+'/'+id)

type PokemonSubAttributeKeys = "id"|"name"|"image"|"types";
export type PokemonSubAttributes = {[key in PokemonSubAttributeKeys]:PokemonAttributes[key]};

export interface PokemonList extends APIResponse{
    data:PokemonSubAttributes[],
    links:{
        first:string,
        last:string,
        prev:string,
        next:string
    },
    meta:{
        current_page:number,
        from:number,
        last_page:number,
        path:string,
        per_page:number,
        to:number,
        total:number
    }
}
export type ListQueryParams={
    name?:string,
    page?:number
}
export const getPokemonList = (params?:ListQueryParams)=>{
    const paramsStringVals = Object.fromEntries(
                                Object.entries(params||{})
                                    .map(([k,v])=>[k,v+""]))
    return api<PokemonList>(API_POKEMON_URL,paramsStringVals);}