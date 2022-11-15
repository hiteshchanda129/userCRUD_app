import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const UserEdit = () => {
    const [userName, setUserName] = useState("")
    const [userMobNo, setUserMobNo] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userAdd, setUserAdd] = useState("")
    const [err, setErr] = useState({})

    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4400/${id}`).then(res => {
            const { userdata } = res.data
            setUserName(userdata.userName)
            setUserMobNo(userdata.userMobNo)
            setUserEmail(userdata.userEmail)
            setUserAdd(userdata.userAdd)
        }).catch(e => {
            setErr(e.message)
        })
    }, [id])

    const postform = (e) => {
        e.preventDefault()

        let error = {}

        if (userName === "") {
            error.userName = "userName should be unique"
        }

        if (userMobNo === "" || userMobNo.length !== 10) {
            error.userMobNo = "length shoud be 10"
        }

        if (userEmail === "") {
            error.userEmail = "email is required"
        } else {
            if (!userEmail.includes("@" && ".")) {
                error.userEmail = "pattern validate"
            }
        }

        if (userAdd === "") {
            error.userAdd = "Address required"
        }

        if (Object.keys(error).length === 0) {
            postdata()
        } else {
            console.log(error);
            setErr(error)
        }
    }

    function postdata() {
        axios.put(`http://localhost:4400/${id}`, {
            userName, userMobNo, userEmail, userAdd
        }).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e.message)
        })
        navigate("/");
    }


    return (
        <div className='flex justify-center items-center h-full'>
            <form onSubmit={postform} className="my-20 ">

                <h2 className='bg-slate-800 text-white w-full rounded-t-xl py-4 text-xl'>EDIT USER</h2>

                <div className='bg-grey-200 py-7 px-10 rounded-b-xl border-slate-600 border-2'>

                    <div className='flex flex-col md:flex-row mt-2'>
                        <label className='my-2 w-28 flex justify-start'>UserName</label>
                        <input type="text" placeholder='username' value={userName} onChange={(e) => {
                            setUserName(e.target.value)
                        }} className="bg-gray-200 py-2 px-3 outline-none rounded w-96" />
                    </div>
                    <div>
                        {err.userName ? <p className='py-0 text-sm flex justify-end  text-red-600'>{err.userName}</p>
                            : <p className='py-0 text-sm flex justify-end '> </p>}
                    </div>



                    <div className='flex flex-col md:flex-row mt-2'>
                        <label className='my-2 w-28 flex justify-start'>mobileNo</label>
                        <input type="text" placeholder='mobileNo' value={userMobNo} onChange={(e) => {
                            setUserMobNo(e.target.value)
                        }} className="bg-gray-200 py-2 px-3 outline-none rounded w-96" />
                    </div>
                    <div>
                        {err.userMobNo ? <p className='py-0 text-sm flex justify-end text-red-600'>{err.userMobNo}</p>
                            : <p className='py-0 text-sm flex justify-end '> </p>}
                    </div>



                    <div className='flex flex-col md:flex-row mt-2'>
                        <label className='my-2 w-28 flex justify-start'>Email</label>
                        <input type="text" placeholder='Email' value={userEmail} onChange={(e) => {
                            setUserEmail(e.target.value)
                        }} className="bg-gray-200 py-2 px-3 outline-none rounded w-96" />
                    </div>
                    <div>
                        {err.userEmail ? <p className='py-0 text-sm flex justify-end  text-red-600'>{err.userEmail}</p>
                            : <p className='py-0 text-sm flex justify-end '> </p>}
                    </div>



                    <div className='flex flex-col md:flex-row mt-2'>
                        <label className='my-2 w-28 flex justify-start'>Address</label>
                        <input type="text" placeholder='Address' value={userAdd} onChange={(e) => {
                            setUserAdd(e.target.value)
                        }} className="bg-gray-200 py-2 px-3 outline-none rounded w-96" />
                    </div>
                    <div>
                        {err.userAdd ? <p className='py-0 text-sm flex justify-end  text-red-600'>{err.userAdd}</p>
                            : <p className='py-0 text-sm flex justify-end '> </p>}
                    </div>


                    <div>

                        <button type="submit" className='py-2 px-8 mt-6 text-white rounded-full tracking-widest cursor-pointer text-sm bg-slate-800 border-2 hover:border-orange-600'>Submit</button>

                    </div>
                </div>
            </form>
        </div>
    )
}
export default UserEdit;