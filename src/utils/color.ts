import { sameOrigin } from "./utils";

export interface RGB{
    r:number,
    g:number,
    b:number
}
export type RGBA = (RGB & {a:number})
const luminence = (c:RGB)=>{
    // From https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    return (c.r+c.r+c.r+c.b+c.g+c.g+c.g+c.g)>>3
}

export const ColorString = (c:RGBA|RGB)=>{
    const rgbStr = [c.r,c.g,c.b].join(",");
    if ('a' in c){
        return `rgba(${rgbStr},${c.a})`
    }
    return `rgb(${rgbStr})`;
}

export const DominantColors = async (src:string)=>{
    // Setting these as optional parameters interfered with debugging so I'll just set them here
    const numSamples = 100;
    const numColors = 2
    // Load the image
    const image = new Image();

    const crossOrigin = !sameOrigin(src);

    if (crossOrigin) image.crossOrigin = 'anonymous';
    
    await new Promise((res,rej)=>{
        image.onload = ()=>{
            res(true)
        }
        image.onerror = ()=>{
            const triedPoxy = image.src!==src
            if (crossOrigin && !triedPoxy) {
                // Hack to get around CORS https://lokeshdhakar.com/projects/color-thief/
                const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
                image.src = googleProxyURL+encodeURIComponent(src);
            }else{
                rej("Cannot retreive image")
            }
        }
        image.src = src;
    })

    // Draw the image onto a canvas
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height );

    // Now get the image data
    const imageData = ctx?.getImageData(0,0,canvas.width,canvas.height);
    if (imageData){
        // the imageData is a stream of RGBA data, we need to group them
        // by individual pixels
        const numPixels = imageData.data.length/4;
        const pixels = Array(numPixels).fill(0).map((_,i)=>(
            {
                r:imageData.data[i*4],
                g:imageData.data[i*4+1],
                b:imageData.data[i*4+2],
                a:imageData.data[i*4+3]
            }
        )) as RGBA[]
        
        // This is a chain of operations to perform on the pixel data
        // Not exactly necessary to do it this way, but it's FUNctional
        // albeit a bit hard to follow at some spots
        return pixels
            // Filter out pixels we don't like
            .filter(p=>{
                const transparent = p.a<.1;
                return !transparent;
            })
            .filter(p=>{
                const grayscale = p.r===p.g && p.g===p.b;
                return !grayscale;
            })
            .filter(p=>{
                const tooLight = luminence(p) > 300;
                return !tooLight
            })
            // Only use every n pixel
            .filter((p,i)=>{
                return i%(Math.floor(numPixels/numSamples))===0
            })
            // This stores the count map within an array, just so we
            // can keep the fun js chaining going 😀
            .reduce(([pixelCounts],cur)=>{
                const key = (()=>{
                    for(const key of pixelCounts.keys()){
                        const colorMatch = Object.entries(key).every(([channel,value])=>{
                            return value===cur[channel as keyof RGBA]
                        });
                        if (colorMatch)return key;
                    }
                    return cur;
                })();
                const count = pixelCounts.get(key)||0+1;
                pixelCounts.set(key,count);
                return [pixelCounts]
            },[new Map()]as Map<RGBA,number>[])
            .flatMap(pixelCounts=>{
                return Array.from(pixelCounts.entries());
            })
            // Only get top n values
            .sort((a,b)=>a[1]-b[1])
            .map(([k])=>k)
            .filter((_,i)=>i<numColors)
            // Have the brighter ones be first
            .sort((a,b)=>luminence(b)-luminence(a))
    }else{
        throw new Error("Could not get image data")
    }
}