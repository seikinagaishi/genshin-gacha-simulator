// Log Values
var blueAmount   = 0
var purpleAmount = 0
var orangeAmount = 0
var count        = 0

var wishCount   = document.querySelector('#count')
var wishOrange  = document.querySelector('#five-star')
var wishPurple  = document.querySelector('#four-star')
var wishBlue    = document.querySelector('#three-star')
var wishPity    = document.querySelector('#pity')
var wish10      = document.querySelector('#four-starOrBetter')
var wishFifty   = document.querySelector('#notGuaranteed')

// Const Values
const chanceOfGettingA5Star = 0.6
const chanceOfGettingA4Star = 5.1
const maxPullsForPity       = 89
const maxPullsFor4Star      = 9

// Selectors
let pull1         = document.querySelector('#pull1')
let pull10        = document.querySelector('#pull10')
let characterPoll = document.querySelector('#poll')
var pullArea      = document.querySelector('#pull')

// Rewards
var blues = [
    'Black Tassel',
    'Bloodtainted Greatsword',
    'Cool Steel',
    'Debate Club',
    'Emerald Orb',
    'Ferrous Shadow',
    'Harbinger of Dawn',
    'Magic Guide',
    'Raven Bow',
    "Sharpshooter's Oath",
    'Skyrider Sword',
    'Slingshot',
    'Thrilling Tales of Dragon Slayers'
]

var purples = [
    // Reward,      Rate-up
    ['Barbara',     false],
    ['Beidou',      false],
    ['Bennett',      false],
    ['Chongyun',    false],
    ['Diona',       false],
    ['Fischl',      false],
    ['Ningguang',   false],
    ['Noelle',       true],
    ['Razor',        true],
    ['Sucrose',      true],
    ['Xiangling',   false],
    ['Xingqiu',     false],
    ['Xinyan',      false],

    ["Dragon's Bane",           false],
    ['Eye of Perception',       false],
    ['Favonius Codex',          false],
    ['Favonius Lance',          false],
    ['Favonius Sword',          false],
    ['Favonius Warbow',         false],
    ["Lion's Roar",             false],
    ['Rainslasher',             false],
    ['Rust',                    false],
    ['Sacrificial Bow',         false],
    ['Sacrificial Greatsword',  false],
    ['Sacrificial Fragments',   false],
    ['Sacrificial Sword',       false],
    ['The Bell',                false],
    ['The Flute',               false],
    ['The Stringless',          false],
    ['The Widsith',             false]
]

var oranges = [
    // Reward,   Rate-up
    ['Diluc',    false],
    ['Jean',     false],
    ['Keqing',   false],
    ['Mona',     false],
    ['Qiqi',     false],
    ['Featured',  true]
]

// Pity
var pity = 0
var guaranteed4star = 0
var fiftyFifty5Star = true
var fiftyFifty4Star = true

pull1.addEventListener('click', singlePull)

function singlePull() {
    let [item, type] = wish()
    animate(item, type)
    refresh()
}

// Animation

function animate(item, type) {
    pullArea.innerHTML = ''

    // Item name
    let h1Element = document.createElement('h1')
    h1Element.innerText = item

    // Shooting Star Trail
    let trailElement = document.createElement('div')
    trailElement.id = 'trail'
    trailElement.style.animationName = type

    // Shooting Star
    let starElement = document.createElement('img')
    starElement.alt = 'Shooting Star'
    starElement.title = 'Shooting Star'
    starElement.id = 'star'
    starElement.src = 'star.png'
    
    // Print Item
    let itemAreaElement = document.createElement('div')
    itemAreaElement.setAttribute('class', 'item-area')

    let name = item.replaceAll(' ', '-').toLowerCase()

    let itemElement = document.createElement('img')
    itemElement.setAttribute('class', 'item')
    itemElement.src = 'item/' + name + '.png'
    itemAreaElement.appendChild(itemElement)

    // Trail Childs
    trailElement.appendChild(starElement)
    trailElement.appendChild(itemAreaElement)

    // Pull Area Childs
    pullArea.appendChild(h1Element)
    pullArea.appendChild(trailElement)
}

// Log Refresh
function refresh() {
    wishCount.innerText = count
    wishOrange.innerText = orangeAmount
    wishPurple.innerText = purpleAmount
    wishBlue.innerText = blueAmount
    wishPity.innerText = pity
    wish10.innerText = guaranteed4star
    fiftyFifty5Star ? wishFifty.innerText = 'ON' : wishFifty.innerText = 'OFF'
}

// Wish System
function wish() {
    // log
    count++
    // 

    let reward

    // 5 star - pity system reached - reset all pity system
    if(pity == maxPullsForPity) {
        pity = 0
        guaranteed4star = 0
        reward = 'orange'  
        
        // log
        orangeAmount++
    } 

    // 4 star - guaranteed reached - reset guaranteed 4 star
    else if(guaranteed4star == maxPullsFor4Star) {
        reward = 'purple'

        //log
        purpleAmount++
        guaranteed4star = 0
        pity++
    }

    // random reward based on RNG
    else {
        reward = randomizedReward()

        // log
        blueAmount++
    }

    return randomCharacter(reward)
}

function randomizedReward() {
    let rng = Math.random() * 100
    
    // 5 star - reset all pity system
    if(rng <= chanceOfGettingA5Star) {
        // log
        pity = 0
        guaranteed4star = 0
        orangeAmount++
        //

        return 'orange'
    }

    // 4 star - reset guaranteed 4 star
    else if(rng <= chanceOfGettingA4Star) {
        //log
        guaranteed4star = 0
        pity++
        purpleAmount++
        //

        return 'purple'
    }
    
    // 3 star
    else {
        pity++
        guaranteed4star++

        return 'blue'
    }
}

function randomCharacter(type) {
    let poll
    let notBlue = true

    switch(type) {
        case 'orange':
            poll = [...oranges]
            break
        case 'purple':
            poll = [...purples]
            break
        case 'blue':
            notBlue = false
            poll = [...blues]
            break
    }

    let possibilities = poll.length - 1
    let rng = Math.round( Math.random() * possibilities )

    if(notBlue) {
        return [rateUpRNG(poll, type), type]
    } 
    else {
        return [poll[rng], type]
    }
}

function rateUpRNG(poll, type) {
    let rng = Math.random() * 100
    let rateUP = false
    let fiftyFifty

    // 50% chance to get rated up characters
    if(rng <= 50) {
        rateUP = true
    }


    // There's 50% chance to get the rated up characters but after you don't get it the next drop will be guaranteed to be the featured characters
    if (type == 'orange') {
        fiftyFifty = fiftyFifty5Star
    }
    else {
        fiftyFifty = fiftyFifty4Star
    }

    if(fiftyFifty) {
        if(!rateUP) {
            fiftyFifty = false
        }
    } 

    else {
        fiftyFifty = true
        rateUP = true
    }

    if (type == 'orange') {
        fiftyFifty5Star = fiftyFifty
    }
    else {
        fiftyFifty4Star = fiftyFifty
    }


    // Remove from the poll depending on the 50/50 result
    let index = 0
    while(index < poll.length) {
        if(poll[index][1] != rateUP) {
            poll.splice(index, 1)
            index--
        }
        index++
    }

    let possibilities = poll.length - 1
    rng = Math.round( Math.random() * possibilities )

    return poll[rng][0]
}