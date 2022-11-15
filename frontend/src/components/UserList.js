import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserList = () => {

    const [userslist, setUserList] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:4400/')
            .then(res => (res.data.userdata))
            .then(result => setUserList(result))
    }, [])

    function navigateToList() {
        navigate("/form")
    }

    function removeFunc(id) {
        axios.delete(`http://localhost:4400/${id}`)
            .then(res => console.log(res))
        let filterData = userslist.filter(data => {
            return data._id !== id
        })
        setUserList(filterData)
    }

    // function editfunc(id) {
    //     axios.put(`http://localhost:4400/${id}`,
    //         {

    //         }).then(res => {
    //             console.log(res.data)
    //         })
    // }


    return (
        <div className="flex justify-center items-center">
            <table className="table-fixed my-10 w-5/6">
                <thead className="bg-slate-800 text-white w-full rounded-t-xl py-4 text-md ">
                    <tr>
                        <th>UserName</th>
                        <th>MobileNo</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userslist.map((detail, i) => {
                            return (
                                <tr key={i} className={i % 2 ? "bg-gray-200" : "bg-white my-2"}>
                                    <td>{detail.userName}</td>
                                    <td>{detail.userMobNo}</td>
                                    <td>{detail.userEmail}</td>
                                    <td>{detail.userAdd}</td>
                                    <td><span onClick={() => navigate(`/${detail._id}`)} className="m-2 text-blue-800 py-1 px-3 cursor-pointer">Edit</span> <span onClick={() => removeFunc(detail._id)} className="text-red-600 cursor-pointer">Delete</span></td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
            <button onClick={() => navigateToList()} className="bg-slate-800 text-white justify-end ml-4 p-4">Add User</button>
        </div>
    )
}

export default UserList;