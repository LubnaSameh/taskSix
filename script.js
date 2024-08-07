let form = document.getElementById("form1")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset() // reset data in search
})

const errorf = document.getElementById('error')
const locationf = document.getElementById('location')
const forecastf = document.getElementById('forecast')

// async => function  return promise
let weatherFunction = async () => { // use or fetch api

    try { // await => step next step
        const adress = document.getElementById('adress').value
        const res = await fetch('http://localhost:3000/weathers?adress=' + adress)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorf.innerText = data.error
            locationf.innerText = "" // reset all data, for begin from new
            forecastf.innerText = ""
        } else {
            locationf.innerText = data.location
            forecastf.innerText = data.forecast
             errorf.innerText = ""
        }


    } catch (e) {
        console.log(e)

    }
}

