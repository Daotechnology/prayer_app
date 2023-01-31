const form_password = document.getElementById("change_password");
const token = document.querySelector(".token");
const profile = document.getElementById("profile");

form_password.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const password1 = form_password.new_password1.value;
  const password2 = form_password.new_password2.value;

  try {
    if (password1 !== password2) {
        throw new Error('Password Not A Match');
    }

    const data = {
        old_password:form_password.old_password.value,
        password:form_password.new_password2.value
    }

    const validate = await axios.post('/api/v1/change_password', data,{
        headers:{Authorization:`Bearer ${token.innerHTML}`}
    });

    if (validate.data.error !== false) {
        throw new Error(validate.data.errorMsg);
    }
    return alert(validate.data.statusText);
} catch(e){
    alert(e.message);
    // setTimeout(()=>{
    //     error.innerHTML= '';
    // },5000);
}
  
})

profile.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email = profile.email.value;
    const fullname = profile.fullname.value;
    const city = profile.city.value;
    const postal_code = profile.postal_code.value;
    const country = profile.country.value;
    const about_me = profile.about_me.value;
    try {
       
        const data = {
            email:profile.email.value,
            fullname:profile.fullname.value,
            city:profile.city.value,
            postal_code: profile.postal_code.value,
            country: profile.country.value,
            about_me:profile.about_me.value,
        }
    
        const validate = await axios.post('/api/v1/edit_profile', data,{
            headers:{Authorization:`Bearer ${token.innerHTML}`}
        });
    console.log(validate);
        if (validate.data.error !== false) {
            throw new Error(validate.data.errorMsg);
        }
        return alert(validate.data.statusText);
    } catch(e){
        alert(e.message);
        // setTimeout(()=>{
        //     error.innerHTML= '';
        // },5000);
    }
})