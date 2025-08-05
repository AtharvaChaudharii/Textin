"use client";

import Dropzone from "./dropzone";

const ThumbnailCreator=() =>{

    const setSelectedImage=async  (file?:File) => {};
    return (
        <Dropzone setSelectedImage={setSelectedImage} />
    )
}
export default ThumbnailCreator;