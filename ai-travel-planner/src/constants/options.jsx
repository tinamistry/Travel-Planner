export const SelectTravelsList=[
{
    id:1, 
    title: 'Just Me',
    desc:'A solo traveler in exploration',
    icon:'✈️',
    people:'1 person'
},
{
    id:2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon:'🥂',
    people:'2 People'
},{
    id:3,
    title: 'Family',
    desc:'A group of fun loving adventurers',
    icon:'🏡',
    people:'3 to 5 people'
},{
    id:4,
    title:'Friends',
    desc:'A bunch of thrill seekers',
    icon:'⛵️',
    people: '5 ot 10 people'
},
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay Conscious of Costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'kep cost on the average side',
        icon:'💰'
    },{
        id:3,
        title:'Luxury',
        desc:'Dont wory about costs',
        icon:'💸'
    },

]

export const AI_PROMPT= "Generate a travel plan with the : {location} for {traveler} for {totalDays} with a {budget} budget, give me a list of hotel options with the hotelName, hotelAddress, hotelDescription, hotelImageURL,  geo coordinates, rating, and suggest itinerary with placeName, placeDetails, placeImageURL,  GeoCoordinates,  ticket pricing, rating, time to travel to each location for {totalDays} with best time to travel for each day and best time to visit in JSON format\n"