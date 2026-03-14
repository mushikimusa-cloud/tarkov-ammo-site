import {getTier} from "./tier.js"

function getTierClass(tier){
return "tier-"+tier
}

export function renderAmmo(list){

const tbody=document.getElementById("ammoBody")

tbody.innerHTML=""

list.forEach(a=>{

const tier=getTier(a.penetrationPower)

const tr=document.createElement("tr")

tr.innerHTML=`

<td>
<div class="tier-box ${getTierClass(tier)}">
${tier}
</div>
</td>

<td>
<img src="${a.iconLink}" width="32">
</td>

<td>${a.name}</td>

<td>${a.damage}</td>

<td>${a.penetrationPower}</td>

`

tbody.appendChild(tr)

})

}

export function showSelectMessage(){

const tbody=document.getElementById("ammoBody")

tbody.innerHTML=`
<tr>
<td colspan="5" style="text-align:center;padding:20px;color:#888;">
Select caliber
</td>
</tr>
`

}