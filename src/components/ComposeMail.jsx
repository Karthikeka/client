 
 import { Box, Dialog, InputBase, TextField, Typography,styled, } from "@mui/material";
 import { Close,DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
 import useApi from "../hooks/useApi";
 import { API_URLS } from "../services/api.urls";
 


 const dialogstyle= {
    height:'100%',
    width:'80%',
 boxshadow:'none',
    maxWidth:'100%',
    maxheight:'100%',
    borderRadius:'10px 10px 0 0',
 }

 const Header = styled(Box) ({
     display:'flex',
     justifyContent:'space-between',
     background:'#f2f6fc',
     '& > p':{
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
    color:'#fff',
    fontweight:500,
    textTransform:'none',
    borderRadius:'18px',
    width:'100px'
 })
 const ComposeMail = ({open, setOpenDrawer }) => {
   const [data, setData] = useState({});
   const sentEmailService = useApi(API_URLS.saveSentEmails);
   const saveDraftService = useApi(API_URLS.saveDraftEmails);

   const config = {
       Username: process.env.REACT_APP_USERNAME,
       Password: process.env.REACT_APP_PASSWORD,
       Host: 'smtp.elasticemail.com',
       Port: 2525,
   }

   const onValueChange = (e) => {
       setData({ ...data, [e.target.name]: e.target.value })
   }

   const sendEmail = async (e) => {
       e.preventDefault();

       if (window.Email) {
           window.Email.send({
               ...config,
               To : data.to,
               From : "karthikeka94@gmail.com",
               Subject : data.subject,
               Body : data.body
           }).then(
               message => alert(message)
           );
       }

       const payload = {
           to : data.to,
           from : "karthikeka94@gmail.com",
           subject : data.subject,
           body : data.body,
           date: new Date(),
           image: '',
           name: 'Code for Mail',
           starred: false,
           type: 'sent'
       }

       sentEmailService.call(payload);

       if (!sentEmailService.error) {
           setOpenDrawer(false);
           setData({});
       } else {

       }
   }

   const closeComposeMail = (e) => {
       e.preventDefault();

       const payload = {
           to : data.to,
           from : "karthikeka94@gmail.com",
           subject : data.subject,
           body : data.body,
           date: new Date(),
           image: '',
           name: 'Code for Mail',
           starred: false,
           type: 'drafts'
       }

       saveDraftService.call(payload);

       if (!saveDraftService.error) {
           setOpenDrawer(false);
           setData({});
       } else {

       }
   }

 return (
        <Dialog open={open} 
        PaperProps={{sx: dialogstyle}} >

<Header>
           <Typography>New Message </Typography>   
              <Close fontSize ="small" onClick={(e)=> closeComposeMail(e)}  />
                </Header>

               <Receipentswrapper>
<InputBase
 placeholder="Receipents" 
  name="to" 
  onChange={(e)=>onValueChange(e)} 
  value={data.to}/>


<InputBase 
placeholder="Subject" 
 name="subject" 
 onChange={(e)=>onValueChange(e)}
 value={data.subject}/>

  </Receipentswrapper>

               <TextField
                multiline
                rows ={20}
 sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
          name ="body"
            onChange ={(e) => onValueChange(e)}
            value={data.body}
                ></TextField>
                
                <Footer> 
                 <SendButton onClick={(e)=>sendEmail (e)}>Send</SendButton>
              <DeleteOutline onClick={() => setOpenDrawer(false)}/>
               </Footer>
             </Dialog>
     )
   
     
     }
export default ComposeMail;



