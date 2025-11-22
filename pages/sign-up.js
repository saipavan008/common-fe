import React, {useState} from 'react';
import {deepClone, imageToBase} from "../src/component/helpers";
import API from "../src/component/api/Auth";
import {useRouter} from "next/router";

const api = new API();

function SignUp(props) {

    const [formData, setFormData] = useState({
        username: "",
        email: '',
        password: '',
        profile: ''
    });
    const [errorMessage, setErrorMessage] = useState({});
    const router = useRouter();

    const handleChange = (e) => {
        setErrorMessage({});
        const {name, value} = e;
        const shallowCopy = deepClone(formData);
        shallowCopy[name] = value;
        setFormData(shallowCopy);
    };
    const handleSignUp = () => {
        const data = deepClone(formData);
        if (!data.username) {
            setErrorMessage({username: true, text: "Enter user name"});
            return;
        }
        if (!data.email) {
            setErrorMessage({email: true, text: "Enter valid email"});
            return
        }
        if (data.password.length < 8) {
            setErrorMessage({password: true, text: "Password minimum 8 characters"});
            return
        }
        setErrorMessage({});
        api.register(data).then(res => {
            setErrorMessage({error: true, type: "text-success", text: res.data.message})
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }).catch(e => {
            setErrorMessage({error: true, type: "text-danger", text: e.response.data.message})
        })
    };

      const handleFile =  async (e) => {
        const file = e.target.files[0];
        const imageFile =  await  imageToBase(file);
        setFormData((prevState) => {
            return{
                ...prevState,
                profile: imageFile,
            }
        })
    };

    return (
        <div className="container py-md-5 py-4">
            <div className="col-md-5 mx-auto">
                <div className="card p-3">
                    <h3 className="text-center">Create account</h3>
                    <div className="col-12 form-group text-center">
                        <label className=" ">
                            <div className="col-12 overflow-hidden d-flex align-items-center justify-content-center profile-image border mx-auto pointer">
                                {
                                    formData.profile ?
                                        <img className="img-fluid h-100" src={formData.profile}/>
                                        :
                                        <h6 className="mb-0 text-center">Add profile</h6>
                                }
                                <input type="file" className="d-none" onChange={(e) => handleFile(e)}/>
                            </div>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="username" value={formData.username} onChange={(e) => handleChange(e.target)} placeholder="Enter name"/>
                        {!!errorMessage.username &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" value={formData.email} name="email" onChange={(e) => handleChange(e.target)} placeholder="Enter email" type="text"/>
                        {!!errorMessage.email &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" value={formData.password} name="password" onChange={(e) => handleChange(e.target)} placeholder="Enter password" type="password"/>
                        {!!errorMessage.password &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSignUp()}>Create account</button>
                    {!!errorMessage.error &&<p className={`mb-0 text-center mt-1 mb-0 ${errorMessage.type}`}>{errorMessage.text}</p>}
                </div>
            </div>
        </div>
    );
}

export default SignUp;