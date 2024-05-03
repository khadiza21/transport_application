import React from 'react';

const Profile = () => {
    return (
        <div>
            <div className="form-control">


                <label className="label">
                    <span className="label-text font-bold">Upload Image</span>
                </label>
                <div className="input input-bordered">
                    <input
                        type="file"
                        {...register("image")}
                        className="mt-2 "
                        accept="image/*" // Limit to image files
                    />
                </div>

            </div>
        </div>
    );
};

export default Profile;