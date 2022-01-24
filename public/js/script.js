const weatherForm = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const inputLocation = weatherForm.weatherLocation.value
    message1.textContent = 'Loading......'
    message2.textContent = ' '

    fetch(`http://localhost:3000/weather?address=${inputLocation}`).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            message1.textContent = data.error
        } else{
            message1.textContent = `Location: ${data.location}`
            message2.textContent = `The temperature today is ${data.forecast} degrees Celcius`
        }
        
    })
})
e.target.reset()
})