"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const zvanja_1 = __importDefault(require("./model/zvanja"));
const predmeti_1 = __importDefault(require("./model/predmeti"));
const zaposleni_1 = __importDefault(require("./model/zaposleni"));
const obavestenja_1 = __importDefault(require("./model/obavestenja"));
const studenti_1 = __importDefault(require("./model/studenti"));
const termini_1 = __importDefault(require("./model/termini"));
const admin_1 = __importDefault(require("./model/admin"));
const opsta_obavestenja_1 = __importDefault(require("./model/opsta_obavestenja"));
const projekti_1 = __importDefault(require("./model/projekti"));
const zahtevi_1 = __importDefault(require("./model/zahtevi"));
const spiskovi_1 = __importDefault(require("./model/spiskovi"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
var path = require('path');
app.use(express_1.default.static(__dirname + "/../podaci/slike_zaposlenih"));
app.use(express_1.default.static(__dirname + "/../podaci/predmeti/"));
const router = express_1.default.Router();
mongoose_1.default.connect('mongodb://localhost:27017/pia_projekat');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Uspesna konekcija!");
});
var fs = require('fs');
const multer = require('multer');
/*
  Funkcija za dodavanje vise fajlova, koriste se kod obavestenja koje
  postavlja profesor za odredjeni predmet. Receno je da on moze da okaci vise fajlova
  Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodavanjeViseFajlova', function (req, res) {
    console.log("usao u dodaj fajlove");
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/fajlovi",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).array('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            for (let i = 0; i < req.files.length; i++) {
                console.log(req.files[i].filename);
                console.log(req.files[i].path);
            }
            console.log(req.body);
            console.log(req.files[0].filename);
            console.log(req.files[0].path);
        }
    });
});
/*Funkcija koju koristi administrator prilikom kacenja slika zaposlenih
  Slike se pamte u posebnom folderu za slike zaposlenih. Koristi se Multer biblioteka
  koja je namenjena za upload fajlova na server
*/
app.post('/dodavanjeSlikeZaposlenog/:korime', function (req, res) {
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/slike_zaposlenih",
        filename: function (req, file, cb) {
            // cb(null, Date.now() + "." + file.mimetype.split('/')[1])
            //cb(null, file.originalname)
            cb(null, korime + '.' + file.mimetype.split('/')[1]);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            zaposleni_1.default.updateOne({ "korime": korime }, { "slika": req.file.path }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    console.log("OK JE SVE");
            });
            res.end("File has been uploaded");
        }
    });
    res.json({ "poruka": "OK" });
});
/*Pomocna funkcija koja je sluzila za proveru nacina rada Multer biblioteke*/
app.post('/dodavanjeSlikeProba', function (req, res) {
    console.log("usao");
    var storage = multer.diskStorage({
        destination: './pr1/',
        filename: function (req, file, cb) {
            // cb(null, Date.now() + "." + file.mimetype.split('/')[1])
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            res.end("File has been uploaded");
        }
    });
});
/*
  Funkcija koja sluzi za dohvatanje fajlova koji su okaceni na server.
  Koristi se kod Predmeta prilikom skidanja materijala za predavanja, vezbe,lab vezbe,
  ispitne_rokove, obavestenja
*/
router.route("/dohvatiMaterijal/:sifra/:tip/materijal:naziv").get(function (req, res) {
    console.log("usao u dohvati materijal");
    let url = router.get("url");
    let urlStr = "" + url.stack[0].path;
    let splited = urlStr.split(":");
    console.log(splited[1]);
    let sifra = req.params.sifra;
    console.log(sifra);
    let tip = req.params.tip;
    console.log(tip);
    //res.sendFile('podaci/slike_zaposlenih/cas1_2.zip', { root: __dirname + "/../" })
    res.sendFile('podaci/predmeti/' + sifra + "/" + tip + "/" + splited[1], { root: __dirname + "/../" });
});
/* Funkcija koja dodaje novo predavanje u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNovoPredavanje/:sifra/:ime/:prezime/:korime', function (req, res) {
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/predavanja",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let predavanje = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "predavanja": predavanje } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("Uspesno ucitao predavanje!")
                    //jako je bitno da se ovde stavi vracanje poruke kako bi postojala sinhronizacija izmedju
                    //fronta i backa i kako bih na frontu imala azurnu situaciju da sam sigurno na backu uradila
                    //update. Desavalo se da mi, ako ne stavim povratnu poruku u okviru update metode, da ne dobijem
                    //azurnu informaciju na frontu
                    res.json({ "poruka": "OK" });
                }
            });
            //res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja dodaje nove pratece fajlove uz obavestenje u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodavanjeFajlovaObavestenje/:id/:sifra/:predmet', function (req, res) {
    let id = req.params.id;
    let sifra = req.params.sifra;
    let predmet = req.params.predmet;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/obavestenja",
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });
    var upload = multer({ storage: storage }).array('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            for (let i = 0; i < req.files.length; i++) {
                let fajl_upload = {
                    "naziv_fajla": (req.files[i].filename),
                    "link": req.files[i].path,
                    "datum": Date.now(),
                    "tip_fajla": req.files[i].mimetype,
                    "velicina_fajla": req.files[i].size,
                    "predmet": predmet,
                    "originalni_naziv": req.files[i].originalname,
                };
                obavestenja_1.default.updateOne({ "_id": id }, { $push: { "fajlovi": fajl_upload } }, (err, res) => {
                    if (err)
                        console.log(err);
                    else
                        console.log("Uspesno ucitao dodatak za obavestenje!");
                });
            }
            res.end("File has been uploaded");
        }
    });
    return res.json({ "poruka": "OK" });
});
/* Funkcija koja dodaje nove vezbe u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNoveVezbe/:sifra/:ime/:prezime/:korime', function (req, res) {
    console.log("usao u dodaj vezbe");
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/vezbe",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let vezbe = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "vezbe": vezbe } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("Uspesno ucitao vezbe!")
                    res.json({ "poruka": "OK" });
                }
            });
            //res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja dodaje novi ispitni rok u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNoviIspit/:sifra/:ime/:prezime/:korime', function (req, res) {
    console.log("usao u dodaj ispit");
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/ispitni_rokovi",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let ispit = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "ispiti": ispit } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ "poruka": "OK" });
                    //console.log("Uspesno ucitao ispit!")
                }
            });
            //res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja dodaje novu laboratoriju u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNovuLaboratoriju/:sifra/:ime/:prezime/:korime', function (req, res) {
    console.log("usao u fju za dodavanje novog laba");
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    //let tip = req.params.tip;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/laboratorija",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let lab = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "labvezbe": lab } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ "poruka": "OK" });
                    //console.log("Uspesno ucitao lab!")
                }
            });
            // res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja dodaje nove materijale za projekat u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNovMaterijalProjekat/:sifra/:ime/:prezime/:korime', function (req, res) {
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/projekat",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let projekat = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "projekat_materijali": projekat } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ "poruka": "OK" });
                    //console.log("Uspesno ucitao materijal za projekat!")
                }
            });
            //res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja dodaje nove materijale za domaci zadatak u folder podaci i podfolder za taj konkretan predmet
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/dodajNovMaterijalDomaci/:sifra/:ime/:prezime/:korime', function (req, res) {
    let sifra = req.params.sifra;
    let ime = req.params.ime;
    let prezime = req.params.prezime;
    let korime = req.params.korime;
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/domaci",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let domaci = {
                "naziv_fajla": (req.file.filename),
                "link": req.file.path,
                "datum": Date.now(),
                "tip_fajla": req.file.mimetype,
                "velicina_fajla": req.file.size,
                "ime": ime,
                "prezime": prezime,
                "korime": korime
            };
            predmeti_1.default.updateOne({ "sifra": sifra }, { $push: { "domaci_materijali": domaci } }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ "poruka": "OK" });
                    //console.log("Uspesno ucitao materijal za projekat!")
                }
            });
            //res.end("File has been uploaded");
        }
    });
    //return res.json({"poruka":"OK"})
});
/* Funkcija koja koja se koristi kod studenta. On sluzi da se posalje njegov rad prilikom dodavanja sebe na spisak
   Koristi se Multer biblioteka koja je namenjena za upload fajlova na server
*/
app.post('/posaljiRad/:id/:sifra/:korime', function (req, res) {
    let sifra = req.params.sifra;
    let korime = req.params.korime;
    let id = req.params.id;
    console.log(sifra);
    console.log(korime);
    console.log(id);
    var storage = multer.diskStorage({
        destination: __dirname + "/../podaci/predmeti/" + sifra + "/radovi/" + korime,
        filename: function (req, file, cb) {
            cb(null, +Date.now() + "-" + file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        else {
            console.log(req.body);
            console.log(req.file.filename);
            console.log(req.file.path);
            let rad = {
                "korime": korime,
                "putanja": req.file.path,
                "ime_fajla": req.file.filename
            };
            let link = req.file.path;
            spiskovi_1.default.updateOne({ "_id": id }, { $push: { "prijavljeni": rad } }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    console.log("Uspesno ucitao rad!");
            });
            res.end("File has been uploaded");
        }
    });
    return res.json({ "poruka": "OK" });
});
/*Funkcija koju koristi student kako bi se prijavio na neki otvoreni spisak */
router.route('/dodajStudentaNaSpisak').post((req, res) => {
    let korime = req.body.korime;
    let id = req.body.id;
    let rad = {
        "korime": korime
    };
    spiskovi_1.default.updateOne({ "_id": id }, { $push: { "prijavljeni": rad } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
Pomocna funkcija koja se sluzila za dodavanje svih zvanja u sistem
*/
router.route('/dodajZvanja').post((req, res) => {
    let naziv = req.body.naziv;
    let zvanje = new zvanja_1.default({
        naziv: naziv
    });
    zvanje.save().then((p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija koja dohvata sva zvanja iz baze podataka
*/
router.route('/dohvatiZvanja').get((req, res) => {
    // console.log(__dirname)
    zvanja_1.default.find({}, (err, z) => {
        if (err)
            console.log(err);
        else {
            res.json(z);
        }
    });
});
/*
Dohvata sve predmete
*/
router.route('/dohvPredmeteNastavnik').get((req, res) => {
    predmeti_1.default.find({}, (err, z) => {
        if (err)
            console.log(err);
        else {
            res.json(z);
        }
    });
});
/*
  Funkcija koja dohvata zvanja na osnovu ID zvanja
*/
router.route('/dohvatiZvanje').post((req, res) => {
    // console.log(__dirname)
    let id = req.body.id;
    zvanja_1.default.findOne({ "_id": id }, (err, z) => {
        if (err)
            console.log(err);
        else
            res.json(z);
    });
});
/*
  Dohvata predmete na osnovu tipa_studija(osnovne i master) i smera(rti, si, ostali)
*/
router.route('/dohvPredmete').post((req, res) => {
    let tip_studija = req.body.tip_studija;
    let smer = req.body.smer;
    predmeti_1.default.find({ "tip_studija": tip_studija, "smer": smer }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json(p);
    });
});
/*
  Funkcija koju koristi admin, sluzi za registraciju novog zaposlenog
*/
router.route('/registrujZaposlenog').post((req, res) => {
    let zaposlen = req.body.zaposlen;
    zaposleni_1.default.findOne({ "korime": zaposlen.korime }, (err, k) => {
        if (err)
            console.log(err);
        else {
            /*
              Potrebno je da se svakako proveri da li zaposleni s tim korisnickim imenom vec postoji u sistemu
            */
            if (k != null) {
                res.json({ "poruka": "KORIME" });
            }
            else {
                let z = new zaposleni_1.default(zaposlen);
                z.save().then((p) => {
                    res.json({ "poruka": "OK" });
                });
            }
        }
    });
});
/*
  Funkcija koju koristi admin, ali i sam student i sluzi za registraciju novog studenta
*/
router.route('/registrujStudenta').post((req, res) => {
    let student = req.body.student;
    studenti_1.default.findOne({ "korime": student.korime }, (err, k) => {
        if (err)
            console.log(err);
        else {
            /*
              Potrebno je da se svakako proveri da li student s tim korisnickim imenom vec postoji u sistemu
            */
            if (k != null) {
                res.json({ "poruka": "KORIME" });
            }
            else {
                let s = new studenti_1.default(student);
                s.save().then((p) => {
                    res.json({ "poruka": "OK" });
                });
            }
        }
    });
});
/*
  Dohvatanje svih zaposlenih u sistemu
*/
router.route('/dohvatiZaposlene').get((req, res) => {
    zaposleni_1.default.find({}, (err, z) => {
        if (err)
            console.log(err);
        else {
            res.json(z);
        }
    });
});
/*
  Dohvatanje zaposlenog na osnovu njegovog korisnickog imena i lozinke
*/
router.route('/dohvatiZaposlenog').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    zaposleni_1.default.findOne({ "korime": korime, "lozinka": lozinka }, (err, k) => {
        if (err)
            console.log(err);
        else {
            res.json(k);
        }
    });
});
/*
  Funkcija koja sluzi za azuriranje informacija o zaposlenom(ulica, grad, mobilni, broj kabineta, licni podaci)
*/
router.route('/azurirajInfoZaposleni').post((req, res) => {
    let zaposlen = req.body.zaposlen;
    zaposleni_1.default.updateOne({ "korime": zaposlen.korime }, { "ulica": zaposlen.ulica, "grad": zaposlen.grad, "mobilni": zaposlen.mobilni, "broj_kabineta": zaposlen.broj_kabineta, "licni_podaci": zaposlen.licni_podaci }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija za dodavanje novih obavestenja u sistem
*/
router.route('/dodajObavestenje').post((req, res) => {
    let o = req.body.obavestenje;
    let obavestenje = new obavestenja_1.default(o);
    obavestenje.save().then((p) => {
        res.json({ "poruka": "OK", "id": obavestenje._id });
    });
});
/*
  Funkcija koja dohvata obavestenja koje je bas taj zaposleni objavio
*/
router.route('/dohvatiMojaObavestenja').post((req, res) => {
    let korime = req.body.korime;
    obavestenja_1.default.find({ "korime": korime }, (err, o) => {
        if (err)
            console.log(err);
        else
            res.json(o);
    });
});
/*
  Brisanje obavestenja na osnovu ID obavestenja
*/
router.route('/obrisiObavestenje').post((req, res) => {
    let id = req.body._id;
    obavestenja_1.default.deleteOne({ "_id": id }, (p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija za dohvatanje naziva predmeta na osnvou Id predmeta
  Dosta koriscenja funkcija u gotovo svim delovima projekta
*/
router.route('/dohvatiNazivPredmeta').post((req, res) => {
    let id = req.body.id;
    predmeti_1.default.findOne({ "_id": id }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json(p);
    });
});
/*
  Azuriranje obavestenja - naslov, sadrza, datum, predmeti na koje se odnosi obavestenje
*/
router.route('/azurirajObavestenje').post((req, res) => {
    let o = req.body.o;
    let niz = req.body.niz;
    obavestenja_1.default.updateOne({ "_id": o._id }, { "naslov": o.naslov, "sadrzaj": o.sadrzaj, "datum": o.datum, "predmeti": niz }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje svih studenata u sistemu
*/
router.route('/dohvatiStudente').get((req, res) => {
    studenti_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Brisanje odredjenog studenta iz sistema na osnovu njegovog id
*/
router.route('/obrisiStudenta').post((req, res) => {
    let s = req.body.s;
    studenti_1.default.deleteOne({ "_id": s._id }, (p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Brisanje zaposlenog na osnovu njegog id
*/
router.route('/obrisiZaposlenog').post((req, res) => {
    let z = req.body.z;
    zaposleni_1.default.deleteOne({ "_id": z._id }, (p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Azuriranje podataka o studentu - korime, lozinka, indeks, tip_studija, status
*/
router.route('/azurirajStudenta').post((req, res) => {
    let student = req.body.student;
    studenti_1.default.updateOne({ "_id": student._id }, { "korime": student.korime, "lozinka": student.lozinka, "indeks": student.indeks, "tip_studija": student.tip_studija, "status": student.status }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija koju koristi admin prilikom azuriranja informacija o zaposlenom. On ne moze da promeni lozinku zaposlenog
*/
router.route('/azurirajZaposlenogAdmin').post((req, res) => {
    let z = req.body.zaposleni;
    zaposleni_1.default.updateOne({ "_id": z._id }, {
        "korime": z.korime, "ulica": z.ulica, "grad": z.grad, "mobilni": z.mobilni,
        "vebsajt": z.vebsajt, "licni_podaci": z.licni_podaci, "zvanje": z.zvanje, "broj_kabineta": z.broj_kabineta,
        "status": z.status
    }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje svih predmeta iz sistema
*/
router.route('/dohvSvePredmete').get((req, res) => {
    predmeti_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Brisanje predmeta na osnovu njegovog ID
*/
router.route('/obrisiPredmet').post((req, res) => {
    let p = req.body.p;
    predmeti_1.default.deleteOne({ "_id": p._id }, (poruka) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje svih termina koji postoje u bazi podataka
*/
router.route('/dohvatiTermine').get((req, res) => {
    termini_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Funkcija za dodavanje novog predmeta u sistem. Koristi je adminsitrator
*/
router.route('/dodajNoviPredmet').post((req, res) => {
    let pr = req.body.p;
    let predmet = new predmeti_1.default(pr);
    predmet.save().then((pp) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje predmeta na osnovu ID. Dosta koriscenja funkcija u projektu
*/
router.route('/dohvatiPredmetNaOsnovuID').post((req, res) => {
    let id = req.body.id;
    predmeti_1.default.findOne({ "_id": id }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json(p);
    });
});
/*
  Dohvatanje admina, koristi se prilikom logovanja na sistem
*/
router.route('/dohvatiAdmina').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    admin_1.default.findOne({ "korime": korime, "lozinka": lozinka }, (err, a) => {
        if (err)
            console.log(err);
        else
            res.json(a);
    });
});
/*
  Dohvatanje studenta na osnovu korisnickog imena i lozinke, koristi se prilikom logovanja na sistem
*/
router.route('/dovhatiStudenta').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    studenti_1.default.findOne({ "korime": korime, "lozinka": lozinka }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Koristi se prilikom registracije studenta, student je duzan da odmah po prvoj prijavi na sistem promeni lozinku
*/
router.route('/promenaLozinkeStudent').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    studenti_1.default.updateOne({ "korime": korime }, { "lozinka": lozinka, "flag": 1 }, (err, p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se prilikom registracije zaposlenog, zaposleni je duzan da odmah po prvoj prijavi na sistem promeni lozinku
*/
router.route('/promenaLozinkeZaposleni').post((req, res) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;
    zaposleni_1.default.updateOne({ "korime": korime }, { "lozinka": lozinka, "flag": 1 }, (err, p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija za dodavanje novih obavestenja koja se odnose na obavestenja o praksama, poslovima itd...
  To su obavestenja koja su vidljiva na pocetnoj stranici svima
*/
router.route('/dodajOpsteObavestenje').post((req, res) => {
    let obavestenje = req.body.obavestenje;
    let o = new opsta_obavestenja_1.default(obavestenje);
    o.save().then((p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje svih obavestenja o praksama, poslovima...
*/
router.route('/dohvatiOpstaObavestenja').get((req, res) => {
    opsta_obavestenja_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Azuriranje svih obavestenja o praksama, poslovima...
*/
router.route('/azurirajOpsteObavestenje').post((req, res) => {
    let o = req.body.o;
    opsta_obavestenja_1.default.updateOne({ "_id": o._id }, { "naslov": o.naslov, "sadrzaj": o.sadrzaj, "kategorija": o.kategorija }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dodavanje novog projekta na sistem, to su projekti katedre, opsti neki projekti koji se rade
*/
router.route('/dodajProjekat').post((req, res) => {
    let projekat = req.body.projekat;
    let p = new projekti_1.default(projekat);
    p.save().then((p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje svih projekata
*/
router.route('/dohvatiProjekte').get((req, res) => {
    projekti_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Azuriranje svih projekata
*/
router.route('/azurirajProjekat').post((req, res) => {
    let projekat = req.body.projekat;
    projekti_1.default.updateOne({ "_id": projekat._id }, { "tema": projekat.tema, "oblast": projekat.oblast, "kontakt": projekat.kontakt, "sadrzaj": projekat.sadrzaj, "kategorija": projekat.kategorija }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje nastavnika
 */
router.route('/dohvatiNastavnika').post((req, res) => {
    let korime = req.body.korime;
    zaposleni_1.default.findOne({ "korime": korime }, (err, z) => {
        if (err)
            console.log(err);
        else
            res.json(z);
    });
});
/*
  Dohvata sva obavestenja koja se odnose na predmete
*/
router.route('/dohvatiObavestenjaPredmeta').get((req, res) => {
    obavestenja_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Funkcija koju koriste zaposleni, sluzi za azuririranje predmeta,
  zaposlenom je onemoguceno da menja naziv predmeta, broj espb poena, fond casova...
  To je uradjeno prosto da se ne bi desilo da nastavnim slucajno promeni tako bitnu informaciju u sred skolske godine
  Ta vrsta izmena dozvoljena je samo administratoru i zamisljeno je da administrator na pocetku godine unese ili izmeni
  takvu vrstu informacija
*/
router.route('/azurirajInfoPredmetZaposleni').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, {
        "cilj": predmet.cilj, "ishod": predmet.ishod, "lab_vezbe": predmet.lab_vezbe, "lab_vezbe_info": predmet.lab_vezbe_info,
        "domaci": predmet.domaci, "domaci_info": predmet.domaci_info, "projekat": predmet.projekat, "projekat_info": predmet.projekat_info,
        "termin_vezbi": predmet.termin_vezbi, "termin_predavanja": predmet.termin_predavanja, "vezbe_grupa": predmet.vezbe_grupa,
        "predavanja_grupa": predmet.predavanja_grupa, "aktivnost_predavanje": predmet.aktivnost_predavanje, "prakticna_nastava": predmet.prakticna_nastava,
        "projekat_poeni": predmet.projekat_poeni, "kolokvijum_poeni": predmet.kolokvijum_poeni, "pismeni_ispit": predmet.pismeni_ispit,
        "usmeni_ispit": predmet.usmeni_ispit, "seminar_poeni": predmet.seminar_poeni
    }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se u nastavnickom meniju i sluzi za brisanje predavanja na osnovu linka, link je prosledjen
  posto je to sigurno jedinstveno za predavanje
*/
router.route('/obrisiPredavanje').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { predavanja: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se u nastavnickom meniju i sluzi za brisanje vezbi na osnovu linka, link je prosledjen
  posto je to sigurno jedinstveno za vezbe
*/
router.route('/obrisiVezbe').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { vezbe: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se u nastavnickom meniju i sluzi za brisanje ispita na osnovu linka, link je prosledjen
  posto je to sigurno jedinstveno za ispit
*/
router.route('/obrisiIspit').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    console.log("usao u brisanje ispita back");
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { ispiti: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se u nastavnickom meniju i sluzi za brisanje laboratorijske vezbe na osnovu linka, link je prosledjen
  posto je to sigurno jedinstveno za laboratorijsku vebzu
*/
router.route('/obrisiLab').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { labvezbe: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Koristi se u nastavnickom meniju i sluzi za brisanje materjala za projekat na osnovu linka, link je prosledjen
  posto je to sigurno jedinstveno za projekat
*/
router.route('/obrisiMaterijalProjekat').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { projekat_materijali: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
router.route('/obrisiMaterijalDomaci').post((req, res) => {
    let link = req.body.link;
    let id = req.body.id;
    predmeti_1.default.updateOne({ "_id": id }, { $pull: { domaci_materijali: { "link": link } } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Azuriranje predmeta kod admina, on jedini u sistemu ima mogucnost da odradi azuriranje svih informacija o predmetu
  Pretpostavlja se da ce on to raditi na pocetku svakog semestra i da nece menjati tako bitne informacije tokom
  samog semestra.
*/
router.route('/azurirajInfoPredmetAdmin').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, {
        "naziv": predmet.naziv, "sifra": predmet.sifra, "tip": predmet.tip, "smer": predmet.smer,
        "tip_studija": predmet.tip_studija,
        "fond_casova": predmet.fond_casova, "espb": predmet.espb, "semestar": predmet.semestar,
        "cilj": predmet.cilj, "ishod": predmet.ishod, "lab_vezbe": predmet.lab_vezbe,
        "lab_vezbe_info": predmet.lab_vezbe_info,
        "domaci": predmet.domaci, "domaci_info": predmet.domaci_info, "projekat": predmet.projekat,
        "projekat_info": predmet.projekat_info, "termin_vezbi": predmet.termin_vezbi,
        "termin_predavanja": predmet.termin_predavanja, "vezbe_grupa": predmet.vezbe_grupa,
        "predavanja_grupa": predmet.predavanja_grupa, "aktivnost_predavanje": predmet.aktivnost_predavanje,
        "prakticna_nastava": predmet.prakticna_nastava, "projekat_poeni": predmet.projekat_poeni,
        "kolokvijum_poeni": predmet.kolokvijum_poeni, "pismeni_ispit": predmet.pismeni_ispit,
        "usmeni_ispit": predmet.usmeni_ispit, "seminar_poeni": predmet.seminar_poeni
    }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Uklanjanje nekog termina za predavanje ukoliko za to ima potrebe
*/
router.route('/obrisiPredavanjeAdmin').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, {
        "predavanja_grupa": predmet.predavanja_grupa
    }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Uklanjanje nekog termina vezbi ako za to ima potrebe
*/
router.route('/obrisiVezbeAdmin').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, {
        "vezbe_grupa": predmet.vezbe_grupa
    }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dohvatanje predmeta na osnivu tipa studija - master ili osnovne studije
*/
router.route('/dohvatiPredmeteNaOsnovuTipaStudija').post((req, res) => {
    let tip_studija = req.body.tip_studija;
    predmeti_1.default.find({ "tip_studija": tip_studija }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json(p);
    });
});
/*
  Student salje zahtev za pracenje nekog predmeta i time postavlja flag na 0
  Tek kada mu administrator odobri pracenje predmeta, flag ce se postaviti na 1
  i time ce student imati pravo da koristi materijale s tog predmeta i da se prijavljuje
  na spiskove za taj predmet
*/
router.route('/zahtevZaPracenjePredmeta').post((req, res) => {
    let id = req.body.id;
    let korime = req.body.korime;
    let z = new zahtevi_1.default({
        "predmet": id,
        "student": korime,
        "flag": 0
    });
    z.save().then((p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funckija koja je namenjena adminu sistema. Dohvata sve prispele zahteve za pracenje na osnovu necijeg
  korisnickog imena. Na taj nacin ce zahtevi na frontu biti sortirani po korisnickom imenu
*/
router.route('/dohvatiZahteveZaPracenje').post((req, res) => {
    let korime = req.body.korime;
    zahtevi_1.default.find({ "student": korime }, (err, z) => {
        if (err)
            console.log(err);
        else
            res.json(z);
    });
});
/*
  Dohvatanje svih pristiglih zahteva za pracenje predmeta koje je potrebno potvrditi
*/
router.route('/dohvatiSveZahteve').post((req, res) => {
    let flag = req.body.flag;
    zahtevi_1.default.find({ "flag": flag }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Funckija koju koristi admin, on postavlja flag na 1 i time omogucava
  studentu da dobije potvrdu da je zapratio taj predmet i da ima mogucnost
  da koristi sve materijale sa predmeta
*/
router.route('/prihvatiZahtevZaPracenje').post((req, res) => {
    let id = req.body.id;
    zahtevi_1.default.updateOne({ "_id": id }, { flag: 1 }, (err, p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funckija koja studentu u njegovu kolekciju dodaje predmet koji prati
*/
router.route('/dodajStudentuPredmet').post((req, res) => {
    let student = req.body.student;
    let predmet = req.body.predmet;
    studenti_1.default.updateOne({ "korime": student }, { $push: { "predmeti": predmet } }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Pravljenje novog spiska - funkcija namenjena profesoru, on ima mogucnost
  da napravi novi spisak i time omoguci studentima da se sa svojih strana
  prijavljuju i salju radove na taj spisak, to su uglavnom prijave za
  odbrane projekata, domacih zadataka, laboratorijskih vezbi...
*/
router.route('/dodajNoviSpisak').post((req, res) => {
    let spisak = req.body.spisak;
    let s = new spiskovi_1.default(spisak);
    s.save().then((p) => {
        res.json({ "poruka": "OK" });
    });
});
/*
  Funkcija koja sluzi za dohvatanje spiskova na osnovu korisnickog imena koji je napravio taj spisak
*/
router.route('/dohvatiMojeSpiskove').post((req, res) => {
    let korime = req.body.korime;
    spiskovi_1.default.find({ "zaposlen": korime }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Zatvaranje spiska, odnosno onemogucavanje studentima da se i dalje prijavljuju na spisak
*/
router.route('/zatvoriSpisak').post((req, res) => {
    let id = req.body.id;
    spiskovi_1.default.updateOne({ "_id": id }, { "status": 'z' }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Dohvata spiskove za konkretni predmet
*/
router.route('/dohvatiSpiskoveZaPredmet').post((req, res) => {
    let id = req.body.id;
    spiskovi_1.default.find({ "predmet": id }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
/*
  Zaposleni ima mogucnost da omoguci ili onemoguci prikaz odredjenog dela stranice za predmet
*/
router.route('/azurirajAktivnostStraniceProjekat').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, { "projekat_aktivna_strana": predmet.projekat_aktivna_strana }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Zaposleni ima mogucnost da omoguci ili onemoguci prikaz odredjenog dela stranice za predmet
*/
router.route('/azurirajAktivnostStraniceLaboratorija').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, { "lab_aktivna_strana": predmet.lab_aktivna_strana }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Zaposleni ima mogucnost da omoguci ili onemoguci prikaz odredjenog dela stranice za predmet
*/
router.route('/azurirajAktivnostStraniceIspiti').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, { "ispit_aktivna_strana": predmet.ispit_aktivna_strana }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
/*
  Zaposleni ima mogucnost da omoguci ili onemoguci prikaz odredjenog dela stranice za predmet
*/
router.route('/azurirajAktivnostStraniceDomaci').post((req, res) => {
    let predmet = req.body.predmet;
    predmeti_1.default.updateOne({ "_id": predmet._id }, { "domaci_aktivna_strana": predmet.domaci_aktivna_strana }, (err, p) => {
        if (err)
            console.log(err);
        else
            res.json({ "poruka": "OK" });
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map