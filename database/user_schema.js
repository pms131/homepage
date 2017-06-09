/**
 * 데이터베이스 스키마를 정의하는 모듈
 *
 * @date 2016-11-10
 * @author Mike
 */

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function (mongoose) {

    // 스키마 정의
    var UserSchema = mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            'default': ''
        },
        password: {
            type: String,
            required: true,
            'default': ''
        },
    });



    // 인증 메소드 - 입력된 비밀번호와 비교 (true/false 리턴)
    UserSchema.method('authenticate', function (plainText, inSalt, _password) {
        if (inSalt) {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this._password);
            return this._password === password;
        } else {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this._password);
            return this._password;
        }
    });

    // 값이 유효한지 확인하는 함수 정의
    var validatePresenceOf = function (value) {
        return value && value.length;
    };

    // 저장 시의 트리거 함수 정의 (password 필드가 유효하지 않으면 에러 발생)
    UserSchema.pre('save', function (next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.password)) {
            next(new Error('유효하지 않은 password 필드입니다.'));
        } else {
            next();
        }
    })

    // 필수 속성에 대한 유효성 확인 (길이값 체크)
    UserSchema.path('id').validate(function (id) {
        return id.length;
    }, 'id 칼럼의 값이 없습니다.');

    UserSchema.path('password').validate(function (password) {
        return password.length;
    }, 'password 칼럼의 값이 없습니다.');


    // 스키마에 static 메소드 추가
    UserSchema.static('findById', function (id, callback) {
        return this.find({
            id: id
        }, callback);
    });

    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });

    console.log('UserSchema 정의함.');

    return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;