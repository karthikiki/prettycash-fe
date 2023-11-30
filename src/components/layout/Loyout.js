import moment from 'moment'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import { DatePicker, Form, Input, Modal, Select, Table, message } from "antd"
import Header from './Header'
import Footer from './Footer'
import Spinner from './spinner'
import axios from "axios"
import Analytics from './Analytics'
const { RangePicker } = DatePicker;

const Loyout = () => {
  const [showModel, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelecteddate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)
  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
        </div>
      )
    }

  ]

  //getall transation

  /// Hook
  useEffect(() => {

    const getAllTransations = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("users"))
        setLoading(true)
        const res = await axios.post('/transections/get-transection', { userid: user._id, frequency, selectedDate, type })
        setLoading(false)
        setAllTransection(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error("fetch issues")
      }
    }
    getAllTransations();
  }, [frequency, selectedDate, type])



  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("users"))
      console.log(user)
      setLoading(true)
      if (editable) {
        await axios.post('/transections/edit-transection', {
          payload: {
            ...values, userId: user._id
          },
          transactionId: editable._id
        })

        setLoading(false)
        message.success('Transectiopn Updated Successfully')
      } else {
        await axios.post('/transections/add-transection', { ...values, userid: user._id, frequency })

        setLoading(false)
        message.success('Transectiopn Added Successfully')
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false)
      message.error("Faild to add transection")
    }
  }
  return (
    <>
      <Header />
      <div className='content'>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>
              Day
              <Select value={frequency} onChange={(values) => setFrequency(values)}>
                <Select.Option value='7'>Last 1 Week</Select.Option>
                <Select.Option value='30'>Last 1 Month</Select.Option>
                <Select.Option value='365'>Last 1 Year</Select.Option>
                <Select.Option value='custom'>custom</Select.Option>
              </Select>
              {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} />}
            </h6>

          </div>
          <div>
            <h6>
              Type
              <Select value={type} onChange={(values) => setType(values)}>
                <Select.Option value='all'>All</Select.Option>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
              {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} />}
            </h6>

          </div>
          <div className='switch-icons'>
            <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />

          </div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>

          <div>
          </div>

        </div>
        <div>
          {viewData == 'table' ?
            <Table columns={columns} dataSource={allTransection} />
            : <Analytics allTransection={allTransection} />}
        </div>
        <Modal title={editable ? "Edit Transaction" : "Add Transection"} open={showModel}
          onCancel={() => setShowModal(false)}
          footer={false}>
          <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
            <Form.Item label="Amount" name="amount">
              <Input type='text' />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="category" name="category">
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="rent">Rent</Select.Option>
                <Select.Option value="bike">Fuel</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type='date' />
            </Form.Item>
            <Form.Item label="Reference" name="refrence">
              <Input type='text' />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type='text' />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type='submit' className='btn btn-primary'>
                {" "}
                Save</button>
            </div>
          </Form>
        </Modal>

      </div>
      <Footer />
    </>
  )
}
export default Loyout