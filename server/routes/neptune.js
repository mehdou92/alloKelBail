const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get("/insert-data-graph", async function(req, res) {
    const insertQuery =
      "INSERT DATA { GRAPH <http://sandbox.bordercloud.com/genealogie> { <http://sandbox.bordercloud.com/celebrity> <http://sandbox.bordercloud.com/views> 1 } }";
    await fetch("https://sandbox.bordercloud.com/sparql?update=" + insertQuery, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from("ESGI-WEB-2020:ESGI-WEB-2020-heUq9f").toString("base64"),
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
    const selectQuery =
      "SELECT ?v WHERE { GRAPH <http://sandbox.bordercloud.com/genealogie> { <http://sandbox.bordercloud.com/celebrity> <http://sandbox.bordercloud.com/views> ?v . } }";
    const data = await fetch(
      "https://sandbox.bordercloud.com/sparql?query=" + selectQuery,
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("ESGI-WEB-2020:ESGI-WEB-2020-heUq9f").toString("base64"),
          "Content-type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log(err));
    return res.send(data);
});

module.exports = router;