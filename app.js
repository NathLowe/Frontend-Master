let menu_btn = document.querySelector('.menu .menu-btn')
if(menu_btn){
    let menu = document.querySelector('.menu')
    let timeout = null
    menu_btn.addEventListener('click',function(e){
        let self = this
        if(timeout){
            clearTimeout(timeout)
        }
        if(menu.classList.contains('active')){
            if(!self.classList.contains('go-right')){
                self.classList.add('go-right')
            }
            timeout = setTimeout(function(e){
                self.classList.remove('go-right')
                self.classList.add('arrive-right')
                menu.classList.remove('active')
                setTimeout(function(e){
                    self.classList.remove('arrive-right')
                },400)
            },450)
        }else{
            if(!self.classList.contains('go-right')){
                self.classList.add('go-right')
            }
            timeout = setTimeout(function(e){
                self.classList.remove('go-right')
                self.classList.add('arrive-left')
                menu.classList.add('active')
                setTimeout(function(e){
                    self.classList.remove('arrive-left')
                },400)
            },450)

        }
    })
}

let body = document.querySelector('body')
body.addEventListener('click',function(e){
    if(document.querySelector('header .menu.active')){
        document.querySelector('header .menu.active .menu-btn').click()
    }
})

let menu_links = document.querySelector('header .menu-links')
if(menu_links){
    let links = menu_links.querySelectorAll('.link')
    for (let index = 0; index < links.length; index++) {
        let link = links[index];
        link.addEventListener('click',function(e){
            let container_inner = document.querySelector('.container-inner')
            let self = this
            let new_percent = (parseInt(self.getAttribute('page')) - 1) * 25
            let active = menu_links.querySelector('.link.active')
            active.classList.remove('active')
            self.classList.add('active')
            container_inner.style.transform = "translateX(-"+new_percent+"%)"
        })
    }
    
    var click_links = document.querySelectorAll('.click-link')
    if(click_links.length > 0){
        for (let index = 0; index < click_links.length; index++) {
            let link = click_links[index];
            link.addEventListener('click',function(e){
                let self = this
                let mains = menu_links.querySelectorAll('.link')
                for (let index = 0; index < mains.length; index++) {
                    let main = mains[index];
                    if(main.getAttribute('page') == self.getAttribute('page')){
                        main.click()
                    }
                }
            })
        }
    }
}

var portfolio_cards = document.querySelectorAll('.portfolio-container .portfolio .card')
if(portfolio_cards.length > 0){
    for (let index = 0; index < portfolio_cards.length; index++) {
        let card = portfolio_cards[index];
        card.addEventListener('mouseover',function(e){
            let info = this.querySelector('.info')
            if(info.classList.contains('hide')){
                info.classList.remove('hide')
            }
        })
        card.addEventListener('mouseout',function(e){
            let info = this.querySelector('.info')
            if(!info.classList.contains('hide')){
                info.classList.add('hide')
            }
        })
        card.addEventListener('click',function(e){
            let link = this.querySelector('a')
            link.click()
        })
    }
}

var img_to_backgrounds = document.querySelectorAll('.img-to-background')
if(img_to_backgrounds.length > 0){
    for (let index = 0; index < img_to_backgrounds.length; index++) {
        let element = img_to_backgrounds[index];
        let url = element.src
        element.parentElement.style.background = "url('"+url+"')"
        element.parentElement.style.backgroundPosition = "center"
        element.parentElement.style.backgroundSize = "cover"
    }
}
