import { Stack,Typography,TextField, IconButton,Drawer, AppBar, Toolbar, Button, InputAdornment,createTheme, ThemeProvider} from "@mui/material";
import './AIPage.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";


function AIPage() {
 
  let [openOption,optionClose]=useState(false);
  let[user_input,setMessage]=useState(" ");
  let [users,setUsers]=useState([]);
  let [datas,setDatas]=useState([]);


  let nav=useNavigate();

  let signlogin=()=>{
    nav("/signlogin")
  }

  let theme=createTheme({
    palette:{
      primary:{
        main:"#1565c0"
      }
    }
      
    
  })

  let closetab=()=>{
    optionClose(false);
  }

  let send=async()=>{
    
    // post data link put in this
   let data=await fetch("https://2iiiurnolh.execute-api.us-west-2.amazonaws.com/prod",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
    body:JSON.stringify({ip})
    })
    
    let clear=document.getElementById("changescolor").value=" ";
    setUsers([...users,user_input])
    setMessage([user_input,clear]);
    
    
  }

   
   
 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const server = await fetch("https://2iiiurnolh.execute-api.us-west-2.amazonaws.com/prod");//data come from AI
            const data = await server.json();
            setDatas(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
});
  return (
    <>
    
    
    <Stack id="AImain">
      <AppBar position="static" sx={{backgroundColor:"darkblue"} }>
        <Toolbar>

      
        <IconButton onClick={()=>optionClose(true)} sx={{marginTop:"1vh"}}>
          <FormatListBulletedIcon sx={{fontSize:"5vh",color:"#1976d2"}}/>
        </IconButton> 
      
          
        </Toolbar>
      </AppBar>


      <Drawer 
              anchor="left"
              open={openOption}
              onClose={openOption}
              onClick={()=>optionClose(false)}
              PaperProps={{sx:{backgroundColor:"darkblue",display:"flex",flexWrap:"wrap",height:"70vh"}}}
              >
              
              <Typography sx={{textAlign:"center",fontSize:"40px",color:"blue",marginLeft:"3vw" }}>
                  MAHADAV AI &nbsp;

                  <IconButton onClick={closetab} disableRipple>
                      <CloseIcon sx={{color:"#1976d2"}}/>
                </IconButton>
              </Typography>

                <Typography sx={{wordWrap:"break-word",textAlign:"center", marginTop:"10vh"}}>
                  <Button  sx={{wordWrap:"break-word"}} onClick={signlogin}>Sign &nbsp;/&nbsp;&nbsp;Login</Button>
              </Typography>
                  <hr width="300"/>
              <Typography sx={{textAlign:"center" }}>
                  <Button href="#">Feedback</Button>
              </Typography>

              <br/><br/><br/><br/><br/><br/>



              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            
                
              
             
       </Drawer>

      

      <Stack sx={{height:"70vh",overflow:"hidden",overflowY:"auto",borderRadius:"16px",marginTop:"7vh"}} id="mainMessage">
        {
          <>
            {
            users.map((data)=>(
              <Typography variant="body1" component="p"sx={{color:"black",backgroundColor:"white",width:"40vw",marginTop:"1vh",wordWrap:"break-word",borderRadius:"8px",paddingLeft:"1vw",marginLeft:"2vw"}}>{data}</Typography>

            ))
          }

            {
              datas.map((ai)=>(
                    <Typography variant="body1" component="p"sx={{color:"black",backgroundColor:"white",width:"40vw",marginTop:"4vh",wordWrap:"break-word",borderRadius:"8px",paddingLeft:"1vw", marginLeft:"54vw"}}>{ai.user_input}</Typography> 

            ))
              }
          </>
        }
            {/* users.map((data)=>(
              <Typography variant="body1" component="p"sx={{color:"black",backgroundColor:"white",width:"40vw",marginTop:"1vh",wordWrap:"break-word",borderRadius:"8px",paddingLeft:"1vw",marginLeft:"2vw"}}>{data}</Typography>

            )),

            datas.map((ai)=>(
                    <Typography variant="body1" component="p"sx={{color:"black",backgroundColor:"white",width:"40vw",marginTop:"4vh",wordWrap:"break-word",borderRadius:"8px",paddingLeft:"1vw", marginLeft:"54vw"}}>{ai}</Typography> 

            )), */}
            
               
      </Stack>

        <Stack id="inputdiv" sx={{marginLeft:"12vw",marginTop:"2vh"}}>


          <ThemeProvider theme={theme}>
          
             <TextField placeholder="Enter the message" multiline InputProps={{sx:{borderRadius:"20px","& fieldset":{borderColor:"black"},backgroundColor:"white"},endAdornment:(<InputAdornment position="left"><SendIcon sx={{cursor:"pointer"}} onClick={send}/></InputAdornment>)}}  id="changescolor" color="primary" name="message" onChange={(e)=>setMessage(e.target.value)} ></TextField>
         
          </ThemeProvider>
        </Stack>
    </Stack>
      
    </>
  )
}

export default AIPage
