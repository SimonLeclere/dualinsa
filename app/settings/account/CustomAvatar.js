import React, { useState } from 'react';
import Image from 'next/image';

const AvatarUploader = ({ avatar, setAvatar }) => {
    const [uploadedAvatar, setUploadedAvatar] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAvatar(reader.result);
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setUploadedAvatar(null);
        setAvatar(null);
    };

    return (
        <div className="flex flex-col items-center">
            <label className="relative cursor-pointer group">
                {uploadedAvatar ? (
                    <div
                        className={`w-28 h-28 p-1 cursor-pointer rounded-[20px] ${avatar === uploadedAvatar ? "border-2 border-blue-500" : "border-2 border-gray-200"} border-dashed transition-colors duration-300`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (avatar !== uploadedAvatar) setAvatar(uploadedAvatar);
                        }}
                    >
                        <Image
                            src={uploadedAvatar}
                            alt="avatar"
                            width={112}
                            height={112}
                            className="w-full h-full rounded-2xl object-cover"
                        />
                        <div
                            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${avatar !== uploadedAvatar ? "hidden" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleRemoveAvatar();
                            }}
                        >
                            <span className="text-white">Reset</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className="w-28 h-28 p-1 cursor-pointer rounded-[20px] border-2 border-dashed border-gray-200 flex items-center justify-center"
                        onClick={() => document.getElementById('avatarInput').click()}
                    >
                        <span className="text-gray-400">Upload</span>
                    </div>
                )}
                <input
                    id="avatarInput"
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
            </label>
        </div>
    );
};

export default AvatarUploader;
