import { useState } from 'react'


function Register() {


	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:4000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		})

		const data = await response.json()
		console.log(data)

	}

	return (
		<div className='m-9 '>
			<h1 className='m -bottom-4'>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
					className='m-top-4'
				/>
				<br />
	
				
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					className='m-top-4'
				/>
				<br />
				<input className='outline-btn m-top-5' type="submit" value="Register" /><a className='m-left-6' href='http://localhost:3000/login'>Already a User</a>
			</form>
		</div>
	)
}

export default Register