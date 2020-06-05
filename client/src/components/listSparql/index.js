import { sparqlConnect, setQueryURL } from "sparql-connect";
import React from 'react';

//Set the sparql endpoint (should be done once for the whole application)
setQueryURL("https://query.wikidata.org/sparql");

//Write a query that returns some resources with the additional field `label`
const query = `
PREFIX p: <http://www.wikidata.org/prop/> 
PREFIX pq: <http://www.wikidata.org/prop/qualifier/> 
PREFIX ps: <http://www.wikidata.org/prop/statement/> 
PREFIX wikibase: <http://wikiba.se/ontology#> 
PREFIX bd: <http://www.bigdata.com/rdf#> 
PREFIX wd: <http://www.wikidata.org/entity/> 
PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
SELECT DISTINCT ?titleLabel ?sortie ?genreLabel ?real ?distributeur ?img
WHERE {
        ?filmIri wdt:P31 wd:Q11424.
        ?filmIri wdt:P1476 ?title;
                 wdt:P136 ?genre;
                 wdt:P57 ?real;
                 wdt:P750 ?distributeur;
                 wdt:P18 ?img .          ?filmIri p:P577 [ 
            ps:P577 ?sortie ;
            pq:P291 wd:Q142 
          ]        SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }
}
ORDER BY ASC(?titleLabel) 
LIMIT 100
`;
//Create a connector to populate the component with the results
const connector = sparqlConnect(query, {
    queryName: 'results',
  })

//Write a component assuming the query results will be available as a prop
//named `results`
function ResourcesList({ results }) {
  return (
    <>
      <ul>
        {results.map(({ resource, label }) => (
          <li key={resource}>{label}</li>
        ))}
      </ul>
    </>
  );
}

//Connect the query to your component
export default connector(ResourcesList);
