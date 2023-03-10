const verse = document.getElementById("verse");
const scripture = document.getElementById("scripture");
const title = document.getElementById("title");
const prayers = document.getElementById("prayers");
const add = document.querySelector(".add");
const token = document.querySelector(".token");
const type = document.querySelector(".type");
const prayer_btn = document.getElementById("btn_prayer");

let dynamic = document.querySelector(".dynamic_scripture");


verse.addEventListener("blur",async(e)=>{
    const validate = await axios.get(`https://bible-api.com/${e.target.value}`);
    scripture.innerHTML = validate.data.text;
});

let arr = [];


add.addEventListener("click",(e)=>{
    e.preventDefault();
    let uuid = Math.floor(Math.random() * 100000045677654);

    const data = {
        id:uuid,
        scripture:scripture.innerHTML,
        verse:verse.value
    }

    arr.push(data);
    if (localStorage.getItem("scripture")) {
        localStorage.setItem('scripture',JSON.stringify(arr));
    } else {
        localStorage.setItem('scripture',JSON.stringify(arr));
    }
    let html = "";

    for (const value of arr) {
        html +=` <button type="button" class="btn btn-primary mt-1 mb-1 text-start">
        ${value.verse} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
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
            console.log(arr);
            let html = "";
            for (const value of arr) {
                html +=` <button type="button" class="btn btn-primary mt-1 mb-1 text-start">
                ${value.verse} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
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
            title:title.value,
            prayers:prayers.value,
            content:arr,
            type:type.innerHTML
        }
    
        const validate = await axios.post('/api/v1/create/morning/prayer', data, {
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