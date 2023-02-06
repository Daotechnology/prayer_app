const prayer = document.getElementById("prayer");
const add = document.querySelector(".add");
const token = document.querySelector(".token");
const prayer_btn = document.getElementById("btn");
let dynamic = document.querySelector(".dynamic_scripture");
const type = document.querySelector(".type");


let arr = [];

// add.addEventListener("click",(e)=>{
//     e.preventDefault();
//     let html = "";
//     let uuid = Math.floor(Math.random() * 100000045677654);

//     const data = {
//         id:uuid,
//         prayers:prayer.value,
//     }
//     arr.push(data);
//     console.log(arr);

//     for (const value of arr) {
//         html +=` <button ty-pe="button" class="btn btn-primary mt-1 mb-1 text-start">
//         ${value.prayers.substr(0,10)} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
//         dynamic.innerHTML = html;
//     }
//     dels();
// })


// function dels() {
//     document.querySelectorAll(".del").forEach(del=>{
//         del.addEventListener("click",function(e){
//             const id = e.target.id;
//             console.log(id);
//             arr = arr.filter(val=>{
//                 return val.id != id;
//             });   
//             let html = "";
//             for (const value of arr) {
//                 html +=` <button type="button" class="btn btn-primary mt-1 mb-1 text-start">
//                 ${value.prayers.substr(0,10)} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
//                 dynamic.innerHTML = html;
//             } 
//             dels();
//         })
//     })
    
      
// }

prayer_btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    try {
        const data = {
            prayers:prayer.value,
            type:type.innerHTML,
        }
    
        const validate = await axios.post('/api/v1/create/midday/opening_prayer', data, {
            headers:{Authorization:`Bearer ${token.innerHTML}`}
        });

        if (validate.data.error !== false) {
            throw new Error(validate.data.errorMsg);
        }

        return alert(validate.data.statusText);
    } catch(e) {
        alert(e.message);
    }
})