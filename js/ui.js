import { getTier } from "./tier.js"

/* ========================= */
/* TIER CLASS */
/* ========================= */

function getTierClass(tier){
  return "tier-" + tier
}


/* ========================= */
/* SOURCE FORMAT */
/* ========================= */

function formatSource(ammo){

  return {
    trader: ammo.trader ?? "-",
    loot: ammo.loot ? "〇" : "×",
    craft: ammo.craft ? "〇" : "×",
    flea: ammo.flea ? "〇" : "×"
  }

}


/* ========================= */
/* RENDER */
/* ========================= */

export function renderAmmo(list){

  const tbody = document.getElementById("ammoBody")
  tbody.innerHTML = ""

  list.forEach(a => {

    const tier = getTier(a.penetrationPower)
    const source = formatSource(a)

    const tr = document.createElement("tr")

    tr.innerHTML = `

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

<!-- 取得経路 -->
<td>${source.trader}</td>
<td>${source.loot}</td>
<td>${source.craft}</td>
<td>${source.flea}</td>

`

    tbody.appendChild(tr)

  })

}


/* ========================= */
/* INITIAL MESSAGE */
/* ========================= */

export function showSelectMessage(){

  const tbody = document.getElementById("ammoBody")

  tbody.innerHTML = `
<tr>
<td colspan="9" style="text-align:center;padding:20px;color:#888;">
Select caliber
</td>
</tr>
`

}