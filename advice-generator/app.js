var change = document.querySelector('.advice .change')
if(change){
    change.addEventListener('click',function(e){
        let self = this
        if(!self.classList.contains('searching')){
            self.classList.add('searching')
            let id = document.querySelector('.advice .id')
            let message = document.querySelector('.advice .message')
            let link = "https://api.adviceslip.com/advice"
            
            let http = new XMLHttpRequest
            
            http.onreadystatechange = function(){
                if(http.readyState == 4){
                    self.classList.remove('searching')
                    if(http.status == 200){
                        let advice = JSON.parse(http.response)
                        id.innerText = advice.slip.id
                        message.innerText = advice.slip.advice
                    }
                }
            }
            
            http.open('GET',link,true)
            http.send()
        }
    })
}

window.addEventListener('load',function(e){
    change.click()
})