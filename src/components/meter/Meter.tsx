import styles from './Meter.module.sass';

interface MeterParams{
    val:number
    min?:number,
    max?:number,
    animThreshold?:number,
    className?:string
}
export const Meter = ({min=0,max=1,val, animThreshold=max*.75, className}:MeterParams)=>{
    const animIntensity = Math.max(Math.min((val-animThreshold)/max,1),0);
    const inheritedClass = className?" "+className:"";
    const style = {
        '--minimum':min,
        '--maximum': max,
        '--value':val,
        '--anim-intensity':animIntensity
        } as React.CSSProperties;
    return  <div className={styles.meter+inheritedClass} style={style}>
                <span className={styles.value} data-value={val+""}>{val}</span>
            </div>
}