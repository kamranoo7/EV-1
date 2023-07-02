// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const pitchURL = `${baseServerURL}/pitches`;
let mainSection = document.getElementById("data-list-wrapper");

// pitch

document.querySelector("#add-pitch").addEventListener("click",AddPitch)
 async function AddPitch(event){
event.preventDefault()
  let pitchTitleInput = document.getElementById("pitch-title").value
  let pitchImageInput = document.getElementById("pitch-image").value;
  let pitchCategoryInput = document.getElementById("pitch-category").value;
  let pitchfounderInput = document.getElementById("pitch-founder").value;
  let pitchPriceInput = document.getElementById("pitch-price").value;
 
 
  let bag={
     title:pitchTitleInput,
     image:pitchImageInput,
     founder:pitchfounderInput,
     price:pitchPriceInput,
     category:pitchCategoryInput
    
  }

  let res= await fetch(pitchURL,{
    method:"POST",
    body:JSON.stringify(bag),
   
    headers:{
      "Content-Type":"application/json"
    },
   
  })
  let data=res.json()
  console.log(data)
getdata()
}


//Add Pitch

// Update pitch


document.querySelector("#update-pitch").addEventListener("click",UpdatePitch)
  async function UpdatePitch(event){
    event.preventDefault()
  
   let id = document.getElementById("update-pitch-id").value;
 let updatePitchTitleInput = document.getElementById("update-pitch-title").value;
 let updatePitchImageInput = document.getElementById("update-pitch-image").value;
 let updatePitchfounderInput = document.getElementById("update-pitch-founder").value;
 let updatePitchCategoryInput = document.getElementById("update-pitch-category").value;
 let updatePitchPriceInput = document.getElementById("update-pitch-price").value;
 let updatePitchBtn = document.getElementById("update-pitch");
 
   let bag1={
    
      title:updatePitchTitleInput,
      image:updatePitchImageInput,
      founder:updatePitchfounderInput,
      price:updatePitchPriceInput,
      category:updatePitchCategoryInput
    
   }

   let res=await fetch(`${baseServerURL}/pitches/${id}`,{
    method:"PATCH",
    body:JSON.stringify(bag1),
   
    headers:{
      "Content-Type":"application/json"
    },
   
  })
  let data=await res.json()
  console.log(data)
 getdata()
}
// //Update price
 let updatePricePitchId = document.getElementById("update-price-pitch-id");
 let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
 let updatePricePitchPriceButton = document.getElementById("update-price-pitch");
 updatePricePitchPriceButton.addEventListener("click",UpdatePrice)
 async function UpdatePrice(event){
    event.preventDefault()
 let id=updatePricePitchId.value
 let price=updatePricePitchPrice.value

 let bag2={
price
 }
 let res= await fetch(`${baseServerURL}/pitches/${id}`,{
   method:"PATCH",
   body:JSON.stringify(bag2),
 
   headers:{
     "Content-Type":"application/json"
   },
 
 })

 let data2= await res.json()
 console.log(data2)
 getdata()
 }


 //sort and filter
 let sortAtoZBtn = document.getElementById("sort-low-to-high");
 let sortZtoABtn = document.getElementById("sort-high-to-low");
 let filterFood = document.getElementById("filter-Food");
 let filterElectronics = document.getElementById("filter-Electronics");
 let filterPersonalCare = document.getElementById("filter-Personal-Care");
 sortAtoZBtn.addEventListener("click",sort1)
 async function sort1(){
  let res= await fetch(pitchURL)
  let data =await res.json()
  
    data.sort((a,b)=>{
      return a.price-b.price
    })
  
  append(data)
 }
 sortZtoABtn.addEventListener("click",sort2)
 async function sort2(){
  let res= await fetch(pitchURL)
  let data =await res.json()
  
    data.sort((a,b)=>{
      return b.price-a.price
    })
  
  append(data)
 }
 //Search by title/founder
 filterElectronics.addEventListener("click",Electronic)
async function Electronic(){
  let res= await fetch(pitchURL)
  let data =await res.json()
  let x=data.filter((el)=>{
   return  el.category==="Electronics"
  })
  append(x)
}
filterPersonalCare.addEventListener("click",PC)
async function PC(){
  let res= await fetch(pitchURL)
  let data =await res.json()
  let x=data.filter((el)=>{
   return  el.category==="Personal Care"
  })
  append(x)
}
filterFood.addEventListener("click",Food1)
async function Food1(){
  let res= await fetch(pitchURL)
  let data =await res.json()
  let x=data.filter((el)=>{
   return  el.category==="Food"
  })
  
  append(x)
}
//  let searchBySelect = document.getElementById("search-by-select");
//  let searchByInput = document.getElementById("search-by-input");
//  let searchByButton = document.getElementById("search-by-button");
//map data
let getdata=async()=>{
  let res=await fetch(pitchURL)
  let data=await res.json()
  append(data)
}
getdata()

function append(data){
mainSection.innerHTML=""
data.forEach((el,index)=>{
  let div1=document.createElement("div")
  div1.setAttribute("class" ,"card-list")
  div1.setAttribute("data-id",el.id)
let div2=document.createElement("div")
div2.setAttribute("class","card")
let div3=document.createElement("div")
div3.setAttribute("class","card-img")
let img1=document.createElement("img")
img1.setAttribute("src",el.image)
let div4=document.createElement("div")
div4.setAttribute("class","card-body")
let h=document.createElement("h4")
h.innerText=el.title
h.setAttribute("class","card-title")
let p=document.createElement("p")
p.innerText=`Founder : ${el.founder}`
p.setAttribute("class","card-founder")
let p2=document.createElement("p")
p2.innerText=el.category
p2.setAttribute('class',"card-category")
let p1=document.createElement("p")
p1.innerText=el.price
p1.setAttribute('class',"card-price")
let a=document.createElement("a")
a.setAttribute("class","card-link")
a.setAttribute("href","#")
a.setAttribute("data-id",el.id)
a.innerText="Edit"
let btn=document.createElement("button")
btn.innerText="DELETE"
btn.addEventListener("click",function(){
  delete1(index)
})
btn.setAttribute("class","card-button")
btn.setAttribute("data-id",el.id)
div3.append(img1)
div4.append(h,p,p1,p2,btn,a)
div2.append(div3,div4)

div1.append(div2)
mainSection.append(div1)

})
}
//Delete
 async function delete1(index){
  let id=index+1
console.log(id)
  let res=await fetch(`${baseServerURL}/pitches/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })
  let data=await res.json()
  console.log(data)
  getdata()
 }