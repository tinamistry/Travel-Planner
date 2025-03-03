import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { chatSession } from '@/config/AIModal';
import {setDoc, doc} from 'firebase/firestore'
import{db} from '../service/fireBaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate} from 'react-router-dom';
 


function CreateTrip(){
    const {toast} = useToast()
    const[place,setPlace] = useState();
    const[formData,setFormData] = useState([])
    const[openDialog,setOpenDialog]= useState(false)
    const[loading,setLoading]=useState(false)
    const navigate = useNavigate()

    const handleInputChange = (name, value)=>{
    
        setFormData({
            ...formData,
            [name]:value,
        })
    } 

    useEffect(()=>{
    },[formData])

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            console.log("Google login successful:", codeResp);
            GetUserProfile(codeResp);
        },
        onError: (error) => console.log("Google login error:", error)
    });

    const onGenerateTrip = async() =>{

        const user = localStorage.getItem('user')

        if (!user){
            setOpenDialog(true)
            return;
        }

        if(formData.numberOfDays > 5 && !formData?.location|| !formData?.budget||!formData?.people){
           toast({title: "Please enter all fields"})
           return;
        }

        setLoading(true)

        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData?.location?.label)
        .replace('{traveler}', formData?.people)
        .replace('{totalDays}', formData.numberOfDays)
        .replace('{budget}', formData?.budget)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);

        console.log(result?.response?.text());
        SaveAiTrip(result?.response?.text());

    }

    const SaveAiTrip=async(TripData)=>{
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user.email,
            id:docId
          });
          setLoading(false)
          navigate('/view-trip/' + docId)



    }

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept:'Application/json'
            }
        }).then((resp)=>{
            console.log(resp)
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false)
            onGenerateTrip();
        })
    }

    return(
        <div className = 'sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
            <h2 className = 'font-bold text-3xl'>Tell us your travel preference🌴</h2>
            <p className = 'mt-3 text-grey-500 text-xl'> Just provide some basic information and our trip planner
                will create a custom itinerary based on your preferences.
            </p>

            <div className = 'mt-20'>
                <div>
                    <h2 className = 'text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps = {{
                            place,
                            onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
                        }}
                    />
                </div>

                <div className = 'mt-20 flex flex-col gap-5'>
                    <h2 className = 'text-xl font-medium'>How many days are you planning your trip</h2>
                    <Input placeholder={'Ex.3'} type = 'number'
                    onChange={(e)=>{handleInputChange('numberOfDays', e.target.value)}}/>
                </div>
            </div>
            <div>
                <h2 className = 'text-xl my-3 font-medium mt-20'>What Is Your Budget</h2>
                <div className = 'grid grid-cols-2 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item,index) =>(
                        <div key = {index} 
                        onClick = {()=>(handleInputChange('budget', item.title))}
                        className = {`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData?.budget == item.title&&'shadow-lg border-black'}
                        `}>
                            <h2 className = 'text-4xl'>{item.icon}</h2>
                            <h2 className = 'font-bold text-lg'>{item.title}</h2>
                            <h2 className = 'text-smaller text-grey-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className = 'text-xl my-3 font-medium mt-20'>Who Are Your Traveling With</h2>
                <div className ='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelsList.map((item, index) =>(
                        <div key = {index} 
                        onClick = {()=>(handleInputChange('people', item.title))}
                        className = {`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                            ${formData.people==item.title&&'shadow-lg border-black'}`
                        }>
                            <h2 className = 'text-4xl'>{item.icon}</h2>
                            <h2 className = 'font-bold text-lg'>{item.title}</h2>
                            <h2 className = 'text-smaller text-grey-500'>{item.desc}</h2>
                        </div>
                    ))}

                </div>
            </div>
            <div className = 'my-15 justify-end flex'>
                <Button 
                onClick = {onGenerateTrip} 
                disabled={loading}>
                    {loading? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'

                    }
                </Button>
            </div>

            <Dialog open={openDialog}>
        
            <DialogContent>
                <DialogHeader>
    
                <DialogDescription>
                   <img src = "/logo.svg"></img>
                   <h2 className = 'font-bold text-lg mt-7'>Sign In With Google</h2>
                   <p>Sign in to the App with Google Authentication</p>
                   <Button varient = "outline" className = "w-full mt-5 flex gap-4" onClick={login}>
                        <FcGoogle className = 'h-7 w-7' />Sign in With Google
                    </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

            
        </div>
    )
}

export default CreateTrip