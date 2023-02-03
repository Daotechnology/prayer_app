const verse = document.getElementById("verse");
const scripture = document.getElementById("scripture");
const add = document.querySelector(".add");
const token = document.querySelector(".token");
const type = document.querySelector(".type");
const prayer_btn = document.getElementById("btn_prayer");

let dynamic = document.querySelector(".dynamic_scripture");
let arr = [];


scripture.addEventListener("blur",async(e)=>{
    const validate = await axios.get(`https://bible-api.com/${e.target.value}`);
    verse.innerHTML = validate.data.text;
});

add.addEventListener("click",(e)=>{
    e.preventDefault();
    let html = "";
    let uuid = Math.floor(Math.random() * 100000045677654);

    const data = {
        id:uuid,
        scripture_verse:scripture.value,
        bible_verse:verse.value,
    }
    arr.push(data);
    console.log(arr);

    for (const value of arr) {
        html += `<button type="button" class="btn btn-primary mt-1 mb-1 text-start">
        ${value.bible_verse.substr(0,7)} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span> `
        dynamic.innerHTML = html;
    }
    dels();
})


function dels() {
    document.querySelectorAll(".del").forEach(del=>{
        del.addEventListener("click",function(e){
            const id = e.target.id;
            console.log(id);
            arr = arr.filter(val=>{
                return val.id != id;
            });   
            let html = "";
            for (const value of arr) {
                html +=` <button type="button" class="btn btn-primary mt-1 mb-1 text-start">
                ${value.bible_verse.substr(0,7)} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
                dynamic.innerHTML = html;
            } 
            dels();
        })
    })
    
      
}

prayer_btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    try {
        const data = {
            scripture:arr,
            type:type.innerHTML
        }
    
        const validate = await axios.post('/api/v1/create/scripture', data, {
            headers:{Authorization:`Bearer ${token.innerHTML}`}
        });

        console.log(validate);

        if (validate.data.error !== false) {
            throw new Error(validate.data.errorMsg);
        }

        return alert(validate.data.statusText);
    } catch(e) {
        alert(e.message);
    }
})