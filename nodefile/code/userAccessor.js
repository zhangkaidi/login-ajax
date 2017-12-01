var fs = require('fs');
var Meeting = require('../model/User');
var file = 'data/user.txt';

/**
 * 数据访问
 */

class DataAccessor {
    set(text) {
        try {
            fs.writeFileSync(file, text);
            return true;
        } catch (error) {
            console.log('写文件' + file + '出错,error' + error);
            return false;
        }
    }
    get() {
        try {
            let userMessage = fs.readFileSync(file, 'utf8');
            return userMessage ?
                this.getData(JSON.parse('[' + userMessage + ']')) :
                this.getData([]);

        } catch (error) {
            if (error.code === 'ENOENT') {
                fs.writeFileSync(file, '');
                return this.getData([]);
            } else {
                console.log('读取文件' + file + '出错');
                throw error;
            }
        }
    }
    getData(data) {
        return data;
    }
    add(text) {
        var user = this.get();
        var result = false;
        user.forEach(function (value, index) {
            if (text.name == value.name) {
                result = true;
                return;
            }
        })
        if (result) { return false }
        let prefix = user.length == 0 ? '' : ',';
        try {
            fs.appendFileSync(file, prefix + JSON.stringify(text));
            return true;
        } catch (error) {
            console.log('append文件' + file + '出错,error' + error);
            return false;
        }
    }
    remove(name) {
        var user = this.get();
        var removeIndex = user.findIndex(function (value) {
            return value.name === name
        })
        user.splice(removeIndex, 1);
        let str = JSON.stringify(user);
        return this.set(str.slice(1, str.length - 1));
    }
    login(person) {
        var user = this.get();
        var result = false;
        user.forEach(function (item, index) {
            if (item.name == person.name && item.password == person.password) {
                result = true;
            }
        })
        if (result) {
            return true;
        } else {
            return false;
        }
    }
    update(person) {
        var user = this.get();
        if (this.remove(person.name)) {
            return this.add(person);
        } else {
            return false;
        }
    }
}

module.exports = DataAccessor;