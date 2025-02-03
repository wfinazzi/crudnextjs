"use client";

import React, { useState } from "react";
import axios from 'axios'

const Addnewuser = () => {

	const [inputs, setInputs] = useState([]);

	const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

	const handleSubmit = (event) => {
        event.preventDefault();
 
        axios.post('http://localhost/api_next/', inputs).then(function(response){
            console.log(response.data);
            window.location.href = '/';
        });
    }

	return (
		<div className="max-w-md mx-auto mt-5">
			<h1 className="text-2xl text-center mb-2">Add New User</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<div className="mb-5">
			  			<label htmlFor="name" className="block text-sm font-medium text-gray-900">
							Name
			  			</label>
			  			<input
							type="text"
							name="name"
							id="name"
							className="input input-bordered input-primary w-full max-w-xs"
							placeholder="Name..."
							onChange={handleChange}
			  			/>
					</div>
					<div className="mb-5">
			  			<label htmlFor="email" className="block text-sm font-medium text-gray-900">
							Email
			  			</label>
			  			<input
							type="email"
							name="email"
							id="email"
							className="input input-bordered input-primary w-full max-w-xs"
							placeholder="email..."
							onChange={handleChange}
						/>
					</div>
					<div className="mb-5">
			  			<label htmlFor="mobile" className="block text-sm font-medium text-gray-900">
							Mobile
			  			</label>
			  			<input
							type="text"
							name="mobile"
							id="mobile"
							className="input input-bordered input-primary w-full max-w-xs"
							placeholder="mobile..."
							onChange={handleChange}
			  			/>
					</div>
					<button type="submit" className="btn btn-primary">Add New User</button> 
		  		</form>
			</div>
		</div>
	  );

}

export default Addnewuser;