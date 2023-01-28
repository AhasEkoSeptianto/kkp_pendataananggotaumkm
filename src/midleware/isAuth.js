const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization ;
		if (!token) {
			return res.status(401).json({ msg: "no authenticated token" });
		}
		const verify = jwt.verify(token, process.env.JWTTOKEN);
		if (!verify) {
			return res.status(401).json({ msg: "token verification failed" });
		}
		next();
	} catch (err) {
		return res.status(401).json({ msg: "no authenticated token" });
	}
};


module.exports = auth;

const isAuth = (req, res) => {
	try{
		token = req?.cookies?.token;

		if (!token){
			return res.status(401).json({ msg: 'no authenticated token' });
		}else{
			const verify = jwt.verify(token, process.env.JWTTOKEN);
			if (!verify){
				return res.status(401).json({ msg: 'token verification failed' });
			}
		}


	}catch{
		
	}
}




module.exports = isAuth
