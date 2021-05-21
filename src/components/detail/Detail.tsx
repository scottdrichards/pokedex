import { useEffect, useState } from "react";
import { getPokemon, PokemonAttributes } from "../../API";
import { CapitalFirst } from "../../utils";

import styles from './Detail.module.css';

interface DetailProps{id:number}
const Detail = (props:DetailProps)=>{
    const [attrs, setAttrs] = useState<PokemonAttributes|undefined>(undefined)
    
    useEffect(()=>{
        getPokemon(props.id).then(setAttrs)
    },[props.id])// only change when props.id changes (and not internal state)
     
    
    return <div className={styles.detail}>
        <header>
            <span className={styles.name}>{attrs?.name}</span>
            <span className="id">#{attrs?.id}</span>
            {attrs?.types.map(type=>(
                <div className="type" key={type}>{type}</div>
            ))}
        </header> 
        <div className="body">
            <img src={attrs?.image} alt={attrs?.name}></img>
            <div className="stats">
                {attrs&&Object.entries(attrs.stats).map(([k,v])=>(
                <div key={k}>
                    <div className="label">{k}</div>
                    <meter value={v} max={250}>{v}/{250}</meter>
                </div>
            ))}
            </div>
            <div className="genus">{attrs?.genus}</div>
            <div className="description">{attrs?.description}</div>
            <section>
                <header>Profile</header>
                {[
                    ["Height",attrs?.height + " m"],
                    ["Weight", attrs?.weight+" kg"],
                    ["Egg Groups", attrs?.egg_groups.map(CapitalFirst).join(", ")],
                    ["Abilities", attrs?.abilities.map(CapitalFirst).join(", ")]
                ].map(([label,value])=>(
                    <div key={label}>
                        <div className="label">{label}</div>
                        <div className="value">{value}</div>
                    </div>
                ))}
            </section>
        </div>
    </div>
}
export default Detail