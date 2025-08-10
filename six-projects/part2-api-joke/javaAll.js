
fetch('https://icanhazdadjoke.com/' ,{headers:{'Accept' : 'application/json'}})
.then(response => response.json()).then(data => {
    document.getElementById('p').innerText = data['joke']
})
function clickNext()
{
fetch('https://icanhazdadjoke.com/' ,{headers:{'Accept' : 'application/json'}})
.then(response => response.json()).then(data => {

    document.getElementById('p').innerText = data['joke']
})
}
