'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const AvatarUploader = () => {
    const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
    };

    return (
        <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
                {avatar ? (
                    <>
                        <Image
                            src={avatar}
                            alt="avatar"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </>
                ) : (
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                        <span className="text-gray-400">Upload</span>
                    </div>
                )}
                <input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
            </label>
            {avatar && (
                <button
                    className="mt-2 text-sm text-gray-400 hover:text-gray-600"
                    onClick={handleRemoveAvatar}
                >
                    Remove
                </button>
            )}
        </div>
    );
};

export default AvatarUploader;
