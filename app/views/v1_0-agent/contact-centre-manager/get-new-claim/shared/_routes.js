const express = require('express');
const router = express.Router();

const BASE_PATH = 'v1_0-agent/contact-centre-manager/get-new-claim/shared';
const ABS_BASE_PATH = `/${BASE_PATH}`;
const STAGE_PATH = 'v1_0-agent/contact-centre-manager/get-new-claim';

// router.get('/', function (req, res) {
//   res.redirect(`${ABS_BASE_PATH}/nino`);
// })

router.post('/nino-search', function (req, res) {
    let data = req.session.data;

    if (data['stage'] == '1') {
        res.redirect(`${STAGE_PATH}/1/claim`);

    } else if(data['stage'] == '2') {
        res.redirect(`${STAGE_PATH}/2/claim`);
        
    } else {
        res.redirect('claim');
    }
    
});

module.exports = router;
