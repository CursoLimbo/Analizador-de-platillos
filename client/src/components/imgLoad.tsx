import React, {useState} from "react";
import {CldUploadWidget} from 'next-cloudinary';
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

interface ImageUploadProps {
    onImageUpload : (savedUrl: string) => void,
    photo : string
}

interface UploadResultInfo {
    secure_url: string
}

interface UploadResult {
    event: string,
    info: UploadResultInfo
}

const ImageUpload : React.FC<ImageUploadProps> = (props) => {
    const [imageSrc, setImageSrc] = useState<string>(props.photo)
    const preset = "ml_default";

    return <CldUploadWidget
        uploadPreset={preset}
        onUpload={(result: UploadResult) => {
            if (result.event === "success") {
                setImageSrc(result.info.secure_url)
                props.onImageUpload(result.info.secure_url)
            }
        }}
    >
        {({open}) => {
            function handleOnClick(e: any) {
                e.preventDefault();
                open();
            }

            return (
                <CardActionArea onClick={handleOnClick}>
                    <CardMedia
                        sx={{height: 140}}
                        image={imageSrc}

                    />
                </CardActionArea>
            );
        }}
    </CldUploadWidget>
}

export default ImageUpload;