const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy } = require("passport-jwt");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const passportConfig = { usernameField: "email", passwordField: "password" };

const passportVerify = async (email, password, done) => {
  try {
    const exUser = await User.findOne({ where: { email: email } });
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        done(null, exUser);
      } else {
        done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      done(null, false, { message: "가입되지 않은 회원입니다." });
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["user"];
  }
  return token;
};

const JWTConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    // 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
    } else {
      // 유저 데이터가 없을 경우 에러 표시
      done(null, false, { message: "올바르지 않은 인증정보 입니다." });
    }
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
