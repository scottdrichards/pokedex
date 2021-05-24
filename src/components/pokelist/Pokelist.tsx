import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getPokemonList, PokemonList } from "../../API";
import { PokeType } from "../pokeType/PokeType";

interface PokeListProps{
    onNameChange:Function,
    page?:number,
    name?:string,    
}
export const PokeList = ({onNameChange,page,name}:PokeListProps)=>{
    
    ////////////////
    // Set up hooks

    // State management
    const [attrs, setAttrs] = useState<PokemonList&{styleVars?:React.CSSProperties}|undefined>(undefined);
    
    const history = useHistory();

    // Download data when id (not state) changes
    useEffect(()=>{
        getPokemonList({...(page?{page}:{}),...(name?{name}:{})})
            .then(setAttrs)
    },[page,name])

    return <div>
        <form>
            <input type="text" value={name} onChange={(e)=>onNameChange(e.target.value)} />
        </form>
        {attrs?.data.map(({id,name,image,types},i)=>(
            <a key={i} href={history.location.pathname+id}>
                <div key={i}>
                    <span>{name}</span>
                    <img src={image} alt={name}/>
                    <div>
                        {types.map((type,i)=>(<PokeType type={type}/>))}
                    </div>
                </div>
            </a>
        ))}
    </div>
}