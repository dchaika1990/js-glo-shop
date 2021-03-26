const validation = (form) => {
    const inputs = form.querySelectorAll('input');
    const buttonSubmit = form.querySelector('button')
    let valid = {
        phoneCustomer: false,
        nameCustomer: false,
    };

    function checkValid() {
        return ( !Object.values(valid).includes(false) && Object.keys(valid).length > 0)
            ? buttonSubmit.disabled = false
            : buttonSubmit.disabled = true;
    }

    inputs.forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            let name = input.getAttribute('name');
            input.value.trim() < 2 ? valid[name] = false : valid[name] = true
            checkValid();
            console.log(valid)
        })
    })
    checkValid();
}

export default validation;