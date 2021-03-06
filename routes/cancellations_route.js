const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) return next();

	// if they aren't redirect them to the home page
	return res.redirect("/login");
}

router.get('/sp_12_res', isLoggedIn, function(req, res, next) {
    let _rut = req.query.rut ? req.query.rut : 0;

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_12_res', {
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
            res.status(400).json({});
        });
    
});

router.get('/sp_12_det', isLoggedIn, function(req, res, next) {
    let _rut = req.query.rut ? req.query.rut : 0;

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_12_det', {
        rut: _rut,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_12_det', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('err', err);
            res.status(400).json({});
        });
    
});

router.get('/sp_12_doc', isLoggedIn, function(req, res, next) {
    const _rut = req.query.rut ? req.query.rut : 0;
    const _contrato = req.query.contrato ? req.query.contrato : 0;

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_12_doc', {
        rut: _rut,
        contrato: _contrato,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    }, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_12_doc', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('err', err);
            res.status(400).json({});
        });
    
});

router.get('/sp_12_abo', isLoggedIn, function(req, res, next) {
    let _rut = req.query.rut ? req.query.rut : 0;
    let _contrato = req.query.contrato ? req.query.contrato : 0;

    let _body = {
        rut: _rut,
        contrato: _contrato,
        fdesde: req.query.date.gte,
        fhasta: req.query.date.lte,
        codempl : 0,
        codcli: 0
    };

    console.log('sp_12_abo', _body);

    axios.post( 'http://200.54.149.45/PrimusCapital.WebClienteApi/api/webcliente/sp_12_abo', _body, {
        headers: { Authorization: `Bearer ${req.user.access_token}` }
    })
        .then(function(r){
            console.log('sp_12_abo', r.data);

            res.json(r.data);
        })
        .catch(function(err){
            console.log('sp_12_abo.err', err);
            res.status(400).json({});
        });
    
});


module.exports = router;