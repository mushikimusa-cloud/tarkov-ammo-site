
const API_URL="https://api.tarkov.dev/graphql"

export async function fetchAmmo(){

const query=`
{
ammo{
caliber
damage
penetrationPower
item{
name
iconLink
}
}
}
`

const res=await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({query})
})

const json=await res.json()

return json.data.ammo.map(a=>({
name:a.item?.name ?? "",
iconLink:a.item?.iconLink ?? "",
caliber:a.caliber,
damage:a.damage,
penetrationPower:a.penetrationPower
}))

}
