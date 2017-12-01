var express = require('express');

/**
 * 用戶信息
 */
class User {
    constructor(name,password)
     {
        this.name = name;
        this.password = password;
    }
}
module.exports = User;