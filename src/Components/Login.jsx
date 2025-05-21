import React from 'react'

const Login = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label htmlFor="name">UserName</label>
                <input type="text" /><br />
                <label htmlFor="pass">Password</label>
                <input type="password" /><br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login
