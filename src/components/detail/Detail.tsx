import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getPokemon, PokemonAttributes } from "../../API";
import { CapitalFirst } from "../../utils/utils";
import { ColorString, DominantColors } from "../../utils/color"
import styles from './Detail.module.css';
import { PokeType } from "../pokeType/PokeType";
import { Meter } from "../meter/Meter";


interface DetailProps{id:number}
const Detail = ({id}:DetailProps)=>{
    ////////////////
    // Set up hooks

    // State management
    const [attrs, setAttrs] = useState<PokemonAttributes&{styleVars?:React.CSSProperties}|undefined>(undefined);
    
    // Used for the 'go back' button
    const history = useHistory();
    
    // Download data when id (not state) changes
    useEffect(()=>{
        getPokemon(id).then(res=>res.data).then(attrs=>{
            // Grab the image to find out color scheme
            DominantColors(attrs.image/*url*/).then(colors=>{
                    const styleVars = {} as React.CSSProperties;
                    if (colors[0]) styleVars['--primary-color']=ColorString(colors[0]);
                    if (colors[1]) styleVars['--secondary-color']=ColorString(colors[1]);
                    setAttrs({...attrs,styleVars})
                })

                // Update state
                setAttrs(attrs);
            })
    },[id])
     

    ////////////////
    // Render
    return <div className={styles.detail} style={attrs?.styleVars}>
        <button type="button" onClick={()=>history.goBack()} className={styles.button}>⬅</button>
        <span className={styles.name}>{attrs?.name}</span>
        <span className={styles.id}>#{attrs?.id}</span>
        <section className={styles.typeContainer}>
            {attrs?.types.map((type,i)=>(
                <PokeType type={type} key={i}/>
            ))}
        </section>
        <figure className={styles.figure}><img src={attrs?.image} alt={attrs?.name} ></img></figure>
        <section className={styles.stats}>
            {attrs&&Object.entries(attrs.stats).map(([k,v],i)=>
                    <div key={i}>
                        <div className="label">{k}</div>
                        <Meter val={v} min={0} max={255}/>
                    </div>
                    )}
        </section>
        <section>
            <div className={styles.genus}>{attrs?.genus}</div>
            <div className={styles.description}>{attrs?.description}</div>
        </section>
        <section className={styles.profile}>
            <header>Profile</header>
            {[
                ["Height",attrs?.height + " m"],
                ["Weight", attrs?.weight+" kg"],
                ["Egg Groups", attrs?.egg_groups.map(CapitalFirst).join(", ")],
                ["Abilities", attrs?.abilities.map(CapitalFirst).join(", ")]
            ].map(([label,value])=>(
                <div key={label}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.value}>{value}</div>
                </div>
            ))}
        </section>
    </div>
}
export default Detail