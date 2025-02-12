import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';

function CreateTrip(){
    const[place,setPlace] = useState();
    return(
        <div className = 'sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
            <h2 className = 'font-bold text-3xl'>Tell us your travel preferences</h2>
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
                            onChange:(v)=>{setPlace(v);console.log(v)}
                        }}
                    />
                </div>

                <div className = 'mt-20 flex flex-col gap-5'>
                    <h2 className = 'text-xl font-medium'>How many days are you planning your trip</h2>
                    <Input placeholder={'Ex.3'} type = 'number'/>
                </div>
            </div>
            <div>
                <h2 className = 'text-xl my-3 font-medium mt-20'>What Is Your Budget</h2>
                <div className = 'grid grid-cols-2 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item,index) =>(
                        <div key = {index} className = 'p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
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
                        <div key = {index} className = 'p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
                            <h2 className = 'text-4xl'>{item.icon}</h2>
                            <h2 className = 'font-bold text-lg'>{item.title}</h2>
                            <h2 className = 'text-smaller text-grey-500'>{item.desc}</h2>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default CreateTrip