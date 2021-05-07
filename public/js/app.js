

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    const location = search.value
    

    fetch('/weatherData?address='+location
).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        if(data.errorMessage){
            messageOne.textContent = data.errorMessage             
        }  
        else{
        messageOne.textContent = 'The temperature is ' + data.temperature +' degree celsius' + ' but, it feels like ' + data.feelsLike + ' degree celsius'
        messageTwo.textContent = 'The weather is ' + data.weather_descriptions
        messageThree.textContent = 'The Place is ' + data.location
    }
    }
)
    }
)
})

