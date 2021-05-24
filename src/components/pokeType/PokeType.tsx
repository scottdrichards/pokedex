import styles from './PokeType.module.css'
export const PokeType=({type}:{type:string})=>{
    return <div className={`${styles.type} ${styles[type]}`}>{type}</div>
}