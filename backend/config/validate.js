// Check for users' Input Errors
module.exports.validRegister = (
    username,
    email,
    password,
    confirmPassword,
) => {
    const errors = {};

    if(username.trim() === "") {
        errors.username = "Tên đăng nhập còn trống!";
    }

    if(email.trim() === "") {
        errors.username = "Email còn trống!";
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        
        if (!email.match(regEx)) {
          errors.email = 'Email không hợp lệ';
        }
    }

    if (password === '') {
        errors.password = 'Điền vào mật khẩu';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Mật khẩu chưa trùng khớp';
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validLogin = (email, password) => {
    const errors = {};

    if (email.trim() === '') {
        errors.email = 'Email còn trống';
    }

    if (password.trim() === '') {
        errors.password = 'Chưa điền mật khẩu';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}