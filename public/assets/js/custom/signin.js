const form = document.getElementById("form");
const error = document.querySelector(".error");

form.addEventListener("submit", async (e) => {
      e.preventDefault();
    try {
        const data = {
            email:form.email.value,
            password:form.password.value
        }

        const validate = await axios.post('/api/v1/login', data);
        if (validate.data.error !== false) {
            throw new Error(validate.data.errorMsg);
        }
        location.href = '/dashboard';
    } catch(e){
        error.innerHTML = e.message;
        setTimeout(()=>{
            error.innerHTML= '';
        },5000);
    }
});
        
        


   