import { useState, useRef, useEffect } from "react";
import BaseIcon from "./BaseIcon";
import { mdiPlusCircle, mdiTrashCanOutline } from "@mdi/js";
import Image from "next/image";
import axios from "axios";

const ImageReader = ({ onHandleChange }: { onHandleChange?: (_: Blob) => void }) => {

    const [imageDataUrl, setImageDataUrl] = useState<string>('');
    useEffect(() => {
        // onHandleChange && onHandleChange(imageDataUrl);
        if(onHandleChange && imageDataUrl==='')onHandleChange(null);
        if (onHandleChange && imageDataUrl) {
            (async () => {
                const imageBlob = await fetch(imageDataUrl).then(res => res.blob());
                onHandleChange(imageBlob);
                // const formData = new FormData();
                // formData.append('img', imageBlob);
                // axios.post('/api/v1/catalog/upload', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }).then(response => {
                //     console.log(response.data);
                // }).catch(error => {
                //     console.error(error);
                // });
                
            })()
        }
    }, [imageDataUrl])
    const ref = useRef(null);
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const resultUrl: string = reader.result as string;
                setImageDataUrl(resultUrl);
            };

            reader.readAsDataURL(file);
        }
    }


    return (
        <>
            <div className="m-2  self-center">
                <div className='aspect-w-4 aspect-h-3 rounded-lg text-center w-full bg-slate-200 dark:bg-slate-600 hover:bg-green-200 overflow-hidden border-2 border-dashed border-slate-600 '>

                    {imageDataUrl ?
                        (
                            <div className="relative">
                                <a onClick={() => setImageDataUrl('')}><BaseIcon className="absolute right-0 top-0 cursor-pointer hover:bg-blue-400 hover:text-blue-100 hover:border-2 border-slate-300 duration-300 transition ease-in-out bg-slate-200 m-1 rounded-md" path={mdiTrashCanOutline} /></a>
                                < Image loading="lazy" onClick={() => { ref.current.click() }} src={imageDataUrl} alt="Selected" layout="responsive" width={500} height={500} />
                            </div>
                        )

                        : (
                            <div onClick={() => { ref.current.click() }} className="h-40 my-auto align-middle cursor-pointer">
                                <BaseIcon path={mdiPlusCircle} className='h-full' />
                            </div>
                        )}
                </div>
                <input type="file" ref={ref} hidden accept="image/*" onChange={handleFileInputChange} />
            </div>
        </>
    )
}
export default ImageReader;