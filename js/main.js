import {fetchAmmo} from "./api.js"
import {renderAmmo,showSelectMessage} from "./ui.js"
import {enableDragScroll} from "./dragScroll.js"
import {getTier} from "./tier.js"

import {weaponCategories} from "./data/weaponCategories.js"
import {getCaliberName,normalizeCaliber} from "./data/caliberNames.js"
import {wikiAmmo} from "./data/wikiAmmo.js"


let ammoData=[]
let currentCaliber=null

let sortKey=null
let sortOrder="desc"



function createWeaponTabs(){

const container=document.getElementById("weaponTabs")

container.innerHTML=""

Object.keys(weaponCategories).forEach(cat=>{

const btn=document.createElement("button")

btn.textContent=cat

btn.onclick=()=>{
createCaliberTabs(cat)
showSelectMessage()
}

container.appendChild(btn)

})

}



function createCaliberTabs(category){

const container=document.getElementById("caliberTabs")

container.innerHTML=""

const calibers=weaponCategories[category]

calibers.forEach(c=>{

const btn=document.createElement("button")

btn.textContent=getCaliberName(c)

btn.onclick=()=>{

document
.querySelectorAll("#caliberTabs button")
.forEach(b=>b.classList.remove("tab-active"))

btn.classList.add("tab-active")

currentCaliber=c

updateTable()

}

container.appendChild(btn)

})

}



function updateTable(){

let list=ammoData.filter(a=>

normalizeCaliber(a.caliber)===normalizeCaliber(currentCaliber)

)


if(sortKey==="tier"){

list.sort((a,b)=>a.penetrationPower-b.penetrationPower)

}

if(sortKey==="dmg"){

list.sort((a,b)=>a.damage-b.damage)

}

if(sortKey==="pen"){

list.sort((a,b)=>a.penetrationPower-b.penetrationPower)

}


if(sortOrder==="desc"){

list.reverse()

}

renderAmmo(list)

}



window.setSort=function(key){

if(sortKey===key){

sortOrder = sortOrder==="desc" ? "asc" : "desc"

}else{

sortKey=key

sortOrder="desc"

}

updateSortUI()

const status=document.getElementById("sortStatus")

if(status){

status.innerText=
"SORT: "+key.toUpperCase()+" ("+sortOrder+")"

}

updateTable()

}



function updateSortUI(){

const arrows=document.querySelectorAll(".sort-arrow")

if(!arrows) return

arrows.forEach(el=>{

el.textContent=""

})

if(!sortKey) return

const arrow = sortOrder==="desc" ? "▼" : "▲"

const target=document.querySelector(`[data-sort="${sortKey}"] .sort-arrow`)

if(target){

target.textContent=arrow

}

}



async function init(){

const apiAmmo=await fetchAmmo()

ammoData=[

...apiAmmo,
...wikiAmmo

]

createWeaponTabs()

showSelectMessage()

const weaponWrapper=document.querySelector(".weapon-tabs-wrapper")
const caliberWrapper=document.querySelector(".caliber-tabs-wrapper")

if(weaponWrapper) enableDragScroll(weaponWrapper)
if(caliberWrapper) enableDragScroll(caliberWrapper)

}


init()