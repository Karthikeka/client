 
 import { Box, Dialog, InputBase, TextField, Typography,styled, } from "@mui/material";
 import { Close,DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
 import useApi from "../hooks/useApi";
 import { API_URLS } from "../services/api.urls";
 


 const dialogstyle= {
    height:'90%',
    width:'80%',
 boxshadow:'none',
    maxWidth:'100%',
    borderRadius:'10px 10px 0 0',
 }
 const Header = styled(Box) ({
     display:'flex',
     justifyContent:'space-between',
     background:'#f2f6fc',
     padding:'10px 15px',
     '&>p':{
        fontSize:14,
        fontweight:500,
     }
 })
   const Receipentswrapper = styled(Box)({
   display:'flex',
    flexDirection:'column',
    padding:' 0 15px',
    '&> div':{
        fontSize:14,
        borderBottom:'1px solid #F5F5F5',
        marginTop:'10px',
       }
    })  
const Footer = styled (Box)({
         display:'flex',
         justifyContent:'space-between',
         padding:'10px 15px',
         alignItems:'center',
    })
const SendButton = styled(Box)({
    background:'#0B57D0',
    color:'ffff',
    fontweight:500,
    textTransform:'none',
    borderRadius:18, 
    width:'100'
 })
  const ComposeMail = ({openDialog,setOpenDialog}) => {
   const [data,setData] =useState({})
   const sentEmailService = useApi( API_URLS.sentEmailService)


    const config= { 
      Host : "smtp.elasticemail.com",
      Username : process.env.REACT_APP_USERNAME,
      Password : process.env.REACT_APP_PASSWORD,
      Port:2525,
}
const closeComposeMail= (e)=>{
    e.preventDefault();
    setOpenDialog(false);
}
const sendMail =(e) => {
   e.preventDefault();
   if(window.Email){
    window.Email.send({
    ...config,
      To :data.to,
      From :"karthikeka94@gmail.com",
      Subject :data.subject,
      Body :data.body
  }).then(
    message => alert(message)
  );
   }
   const payload={
      to :data.to,
      from:'karthikeka94@gmail.com',
      subject:data.subject,
      body :data.body,
      date: new Date(),
      image:'',
      starred: false,
      name:'karthikeka',
      type:'sent'
   }
 
 sentEmailService.call(payload);
 if(!sentEmailService.error){
   setOpenDialog(false)
   setData({});
 }
 setOpenDialog(false);
}

const onValueChange=(e)=>{
   setData({...data,[e.target.name]:e.target.value})
}
     return (
        <Dialog open={openDialog} PaperProps={{sx: dialogstyle}} >
<Header>
           <Typography>New Message</Typography>   
              <Close fontSize ="small" onClick={(e)=> closeComposeMail(e)}  />
                </Header>
               <Receipentswrapper>
<InputBase placeholder="Receipents" name="to" onChange={(e)=>onValueChange(e)}/>
<InputBase placeholder="Subjects" name="subject" onChange={(e)=>onValueChange(e)} />
  </Receipentswrapper>
               <TextField
                multiline
                rows ={20}
 sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
             onChange={(e)=>onValueChange(e)}
                ></TextField>
                <Footer> 
                 <SendButton onClick={()=> sendMail }>Send</SendButton>
              <DeleteOutline onClick={()=> setOpenDialog(false)}/>
               </Footer>
             </Dialog>
    ) 
      
     }

export default ComposeMail;