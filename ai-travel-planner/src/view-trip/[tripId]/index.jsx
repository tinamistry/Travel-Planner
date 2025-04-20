import React from 'react'
import { useParams } from 'react-router-dom';
import { db } from '@/service/fireBaseConfig';
import { doc , getDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { useEffect , useState } from 'react';
import InfoSection from './components/InfoSection';

function Viewtrip(){

    const{tripId} = useParams();
    const [trip, setTrip] = useState([])

    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    const GetTripData=async()=>{
        const docRef = doc(db, 'AITrips', tripId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document", docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("no search document")
            toast('No Trip Found!')
        }
    }
    

    return(

        <div>
            <InfoSection trip = {trip}/>
         </div>
    )
}

export default Viewtrip;