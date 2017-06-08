var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')

var app = express(); 
// Session 미들웨어 불러오기
var expressSession = require('express-session');
// 익스프레스 객체 생성
 

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config');

// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database');
var router = require('./routes/main')(app);

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');
var gulp = require('gulp');
var runSeq = require('run-sequence');

// __dirname은 현재 파일 위치를 나타내는 Node.js 전역 변수, view는 views밑에 들어간다, ejs engine 사용
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

 
// 미들웨어 커스터마이징
app.use(function(request, response, next) {
    console.log('미들웨어 커스터마이징 처리!!');
    // 다음 미들웨어로 처리를 넘김
    next();
});

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));



// 라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app, express.Router());


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    // 데이터베이스 초기화
    database.init(app, config);
   
});
