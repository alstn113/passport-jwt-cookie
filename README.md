passport와 jwt, passport-jwt을 사용했고 쿠키에 토큰을 저장했음
login이랑 logout() 어쩔지 몰라서 걍 안지웠고
근데 req.user 제대로 안되서 그냥 isLoggedIn이랑 isNotLoggedIn, noMatter만들어서 거기다 req.user 넣고 라우터에서 씀

passport.initialize() req.user이랑 관련되어서 사용하는 줄 알았는데 알고보니까 session에 있는 거 바꿔주는 거라서 지움. // passport 함수들 설명 참고

passport 함수들 설명
https://velog.io/@everydamnday/express-session-passport.initialize-passport.session-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EA%B0%84%EC%9D%98-%EC%83%81%ED%98%B8%EC%9E%91%EC%9A%A9-in-Passport-Local-Authentication


passport-jwt 설명

https://chanyeong.com/blog/post/28

https://stackhoarder.com/2019/07/17/node-js-passport-js-jwt-token-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84/

https://darrengwon.tistory.com/332

https://maruzzing.github.io/study/nodejs/Passport%EC%99%80-JWT%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Auth-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-4/
