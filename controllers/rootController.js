import { fileURLToPath } from 'url';
import path from 'path';


// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renderAbout = async (req, res) => {
    try {
        res.render('about');
    } catch (error) {
        res.status(404).send('page not found');
    }
};

const renderContact = async (req, res) => {
    try {
        res.render('contact');
    } catch (error) {
        res.status(404).send('page not found');
    }
};

const renderPrivacyPolicy = async (req, res) => {
    try {
        res.render('privacy-policy');
    } catch (error) {
        res.status(404).send('page not found');
    }
};

const renderAdsTxt = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'ads.txt'));
    } catch (error) {
        res.status(404).send('page not found');
    }
};

const renderRobotTxt = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'robots.txt'));
    } catch (error) {
        res.status(404).send('page not found');
    }
};


const renderSitemap = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'sitemap.xml'));
    } catch (error) {
        res.status(404).send('page not found');
    }
};



export {renderAbout, renderContact, renderPrivacyPolicy, renderAdsTxt, renderRobotTxt, renderSitemap}