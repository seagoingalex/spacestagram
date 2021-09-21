import React, { useEffect, useState } from "react";

function Comics  ({ id })  {
    const [comicsArray, setComicsArray] = useState ([]);
    const [isLoaded, setIsLoaded] = useState (false);


    const [sliceNum, setSliceNum] = useState(0)
    const [index, setIndex] = useState(0)

    useEffect(()=>{
    //the fetch for commic series
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/series?apikey=c8d257c5c8de3331d6de741ea71c6a3a`)
    .then((r) => r.json())
    .then((series) => {
        setComicsArray(series.data.results);
        setIsLoaded(true);
    });
    },[id])

    if (!isLoaded) return <h2>Loading...</h2>;



    const handleNextBtn = () => {
        setSliceNum(sliceNum+3)
        setIndex(index +1)

    }

    const handleBackBtn = () => {
        setSliceNum(sliceNum-3)
        setIndex(index -1)
    }

    const comicsOnDisplay = comicsArray.map(comic=>comic.thumbnail.path + "." + comic.thumbnail.extension).slice(sliceNum, sliceNum+3)

    let newArr = [];
    for (let i =0; i<comicsArray.length; i+=3) {
            newArr = [...newArr, comicsArray.slice(i,i+3)]
    }


    return (
        <div className="comic-page">
            { comicsOnDisplay.length === 0 ? 
            null :
            <div>
                <h2 className="comics-h2">The Comic Series this superhero is in:</h2>
                <div className="comics-container"> 
                        
                        {comicsOnDisplay.map(link => <img className="comics-img" src={link} />)}
                    
                </div> 
                { newArr.length === 1 ?
                null :
                <div>
                    {index < newArr.length-1 ? 
                    <button className="next-btn" onClick={()=>{handleNextBtn()}}>Next</button> : null
                    }
                    {index > 0 ? 
                    <button className="back-btn" onClick={()=>{handleBackBtn()}}>Back</button> : null
                    }
                </div>
                }
            </div>
        }
        </div>
    );
}

export default Comics; 