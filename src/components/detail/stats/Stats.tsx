import { PokemonStats } from "../../../API";
import { TitleCase } from "../../../utils/utils";
import { Meter } from "../../meter/Meter";
import styles from './Stats.module.sass'

interface StatsProps{
    className?:string,
    stats:PokemonStats
}
export const Stats = ({className,stats}:StatsProps)=>
<div className={styles.stats +" "+className}>
    
{Object.entries(stats).map(([k,v],i)=>(
    <div className={styles.stat} key={i}>
        <div className={styles.label} >{TitleCase(k)}</div>
        <Meter className={styles.meter} val={v} min={0} max={255}/>
    </div>
))}

</div>