import React from 'react';
import { message } from 'antd';

const ErrorHandler = props =>({
    success: (data)=>{
      const dataMessage = data ? data.message : ""
      return message.success("Success",dataMessage)
    },
    error:(data)=> {
        console.log("Error",data)
      return  message.error("Error",data.message)
    }
})

export default ErrorHandler