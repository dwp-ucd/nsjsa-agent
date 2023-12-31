const express = require('express');
const router = express.Router();

const BASE_PATH = 'design-ideas/wt-3771-wfm';
const ABS_BASE_PATH = `/${BASE_PATH}`;

router.get('/', function (req, res) {
  res.redirect(`${ABS_BASE_PATH}/choose-task`);
})

/*router.post('/nino-search', function (req, res) {
    res.redirect('view-claim?scenario=0&task=view&claimant=sh&claimStatus=new-claim');
});
*/

router.post("/nino-search", function (req, res) {
  const answer = req.body.nino;

  // nino invalid
  if (answer === "invalid") {
    res.redirect(`${ABS_BASE_PATH}/nino-search?show=invalid`);

    // duplicate claim
  } else if (answer === "duplicates") {
    res.redirect(`${ABS_BASE_PATH}/duplicates`);

    // claimant not found
  } else if (answer === "claimant") {
    res.redirect(`${ABS_BASE_PATH}/nino-search?show=claimant`);

        // nino not found
  } else if (answer === "") {
    res.redirect(`${ABS_BASE_PATH}/nino-search?show=blank`);

    // nino not found
  } else if (!answer.length) {
    res.redirect(`${ABS_BASE_PATH}/nino-search?show=errors`);
  } else {
    // happy patch view claim - all redirect if other value
      res.redirect(`${ABS_BASE_PATH}/view-claim?task=new&claimant=ij&claimStatus=paused`);
    
  }
});

//Choose task 1 - on hold claims list
  // show different on-hold table for agent 2
router.post("/choose-task1", function (req, res) {
  const answer = req.body.agent;

  // agent 2 claims list
  if (answer === "02") {
    res.redirect(`${ABS_BASE_PATH}/choose-task1?show=02`);

  } else {
    // agent 1 claims list
      res.redirect(`${ABS_BASE_PATH}/choose-task1`);
    
  }
});

//Choose task 2 - on hold claims list
  // show different on-hold table for agent 2
  router.post("/choose-task2", function (req, res) {
    const answer = req.body.agent;
  
    // agent 2 claims list
    if (answer === "02") {
      res.redirect(`${ABS_BASE_PATH}/choose-task2?show=02`);
  
    } else {
      // agent 1 claims list
        res.redirect(`${ABS_BASE_PATH}/choose-task2`);
      
    }
  });

  //Choose task 3 - on hold claims list
  // show different on-hold table for agent 2
  router.post("/on-hold", function (req, res) {
    const answer = req.body.agent;
  
    // agent 2 claims list
    if (answer === "02") {
      res.redirect(`${ABS_BASE_PATH}/on-hold?show=02`);
  
    } else {
      // agent 1 claims list
        res.redirect(`${ABS_BASE_PATH}/on-hold`);
      
    }
  });

  // reset the "find a claimant" data back to defaults when end is got
router.get('/end', function (req, res) {
  let data = req.session.data;


  delete data['nino'];
  delete data['show'];


  res.redirect('choose-task3');
});

  // choose-task 3 reset the 'on hold claims' data back to default agent 1 when 'claimslist' is got
  router.get('/claimslist', function (req, res) {
    let data = req.session.data;
  
  
    delete data['agent'];
    delete data['show'];
  
  
    res.redirect('choose-task3');
  });

  // choose-task 1 and 2 reset the 'on hold claims' data back to default agent 1 when 'reset-list' is got
  router.get('/reset-list', function (req, res) {
    let data = req.session.data;
  
  
    delete data['agent'];
    delete data['show'];
  
  
    res.redirect('screens');
  });
module.exports = router;
