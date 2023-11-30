import React, {useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/layout/spinner'


const Register = () => {

const navigate = useNavigate()
const [loading, setLoading] = useState(false)

  const submitHandler= async (values) =>{
    try {
      setLoading(true)
      console.log(values)
      await axios.post("/users/register", values)
      console.log(values)
      message.success('Registeration Sucessfull')
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      message.error("Invalid username or Password")
      console.log(`Cant register: ${values}`)
    }
  }
//prevent for login user
useEffect(()=>{
  if(localStorage.getItem("users")){
    navigate("/")
  }
},[navigate])

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
      <Form layout='vertical' onFinish={submitHandler}>
        <h1>Register </h1>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type='email'/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password"/>
        </Form.Item>
        <div className='d-flex justify-content-between'>
          <Link to="/login" className='pages'>Alreay Register ? Click here to login</Link>
          <button className='btn btn-primary'>Register</button>
        </div>
      </Form>

      </div>

    </>
  )
}

export default Register