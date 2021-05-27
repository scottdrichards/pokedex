// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as CSS from 'csstype';

declare module 'csstype'{
    interface Properties{
        '--minimum'?: number;
        '--maximum'?: number; 
        '--value'?: number;
        '--anim-intensity'?:number;
    }
}