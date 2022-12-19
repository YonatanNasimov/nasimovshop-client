import React from 'react'
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { doApiMethod, server_url } from '../../services/apiServices';

const UpdateUser = () => {
    const params = useParams();
    const nav = useNavigate();
    const userId = params["userId"];
    const user = useSelector((state) =>
        state.user.users.find((user) => user._id === userId)
    );
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubForm = (bodyFormData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        console.log(bodyFormData)
        doApiForm(bodyFormData);
    }

    const doApiForm = async (bodyFormData) => {
        let url = server_url + "/users/" + userId;
        try {
            let resp = await doApiMethod(url, "PUT", bodyFormData)
            if (resp.data) {
                alert("user update succefuly");
                nav("/admin/users")
            }
            else {
                alert("There problem , try again later")
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem , or category url already in system")
        }
    }

    return (
        <React.Fragment>
            <span className="userUpdateTitle">Edit</span>
            <form onSubmit={handleSubmit(onSubForm)} className="userUpdateForm">
                <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label>Username</label>
                        <input
                            {...register("username", { required: true, minLength: 2 })}
                            type="text"
                            defaultValue={user.username}
                            className="userUpdateInput"
                        />
                        {errors.username && <div style={{color:"red"}}>Enter valid name (min 2 chars) </div>}
                    </div>
                    <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            type="email"
                            defaultValue={user.email}
                            className="userUpdateInput"
                        />
                        {errors.email && <div style={{color:"red"}}>Enter valid email</div>}
                    </div>
                    <div className="userUpdateItem">
                        <label>Phone</label>
                        <input
                            {...register("phone", { required: true, minLength: 3 })}
                            type="text"
                            defaultValue={user.phone}
                            className="userUpdateInput"
                        />
                        {errors.phone && <div style={{color:"red"}}>Enter valid phone (min 2 chars) </div>}
                    </div>
                </div>
                <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                        <img
                            className="userUpdateImg"
                            src={user.img_url}
                            alt={user.username}
                        />
                        <label htmlFor="file">
                            <PublishIcon className="userUpdateIcon" />
                        </label>
                        {/* <input type="file" id="file" style={{ display: "none" }} /> */}
                    </div>
                    <button className="userUpdateButton">Update</button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default UpdateUser