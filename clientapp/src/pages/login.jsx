import { useState } from 'react'


function Login() {


	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:4000/api/login', {
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
			<h1 className='m -bottom-4'>Login</h1>
			<form onSubmit={loginUser}>
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
				<input  className='outline-btn m-top-5' type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login