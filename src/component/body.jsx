import { useState, useEffect } from 'react'

export default function body (){

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = useState([])
    

      
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data))
    }, [])
    

    function getMemeImage() {
        const memesArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const randomUrl = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: randomUrl
        }))    
    }    

    function handleChange(e){
        const {name, value} = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value

        }))
    }


    return(
        <div>
            <div className="input-div">
                <input 
                type="text" 
                placeholder="Top text"
                name='topText'
                value={meme.topText} 
                onChange={handleChange}
                />

                <input 
                type="text" 
                placeholder="Bottom text" 
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}

                />
            </div>
            <div className="generate-btn">
                <button onClick={getMemeImage}>Get a new Meme Image 🖼 </button>
            </div>
            <div className='random-img-div'>
                <img src={meme.randomImage} alt="" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}