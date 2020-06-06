import { sparqlConnect, setQueryURL } from "sparql-connect";
import React, {useState } from "react";
import Card from "../Card";
import CircularProgress from "@material-ui/core/CircularProgress";

//Set the sparql endpoint (should be done once for the whole application)
setQueryURL("https://query.wikidata.org/sparql");

const keyword = "Ghost";

//Write a query that returns some resources with the additional field `label`
const query = `
PREFIX p: <http://www.wikidata.org/prop/> 
PREFIX pq: <http://www.wikidata.org/prop/qualifier/> 
PREFIX ps: <http://www.wikidata.org/prop/statement/> 
PREFIX wikibase: <http://wikiba.se/ontology#> 
PREFIX bd: <http://www.bigdata.com/rdf#> 
PREFIX wd: <http://www.wikidata.org/entity/> 
PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
SELECT DISTINCT ?title ?sortie (group_concat(?genreLabel;separator=" / ") as ?genre) ?realLabel ?distributeurLabel ?img
WHERE {
        ?filmIri wdt:P31 wd:Q11424.
        ?filmIri wdt:P1476 ?title.
          ?filmIri wdt:P136 ?genre; 
                   wdt:P57 ?real;
                   wdt:P750 ?distributeur;
                   wdt:P18 ?img .
          ?filmIri p:P577 [ 
            ps:P577 ?sortie ;
            pq:P291 wd:Q142 
          ]
        SERVICE wikibase:label { 
          bd:serviceParam wikibase:language "fr". 
          ?genre rdfs:label ?genreLabel .
          ?real rdfs:label ?realLabel .
          ?distributeur rdfs:label ?distributeurLabel .
        }
}
group by ?title ?realLabel ?distributeurLabel ?img ?sortie
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
