//app\users\view\[id]\page.jsx
"use client";
   
import React, { useState, useEffect } from 'react';
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import { useParams } from 'next/navigation'
  
export default function ViewUser() {
    const {id}=useParams();
   
    console.log(id);
   
    const[user,setUser]=useState([]);
    
    useEffect(()=>{
        fetchUser();
    },[id]);
    
    const fetchUser=async()=>{
        try{
        const result=await axios.get("http://localhost/api_next/index.php/"+id);
          console.log(result.data);
          setUser(result.data)
    
        }catch(err){
            console.log("Something Wrong");
        }
    }
   
    return (
    <div className="max-w-2xl mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">View User</h1>
      <table className="table table-zebra">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Email</th>         
              <th>Mobile</th>      
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
            </tr>
          </tbody>
      </table>
    </div>
  );
}