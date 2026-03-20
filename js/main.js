import { fetchAmmo } from "./api.js"
import { renderAmmo, showSelectMessage } from "./ui.js"
import { enableDragScroll } from "./dragScroll.js"

import { weaponCategories } from "./data/weaponCategories.js"
import { getCaliberName, normalizeCaliber } from "./data/caliberNames.js"
import { wikiAmmo } from "./data/wikiAmmo.js"


/* ========================= */
/* STATE */
/* ========================= */

let ammoData = []
let currentCaliber = null

let sortKey = "tier"
let sortOrder = "desc"


/* ========================= */
/* WEAPON TABS */
/* ========================= */

function createWeaponTabs(){

  const container = document.getElementById("weaponTabs")
  container.innerHTML = ""

  Object.keys(weaponCategories).forEach(category => {

    const btn = document.createElement("button")
    btn.textContent = category

    btn.onclick = () => {
      createCaliberTabs(category)
      showSelectMessage()
    }

    container.appendChild(btn)

  })

}


/* ========================= */
/* CALIBER TABS */
/* ========================= */

function createCaliberTabs(category){

  const container = document.getElementById("caliberTabs")
  container.innerHTML = ""

  const calibers = weaponCategories[category]

  calibers.forEach(caliber => {

    const btn = document.createElement("button")
    btn.textContent = getCaliberName(caliber)

    btn.onclick = () => {

      // active UI
      document
        .querySelectorAll("#caliberTabs button")
        .forEach(b => b.classList.remove("tab-active"))

      btn.classList.add("tab-active")

      // state更新
      currentCaliber = caliber

      // ★ 常にTierソートに戻す
      sortKey = "tier"
      sortOrder = "desc"

      updateSortUI()
      updateTable()

    }

    container.appendChild(btn)

  })

}


/* ========================= */
/* TABLE UPDATE */
/* ========================= */

function updateTable(){

  if(!currentCaliber) return

  let list = ammoData.filter(a =>
    normalizeCaliber(a.caliber) === normalizeCaliber(currentCaliber)
  )

  // ソート処理
  switch(sortKey){

    case "tier":
      list.sort((a,b)=>a.penetrationPower - b.penetrationPower)
      break

    case "dmg":
      list.sort((a,b)=>a.damage - b.damage)
      break

    case "pen":
      list.sort((a,b)=>a.penetrationPower - b.penetrationPower)
      break

  }

  if(sortOrder === "desc"){
    list.reverse()
  }

  renderAmmo(list)

}


/* ========================= */
/* SORT CONTROL */
/* ========================= */

window.setSort = function(key){

  if(sortKey === key){
    sortOrder = sortOrder === "desc" ? "asc" : "desc"
  }else{
    sortKey = key
    sortOrder = "desc"
  }

  updateSortUI()

  const status = document.getElementById("sortStatus")
  if(status){
    status.innerText = `SORT: ${key.toUpperCase()} (${sortOrder})`
  }

  updateTable()

}


/* ========================= */
/* SORT UI */
/* ========================= */

function updateSortUI(){

  const headers = document.querySelectorAll("th[data-sort]")

  headers.forEach(th => {

    const arrow = th.querySelector(".sort-arrow")
    if(!arrow) return

    const key = th.dataset.sort

    if(key === sortKey){

      arrow.textContent = sortOrder === "desc" ? "▼" : "▲"
      arrow.style.opacity = "1"
      arrow.style.color = "#c8a65a"

      th.classList.add("active-sort")

    }else{

      arrow.textContent = "▽"
      arrow.style.opacity = "0.4"
      arrow.style.color = "#888"

      th.classList.remove("active-sort")

    }

  })

}


/* ========================= */
/* INIT */
/* ========================= */

async function init(){

  const apiAmmo = await fetchAmmo()

  ammoData = [
    ...apiAmmo,
    ...wikiAmmo
  ]

  createWeaponTabs()
  showSelectMessage()
  updateSortUI()

  // スクロール対応
  const weaponWrapper = document.querySelector(".weapon-tabs-wrapper")
  const caliberWrapper = document.querySelector(".caliber-tabs-wrapper")

  if(weaponWrapper) enableDragScroll(weaponWrapper)
  if(caliberWrapper) enableDragScroll(caliberWrapper)

}


init()