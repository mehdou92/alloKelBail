import { sparqlConnect, setQueryURL } from "sparql-connect";
import React, {useState } from "react";
import Card from "../Card";
import CircularProgress from "@material-ui/core/CircularProgress";

//Set the sparql endpoint (should be done once for the whole application)
setQueryURL("https://query.wikidata.org/sparql");

const keyword = "Ghost";

//Write a query that returns some resources with the additional field `label`
const query = `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
PREFIX pq: <http://www.wikidata.org/prop/qualifier/> 
PREFIX ps: <http://www.wikidata.org/prop/statement/> 
PREFIX p: <http://www.wikidata.org/prop/> 
PREFIX wd: <http://www.wikidata.org/entity/> 
PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
PREFIX mwapi: <https://www.mediawiki.org/ontology#API/> 
PREFIX bd: <http://www.bigdata.com/rdf#> 
PREFIX wikibase: <http://wikiba.se/ontology#> 
SELECT ?title ?realLabel  ?sortie (group_concat(?genreLabel;separator=" / ") as ?genre)   ?img WHERE {
  SERVICE wikibase:mwapi {
      bd:serviceParam wikibase:endpoint "www.wikidata.org";
                      wikibase:api "EntitySearch";
                      mwapi:search "${keyword}";
                      mwapi:language "fr".
      ?filmIri wikibase:apiOutputItem mwapi:item.
  }  ?filmIri wdt:P31 wd:Q11424 ;
           wdt:P1476  ?title ;
           wdt:P136 ?genre;
           wdt:P57 ?real.
   OPTIONAL{
          ?filmIri wdt:P18 ?img .
  }  ?filmIri p:P577 [ 
           ps:P577 ?sortie ;
           pq:P291 wd:Q142 
  ]  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "fr,en". 
    ?genre rdfs:label ?genreLabel .
    ?real rdfs:label ?realLabel .
  }}
group by ?title ?realLabel ?img ?sortie ?label
having (count(?genre) > 2) 
LIMIT 100
`;
//Create a connector to populate the component with the results
const connector = sparqlConnect(query, {
  queryName: "results"
});

var test = null;

//Write a component assuming the query results will be available as a prop
//named `results`
function ResourcesList({ results }) {

    const [query, setQuery] = useState(null);
    console.log(results);

test = 'titi';

  const displayCardMovie = data => {
    if (!data.hits) {
      let tmpTab = [];
      data.forEach(element => {
        tmpTab.push(
          <Card
            title={element.Title}
            plot={element.Plot}
            poster={element.Poster}
            genre={element.Genre}
            timer={element.Runtime}
            year={element.Year}
            rate={element.imdbRating}
            imdbId={element.imdbID}
          />
        );
      });
      return tmpTab;
    }
  };

  return (
    <>
      {console.log("results query", results)}
      {results ? (
        <ul>
          {results.map(({ resource, label }) => (
            <li key={resource}>{label}</li>
          ))}
        </ul>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

console.log('test', test);

//Connect the query to your component
export default connector(keyword, ResourcesList);
