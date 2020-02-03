const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn', req.user);

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	return res.redirect("/login");
}

router.get('/sp_11_res', isLoggedIn, function(req, res, next){
    let _rut = req.query.rut ? req.query.rut : 0;

    console.log('rut', _rut);

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_11_res', {
        rut: _rut,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log(r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('err', err);

            res.status(400).json({
            });
        });
    
});

module.exports = router;