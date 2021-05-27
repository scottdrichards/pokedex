import styles from './PokeType.module.sass'
export const PokeType=({type}:{type:string})=>{
    return <div className={styles.type} style={{'--type-color':`var(--${type})`}}>{type}</div>
}