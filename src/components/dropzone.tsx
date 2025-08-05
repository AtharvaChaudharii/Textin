
import { MdAdd } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";


const Dropzone = (
        {setSelectedImage}
    :{setSelectedImage:(file?:File) => void}) => {
    return (
        <div className="mt-16">
            <input className="hidden" type="file" accept="image/*" id="file-upload" onChange={async (e) => setSelectedImage(e.target.files?.[0])} />
            <label htmlFor="file-upload" className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-[#F0EFEF] bg-white px-10 py-10">
               <div className="absolute inset-3 rounded-xl border border-dashed border-[#F0EFEF]"></div>
               <p>Upload File</p>
                <IoCloudUploadOutline className="h-10 w-10 "/>
            </label>

           
       </div>
    );
}
export default Dropzone;