var COMBINAISONS = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var ALL_PLAYER = ['cross','circle']
var PLAYER_COLOR = ['primary','secondary']
var PLAYER_PERSON = []
var ACTUAL_PLAYER = 'cross'
var HISTORICS = [
    {class:'cross-win',number:0},
    {class:'ties-win',number:0},
    {class:'circle-win',number:0}
]
var CARD_SELECTED = [
    {player:ALL_PLAYER[0],selected:[]},
    {player:ALL_PLAYER[1],selected:[]}
]
var NUMBER_CARDS_SELECTED = 0
var CPU_PLAY = false
var BLOCK_PLAY = false
var CPU_DELAY = 1000




function initialiseGame(quit = false) {
    // Initialise cards
    let cards = document.querySelectorAll('.game-container .card')
    for (let index = 0; index < cards.length; index++) {
        let card = cards[index];
        if(card.classList.contains('active')){
            for (let index = 0; index < ALL_PLAYER.length; index++) {
                let element = ALL_PLAYER[index];
                if(card.querySelector('.icon').classList.contains(element)){
                    card.querySelector('.icon').classList.remove(element)
                }
            }
            for (let index = 0; index < PLAYER_COLOR.length; index++) {
                let element = PLAYER_COLOR[index];
                if(card.classList.contains(element)){
                    card.classList.remove(element)
                }
            }
            if(card.classList.contains('validate')){
                card.classList.remove('validate')
            }
            card.classList.remove('active')
        }
    }

    // Initialise number of cards selected
    NUMBER_CARDS_SELECTED = 0

    // Initialise Super Global Card values
    CARD_SELECTED = [
        {player:ALL_PLAYER[0],selected:[]},
        {player:ALL_PLAYER[1],selected:[]}
    ]

    // Initialise turn
    ACTUAL_PLAYER = ALL_PLAYER[0]
    let turn_icon = document.querySelector('.turn-container .player')
    for (let index = 0; index < ALL_PLAYER.length; index++) {
        let element = ALL_PLAYER[index];
        if(turn_icon.classList.contains(element)){
            turn_icon.classList.remove(element)
        }
    }
    turn_icon.classList.add(ALL_PLAYER[0])
    
    // Initialise Winner state
    let winner = document.querySelector('.modal-container .finish-message .winner')
    if(winner){
        for (let index = 0; index < ALL_PLAYER.length; index++) {
            let element = ALL_PLAYER[index];
            if(winner.querySelector('.icon').classList.contains(element)){
                winner.querySelector('.icon').classList.remove(element)
            }
        }
        for (let index = 0; index < PLAYER_COLOR.length; index++) {
            let element = PLAYER_COLOR[index];
            if(winner.classList.contains(element)){
                winner.classList.remove(element)
            }
        }
        if(winner.classList.contains('hide')){
            winner.classList.remove('hide')
        }
    }
    BLOCK_PLAY = false

    if(PLAYER_PERSON[0]=='cpu'){
        BLOCK_PLAY = true
        window.setTimeout(cpuPlay,1000)
    }

    if(quit){
        // Initialise Persons / Opponent
        PLAYER_PERSON = []
        
        // Initialise the page-template
        let pages = document.querySelectorAll('.page-template')
        for (let index = 0; index < pages.length; index++) {
            let page = pages[index];
            if(!page.classList.contains('hide') && !page.classList.contains('starting-page')){
                page.classList.add('hide')
            }
            if(page.classList.contains('hide') && page.classList.contains('starting-page')){
                page.classList.remove('hide')
            }
        }

        // Initialise Historics
        HISTORICS = [
            {class:'cross-win',number:0},
            {class:'ties-win',number:0},
            {class:'circle-win',number:0}
        ]
        for (let index = 0; index < HISTORICS.length; index++) {
            let element = HISTORICS[index];
            document.querySelector('.historic-container .wins.'+element.class+" .number").innerHTML = 0
        }

        // Initialise CPU_PLAY
        CPU_PLAY = false
    }
}

window.addEventListener('load',initialiseGame)

// Select the player
let player_selections = document.querySelectorAll('.selection-container .selection .element')
for (let index = 0; index < player_selections.length; index++) {
    let element = player_selections[index];
    element.addEventListener('click',function() {
        if(!this.classList.contains('selected')){
            if(document.querySelector('.selection-container .selection .element.selected')){
                document.querySelector('.selection-container .selection .element.selected').classList.remove('selected')
            }
            this.classList.add('selected')
        }
    })
}

// Select Opponent
let opponent_selections = document.querySelectorAll('.starting-page .opponent')
for (let index = 0; index < opponent_selections.length; index++) {
    let element = opponent_selections[index];
    element.addEventListener('click',function() {
        let selected = document.querySelector('.selection-container .selection .element.selected')
        let player = selected.querySelector('.player').getAttribute('player')
        let index = ALL_PLAYER.indexOf(player)
        PLAYER_PERSON[index] = 'You'
        let opponent_index = index == 0 ? 1 : 0
        let opponent = this.getAttribute('opponent')
        PLAYER_PERSON[opponent_index] = opponent
        if(opponent == 'cpu'){
            CPU_PLAY = true
        }

        document.querySelector('.historic-container .wins.cross-win .person').innerHTML = PLAYER_PERSON[0]
        document.querySelector('.historic-container .wins.circle-win .person').innerHTML = PLAYER_PERSON[1]
        // Function pour que l'ordinateur joue seul

        // Change page
        let starting_page = document.querySelector('.page-template.starting-page')
        let game_page = document.querySelector('.page-template.game-page')
        if(game_page.classList.contains('hide')){
            starting_page.classList.add('hiding')
            game_page.classList.remove('hide')
            setTimeout(function() {
                starting_page.classList.remove('hiding')
                starting_page.classList.add('hide')
                initialiseGame()
            },300)
        }
    })
}

// Hiding Modal
function hideModal() {
    let container = document.querySelector('.modal-container')
    if(!container.classList.contains('hide')){
        let message_templates = container.querySelectorAll('.message-template')
        for (let index = 0; index < message_templates.length; index++) {
            let element = message_templates[index];
            if(!element.classList.contains('hide')){
                element.classList.add('hide')
            }
        }
        container.classList.add('hiding')
        setTimeout(function() {
            container.classList.remove('hiding')
            container.classList.add('hide')            
        },300)
    }
}

function showModal(message) {
    let container = document.querySelector('.modal-container')
    if(container.classList.contains('hide')){
        container.classList.remove('hide')
        let div_to_show = container.querySelector('.'+message)
        if(div_to_show && div_to_show.classList.contains('hide')){
            div_to_show.classList.remove('hide')
        }
    }
}

// Modal - Restart
let restart_btns = document.querySelectorAll('.modal-container .restart-message .btn')
for (let index = 0; index < restart_btns.length; index++) {
    let element = restart_btns[index];
    element.addEventListener('click',function() {
        hideModal()
        if(this.classList.contains('restart')){
            initialiseGame(true)
        }
    })
}

// Modal - Finish
let finish_btns = document.querySelectorAll('.modal-container .finish-message .btn')
for (let index = 0; index < finish_btns.length; index++) {
    let element = finish_btns[index];
    element.addEventListener('click',function() {
        // Plutot mettre un message pour quit
        hideModal()
        if(this.classList.contains('quit')){
            initialiseGame(true)
        }else{
            initialiseGame()
        }
    })
}

// Restart button
let restart_btn = document.querySelector('.game-page .header .restart')
if(restart_btn){
    restart_btn.addEventListener('click',function() {
        showModal('restart-message')
    })
}

function shuffleArray(array) {
    let new_array = [...array]
    let currentIndex = new_array.length, randomIndex;
    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [new_array[currentIndex],new_array[randomIndex]] = [new_array[randomIndex],new_array[currentIndex]]
    }
    return new_array;
}


// Function CPU plays
function cpuPlay() {
    let cpu_index = PLAYER_PERSON.indexOf('cpu') != -1 ? PLAYER_PERSON.indexOf('cpu') : 1
    let player = cpu_index == 0 ? ALL_PLAYER[1] : ALL_PLAYER[0]
    let all_players_selected = []
    let all_cpu_selected = []
    for (let index = 0; index < CARD_SELECTED.length; index++) {
        let element = CARD_SELECTED[index];
        if(element.player == player){
            all_players_selected = element.selected
        }else{
            all_cpu_selected = element.selected
        }
    }
    let all_cards = document.querySelectorAll('.game-container .card')
    let possible_move_by_rate = [[],[],[]]
    for (let index = 0; index < COMBINAISONS.length; index++) {
        let combinaison = COMBINAISONS[index];
        let present = 0
        for (let g = 0; g < all_players_selected.length; g++) {
            let element = all_players_selected[g];
            if(combinaison.indexOf(element) != -1){
                present++
            }
        }
        for (let g = 0; g < combinaison.length; g++) {
            let element = combinaison[g];
            if(all_players_selected.indexOf(element) == -1 && possible_move_by_rate[present].indexOf(element) == -1){
                possible_move_by_rate[present].push(element)
            }
        }
    }
    if(BLOCK_PLAY){
        for (let index = 0; index < possible_move_by_rate.length; index++) {
            let element = possible_move_by_rate[index];
            if(element.length == 0){
                possible_move_by_rate.splice(index,1)
            }
        }
        BLOCK_PLAY = false
        let index_to_click = 0
        let continu = true
        let possible_index = possible_move_by_rate.length - 1
        let element
        while(continu == true){
            let new_array = [...possible_move_by_rate[possible_index]]
            let shuffles = shuffleArray(new_array)
            if(!shuffles){
                continu = false
            }else{
                for (let index = 0; index < shuffles.length; index++) {
                    if(continu){
                        let element = shuffles[index];
                        if(all_cpu_selected.indexOf(element) != - 1){
                            if(shuffles[index_to_click+1]){
                                index_to_click++
                            }
                        }else{
                            continu = false
                        }
                    }
                }
            }
            possible_index--
            if(continu){
                index_to_click = 0
            }else{
                element = all_cards[shuffles[index_to_click] - 1]
            }
        }
        element.click()
    }
}

// Selecting a card
let all_cards = document.querySelectorAll('.game-container .card')
for (let index = 0; index < all_cards.length; index++) {
    let element = all_cards[index];
    element.addEventListener('click',function() {
        if(!this.classList.contains('active') && !BLOCK_PLAY){
            this.classList.add('active')
            NUMBER_CARDS_SELECTED = NUMBER_CARDS_SELECTED + 1
            let index = ALL_PLAYER.indexOf(ACTUAL_PLAYER)
            let next_index = index == 0 ? 1 : 0
            let color = PLAYER_COLOR[index]
            let person = PLAYER_PERSON[index]
            let number = parseInt(this.getAttribute('number'))

            this.classList.add(color)
            this.querySelector('.icon').classList.add(ACTUAL_PLAYER)
            

            let all_selected
            for (let index = 0; index < CARD_SELECTED.length; index++) {
                let element = CARD_SELECTED[index];
                if(element.player == ACTUAL_PLAYER){
                    element.selected.push(number)
                    all_selected = [...element.selected]
                }
            }

            let win = false
            if(all_selected.length >= 3){
                let winning_combinaison
                for (let index = 0; index < COMBINAISONS.length; index++) {
                    if(!win){
                        let combinaison = COMBINAISONS[index];
                        let valid = []
                        for (let h = 0; h < all_selected.length; h++) {
                            let element = all_selected[h];
                            if(combinaison.indexOf(element) == -1){
                                valid.push(false)
                            }else{
                                valid.push(true)
                            }
                        }
                        let true_values = 0
                        for (let f = 0; f < valid.length; f++) {
                            let element = valid[f];
                            if(element == true){
                                true_values = true_values + 1
                            }
                        }
                        if(true_values == 3){
                            win = true
                            winning_combinaison = combinaison
                        }
                    }
                }
                if(win){
                    for (let index = 0; index < winning_combinaison.length; index++) {
                        let i = winning_combinaison[index] - 1;
                        all_cards[i].classList.add('validate')
                    }
                    setTimeout(function() {
                        showModal('finish-message')                        
                    },1000)
                    let state = document.querySelector('.modal-container .finish-message .state')
                    let winner = document.querySelector('.modal-container .finish-message .winner')
                    
                    state.innerHTML = person + " won !"
                    winner.classList.add(color)
                    winner.querySelector('.icon').classList.add(ACTUAL_PLAYER)

                    let new_number
                    let win_class = ACTUAL_PLAYER+"-win"
                    for (let index = 0; index < HISTORICS.length; index++) {
                        let element = HISTORICS[index];
                        if(element.class == win_class){
                            new_number = element.number+1
                            element.number = element.number+1
                        }
                    }

                    document.querySelector('.historic-container .wins.'+win_class+" .number").innerHTML = new_number
                }
            }

            // Verify if all cards already selected
            if(!win){
                if(NUMBER_CARDS_SELECTED == 9){
                    showModal('finish-message')
                    let state = document.querySelector('.modal-container .finish-message .state')
                    let winner = document.querySelector('.modal-container .finish-message .winner')
                    
                    winner.classList.add('hide')
                    state.innerHTML = "Draw game"

                    let new_number
                    let win_class = "ties-win"
                    for (let index = 0; index < HISTORICS.length; index++) {
                        let element = HISTORICS[index];
                        if(element.class == win_class){
                            new_number = element.number+1
                            element.number = element.number+1
                        }
                    }

                    document.querySelector('.historic-container .wins.ties-win .number').innerHTML = new_number
                }else{
                    let turn = document.querySelector('.turn-container .player')
                    for (let index = 0; index < ALL_PLAYER.length; index++) {
                        let element = ALL_PLAYER[index];
                        if(turn.classList.contains(element)){
                            turn.classList.remove(element)
                        }
                    }

                    turn.classList.add(ALL_PLAYER[next_index])
                    ACTUAL_PLAYER = ALL_PLAYER[next_index]

                    if(CPU_PLAY && PLAYER_PERSON[next_index] == 'cpu'){
                        BLOCK_PLAY = true
                        setTimeout(function() {
                            cpuPlay()
                        },CPU_DELAY)
                    }
                }
            }

        }
    })
}