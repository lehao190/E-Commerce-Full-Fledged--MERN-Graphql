const fileStream = require("fs");

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

// Check for user's login inputs
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

// Check for admin's Inputs 
module.exports.validCreateProduct = (description, name, category, brand, price, countInStock) => {
    const errors = {};

    if(description.trim() === "") {
        errors.description = "Chi tiết còn trống"
    }

    if(name.trim() === "") {
        errors.name = "Tên còn trống"
    }

    if(category.trim() === "") {
        errors.category = "Loại còn trống"
    }

    if(brand.trim() === "") {
        errors.brand = "Hãng còn trống"
    }

    if(price < 0) {
        errors.price = "Giá phải lớn hơn 0"
    }

    if(countInStock < 0) {
        errors.countInStock = "Số lượng phải lớn hơn 0"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}