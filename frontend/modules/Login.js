import validator from 'validator';
export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.onsubmit = ((e)=>{
            e.preventDefault();
            const validationError = this.validate(e);
            if(!validationError) e.target.submit();

        })
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"');
        const passwordInput = el.querySelector('input[name="password"');
        let error = false;
        for(let cleanErrorText of this.form.querySelectorAll('.text-danger')){
            cleanErrorText.remove();
        }

        if(!emailInput.value || !passwordInput.value){
            error = true;
            this.createError(emailInput, 'E-mail deve ser preenchido');
        }
        //
        if(!passwordInput.value){
            error = true;
            this.createError(passwordInput, 'Senha deve ser preenchida')
        }

        if(!validator.isEmail(emailInput.value)){
            error = true;
            this.createError(emailInput, 'E-mail invalido')
        }
        if(passwordInput.value.length < 4 || passwordInput.value.length > 12){
            error = true;
             this.createError(passwordInput, 'Senha deve conter entre 4 a 12 caracteres')
        }
        console.log(emailInput.value,passwordInput.value);
        return error;
    }

    createError(campo, msg){
        const small = document.createElement('div');
        small.innerHTML = msg;
        small.classList.add('text-danger');
        campo.insertAdjacentElement('afterend',small);
    }
}