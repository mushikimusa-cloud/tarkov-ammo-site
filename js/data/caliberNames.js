// ===============================
// Canonical Caliber → Display Name
// ===============================

const caliberDisplay = {

Caliber556x45NATO:"5.56x45",
Caliber545x39:"5.45x39",
Caliber762x39:"7.62x39",
Caliber762x51:"7.62x51",
Caliber762x54R:"7.62x54R",

Caliber9x19PARA:"9x19",
Caliber9x21:"9x21",

Caliber1143x23ACP:"45 ACP",

Caliber127x33:".50 AE",

Caliber86x70:".338 Lapua",

Caliber366TKM:".366 TKM",

Caliber57x28:"5.7x28",

Caliber46x30:"4.6x30",

Caliber9x39:"9x39",

Caliber300BLK:".300 BLK",

Caliber12g:"12 Gauge",
Caliber20g:"20 Gauge"

}



// ===============================
// Alias → Canonical
// (API / Wiki 表記の違い吸収)
// ===============================

const caliberAlias = {

Caliber45ACP:"Caliber1143x23ACP",

Caliber50AE:"Caliber127x33",

Caliber338LM:"Caliber86x70"

}



// ===============================
// Normalize Caliber
// ===============================

export function normalizeCaliber(cal){

if(!cal) return ""

if(caliberAlias[cal]){

return caliberAlias[cal]

}

return cal

}



// ===============================
// Get UI Display Name
// ===============================

export function getCaliberName(cal){

const normalized = normalizeCaliber(cal)

return caliberDisplay[normalized] ?? normalized

}