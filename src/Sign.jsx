import { useEffect, useState } from 'react';
import './Sign.css';
import { Alert, Snackbar } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GppBadIcon from '@mui/icons-material/GppBad';
let Sign=()=>{
	let [name,setName]=useState(" ");
	let [email,setEmail]=useState(" ");
	let [password,setPassword]=useState(" ");
	let [complete,setComplete]=useState(false);
	let [come,setCome]=useState([]);
	let [checkemail,setcheckemail]=useState(" ");
	let [checkpswds,setcheckpassword]=useState(" ");
	let [wrongInfo,setError]=useState(false);
	let [checkvaildInfo,setcheckinfo]=useState(false);

	let hides=(e,resion)=>{
		if(resion=="clickaway"){
			return 1;
		}
		setComplete(false)
	}

	let incorrect=(e,resion)=>{
		if(resion=="clickaway"){
			return 1;
		}
		setError(false)
	}

	let checkinfo=(e,resion)=>{
		if(resion=="clickaway"){
			return 1;
		}
		setcheckinfo(false)
	}
	
	

	let send=async(e)=>{
		e.preventDefault();

				let datas=await fetch("http://localhost:9000/api/come");
				let result=await datas.json();
				
				let check=false;
				result.map((datass)=>{
					if((email==datass.email) || (password==datass.password)){
						check=true;
					}
				})

				if(check){
					setcheckinfo(true);
				}
				else{
					let data=await fetch("http://localhost:9000/api/send",{
					method:"post",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({name,email,password}),
					
				
				})
				
				setComplete(true)
				}
				
			}
	

	useEffect(()=>{
		let datas=async()=>{
			try{
				let come=await fetch("http://localhost:9000/api/come");
				let data=await come.json();
				setCome(data);
				
			}
			catch(error){
				console.log("some error come try after few minute");
			}
			
		}
		  datas();
	},[])

	let mainPage=async (e)=>{
		e.preventDefault();

		let check=false;
		try{
			let come=await fetch("http://localhost:9000/api/come");
			let data=await come.json();
			
		    data.map((datas)=>{
			if((checkemail==datas.email) && (checkpswds==datas.password)){
				check=true;
			}
		})
		}

		catch(error){
			console.log(error);
		}
		
		

		
		if(check){
			window.open("http://localhost:5173/","_self");
		}
		else{
			setError(true);
		}
	}

    return(
        
	<div id="bodymain">
		<Snackbar autoHideDuration={5000} onClose={hides} open={complete}>
		     <Alert icon={<DoneAllIcon/>} severity='success'>You are succesfully sign in now go to login and login</Alert>
		</Snackbar>
		<Snackbar autoHideDuration={5000} onClose={incorrect} open={wrongInfo}>
		     <Alert icon={<GppBadIcon/>} severity='error'>Incorrect email or password please check it again</Alert>
		</Snackbar>
		<Snackbar autoHideDuration={5000} onClose={checkinfo} open={checkvaildInfo}>
		     <Alert icon={<GppBadIcon/>} severity='error'>This email or password already exists</Alert>
		</Snackbar>
		<div class="main30">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true" style={{color:'black'}} className='label1'>Sign up</label>
					<input  className="input89"type="text" name="txt" placeholder="User name" required="" onChange={(e)=>setName(e.target.value)} id='names'/>
					<input className="input89"type="email" name="email" placeholder="Email" required="" onChange={(e)=>setEmail(e.target.value)} id='emails'/>
					<input className="input89"type="password" name="pswd" placeholder="Password" required="" onChange={(e)=>setPassword(e.target.value)} id='pswds'/>
					<button className='button90' onClick={send}>Sign up</button>
				</form>
				
			</div>


			<div class="login">
				<form>
					<label for="chk" aria-hidden="true" className='label1' >Login</label>
					<input  className="input89" type="email" name="email" placeholder="Email" required="" onChange={(e)=>setcheckemail(e.target.value)}/>
					<input  className="input89" type="password" name="pswd" placeholder="Password" required="" onChange={(e)=>setcheckpassword(e.target.value)}/>
					<button className='button90' onClick={mainPage}>Login</button>
				</form>
			</div>
            </div>
			

	</div>

      
    );
}

export default Sign;