import React from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export function FavouritePage() {
    const { favourites } = useAppSelector(state => state.github)
    console.log(favourites);
    const {removeFavourite} = useActions()
    const removeFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // removeFavourite(repo.html_url)
    }
    if(favourites.length === 0 ) return <p className="text-center">No items. </p>
    return (
        <div  className="flex justify-center pt-10 mx-auto w-screen ">
        <ul>
            {favourites.map(f =>
                <li key={f}>
                    <a href={f} target='blank'>{f}</a> 
                </li> 
                )}  
            </ul>
            </div>
        
    )
}




