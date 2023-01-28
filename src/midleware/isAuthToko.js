const isAuthToko = (req, res) => {
	try{
		token = req?.cookies?.token;

		if (!token){
			res.status(401).json({ msg: 'no authenticated token' });
		}else{
            const verify = jwt.verify(token, process.env.JWTTOKENTOKO);
            if (!verify){
                res.status(401).json({ msg: 'token verification failed' });
            }
        }


	}catch{
		
	}
}

module.exports = isAuthToko