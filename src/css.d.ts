// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as CSS from 'csstype';

declare module 'csstype'{
    interface Properties{
        '--primary-color'?: string;
        '--secondary-color'?: string;
        '--background-color'?:string;
        '--warn-color'?:string;
      
        '--border-radius'?:string;
        '--spacing'?: string;
    }
}