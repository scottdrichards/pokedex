import { sameOrigin } from "./utils";

export interface RGB{
    r:number,
    g:number,
    b:number
}
export type RGBA = (RGB & {a:number})

/**
 * Simple and fast way to calculate rough luminence value
 */
export const luminance = (c:RGB)=>{
    // From https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    return (c.r+c.r+c.r+c.b+c.g+c.g+c.g+c.g)>>3
}

/**
 * Converts color object to "rgb(255,234,23)" type string
 */
export const ColorString = (c:RGBA|RGB)=>{
    const rgbStr = [c.r,c.g,c.b].join(",");
    if ('a' in c){
        return `rgba(${rgbStr},${c.a})`
    }
    return `rgb(${rgbStr})`;
}

/**
 * This will try to extract the colors from an image url. This is only possible
 * with CORS enabled. If the url doesn't work (i.e., because of CORS) it will try
 * the fallback URL
*/
type DominantColorsParams={
    url:string|string[],
    numSamples?:number,
    numColors?:number
}
export const DominantColors = async ({url,numSamples=100,numColors=2}:DominantColorsParams)=>{
    // Because we can take a single url OR an array of urls, we need cause them to all be an array
    const urls = typeof url === "string"? [url]:url;
    
    /////////////////////////
    // Load the image section
    /////////////////////////
    const image = new Image();

    /**
     * This will set crossOrigin if needed then set src
     */
    const assignImgSrc=(src:string)=>{
        // To look at pixel data the image needs to either be CORS or same origin
        const crossOrigin = !sameOrigin(urls[0]);
        if (crossOrigin) image.crossOrigin = 'anonymous';
        image.src = src;
    }    

    // Wait for the image to load correctly or error out
    await new Promise((res,rej)=>{
        // When it works, yay
        image.onload = ()=>res(true)
        // When it doesn't work, try another url in the chain
        image.onerror = ()=>{
            const curIndex = urls.findIndex(url=>url===image.src);
            const nextURL = urls[curIndex+1];
            if (curIndex >=0 && nextURL) {
                assignImgSrc(nextURL)
            }else{
                rej("Cannot retreive image")
            }
        }
        assignImgSrc(urls[0]);
    })

    /////////////////////////
    // Canvas section
    /////////////////////////

    // Create a canvas to receive the image
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    // Draw the image
    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height );

    // Now start reading the pixel data
    const imageData = ctx?.getImageData(0,0,canvas.width,canvas.height);
    if (imageData){
        // The imageData is a stream of RGBA data, we need to group them
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
            // Step 1: Filter out pixels we don't want to include
            .filter(p=>{
                const isTransparent = p.a<.1;
                return !isTransparent;
            })
            .filter(p=>{
                const isGrayscale = p.r===p.g && p.g===p.b;
                return !isGrayscale;
            })
            .filter(p=>{
                const tooLight = luminance(p) > 300;
                return !tooLight
            })
            // Only use every n pixel
            .filter((p,i)=>{
                return i%(Math.floor(numPixels/numSamples))===0
            })
            // This goes through and bins the pixels, forming a count of each
            // RGB value used. In order to keep the JS chain going, the pixel
            // counts map is wrapped in a 1 element array.
            .reduce(([pixelCounts],curPixel)=>{
                // Generates a string fom the pixel values
                const keyString = Object.values(curPixel).join("_");
                // Get current count and add 1
                const count = (pixelCounts.get(keyString)?.count||0)+1;
                // Set the key to the new value
                pixelCounts.set(keyString,{color:curPixel,count});
                return [pixelCounts]
            },[new Map()]as Map<string,{color:RGBA,count:number}>[])
            // Turn [Map<string,{RGB,count}>] to [{RGB,count}]. Flatmap is
            // necessary to remove the wrapper on Map
            .flatMap(pixelCounts=> Array.from(pixelCounts.values()))
            // Only get top n values
            .sort((a,b)=>a.count-b.count)
            .map(({color,count})=>color)
            .filter((_,i)=>i<numColors)
    }else{
        throw new Error("Could not get image data")
    }
}