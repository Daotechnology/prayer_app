const verse = document.getElementById("verse");
const scripture = document.getElementById("scripture");
const title = document.getElementById("scripture");
const prayer = document.getElementById("prayer");
const add = document.querySelector(".add");
let arr = [];
let dynamic = document.querySelector(".dynamic_scripture");


verse.addEventListener("blur",async(e)=>{
    const validate = await axios.get(`https://bible-api.com/${e.target.value}`);
    scripture.innerHTML = validate.data.text;
})

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
    document.querySelectorAll(".del").forEach(del=>{
        del.addEventListener("click",(e)=>{
            const id = e.target.id;
            console.log(id);
            let new_array = arr.filter(val=>{
                return val.id != id;
            });
            console.log(new_array);
            let html = "";
            // for (const value of new_array) {
            //     html +=` <button type="button" class="btn btn-primary mt-1 mb-1 text-start">
            //     ${value.verse} <span id = "${value.id}" class="badge bg-dark text-danger del"> X </span>`
            //     dynamic.innerHTML = html;
            // }
        })    
    })
})