import React from "react";
import {Button} from '../ui/button'
import {Link} from 'react-router-dom'

function Hero(){
    return(
        <div className = 'flex flex-col items-center mx-56 gap-9'>
            <h1 className = 'font-extrabold text-[50px] text-center mt-[60px]'>
                <span className = 'text-[#57b9ff]'>Discover Your Next Adventure with AI:</span>
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className = 'text-xl text-gray-500 text-center'>
                Your personal trip planner, travel curator, creating custom itineraries 
                tailored to your interests and budget.
            </p>
            <Link to = {'/create-trip'}>
                 <Button className = 'align-center'>Get Started, Its Free!</Button>

            </Link>
        </div>
    )
}

export default Hero;