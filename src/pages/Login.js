import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/layout/spinner'
const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler= async(values) =>{
    try {
      setLoading(true)
      const {data} = await axios.post('/users/login', values)
      setLoading(false)
      message.success('login sucessfull')
      console.log(data)
      localStorage.setItem('users', JSON.stringify({...data.user, passwor:""}))
      navigate('/')
    } catch (error) {
      setLoading(false)
      message.error('Something went wrong')
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("users")){
      navigate("/")
    }
  },[navigate])

  return (
    <>
        <div className="register-page">
          {loading && <Spinner/>}
      <Form layout='vertical' onFinish={submitHandler}>
        <h1>Login</h1>
        <Form.Item label="Email" name="email">
          <Input type='email'/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password"/>
        </Form.Item>
        <div className='d-flex justify-content-between'>
          <Link to="/register" className='pages'>New User ? Click here to login</Link>
           <br></br>
          <button className='btn btn-secondary'>Login</button>
        </div>
      </Form>

      </div>

    </>
  )
}

export default Login