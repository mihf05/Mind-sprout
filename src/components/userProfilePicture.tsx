import s from './userProfilePicture.module.scss';
import { useState } from 'react';

interface com {
    photoURL: string,
    cno?: string,
    setter: any,
}

export default function UserProfilePicture({photoURL, cno, setter}: com) {
    const [photo, setPhoto] = useState<any>(null);
    return (
        <div className={`${s.imgWrapper} ${cno}`}>
            <label>
                <span className="material-symbols-outlined">photo_camera</span>
                <img src={photo ?? photoURL} alt="" />
                <input name='select' type="file" accept="image/*" onChange={(e: any) => {
                    const inputTag = e.target;
                    const selectedImg = inputTag.files[0];
                    if(selectedImg.size > 5e+6) {
                        inputTag.value = "";
                        alert("File size is too high!! Select image files less then 5 Megabytes.");
                        return;
                    };
                    setter(selectedImg);
                    let fr = new FileReader();
                    fr.onload = function () {
                        setPhoto(fr.result);
                    }
                    fr.readAsDataURL(selectedImg);
                }}/>
            </label>
        </div>
    )
}
