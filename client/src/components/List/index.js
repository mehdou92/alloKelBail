import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid/Grid";
import Card from '../Card';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const List = props => {

    const classes = useStyles();

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    requestGet(props.location.state.query);
  }, []);

  const requestGet = async keyword => {
    console.log("keyword", keyword);
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
      }
      ?filmIri wdt:P31 wd:Q11424 ;
               wdt:P1476  ?title ;
               wdt:P136 ?genre;
               wdt:P57 ?real.
      ?filmIri wdt:P18 ?img .
      ?filmIri p:P577 [ 
               ps:P577 ?sortie ;
               pq:P291 wd:Q142 
      ]
      SERVICE wikibase:label { 
        bd:serviceParam wikibase:language "fr,en". 
        ?genre rdfs:label ?genreLabel .
        ?real rdfs:label ?realLabel .
      }
    }
    group by ?title ?realLabel ?img ?sortie ?label
    having (count(?genre) > 2) 
    LIMIT 100
      `;

    try {
      const response = await axios.get(`https://query.wikidata.org/sparql`, {
        params: {
          query: query
        }
      });
      setLoading(false);
      setResult(response.data.results.bindings)
    } catch (error) {
    setLoading(false);
    setError('fetch failed');
    console.error(error);
    }
  };

  const displayCardMovie = (data) => {
        let tmpTab = [];
        data.forEach(element => {
            console.log('element map', element);
            tmpTab.push(<Card title={element.title.value} plot={element.Plot} poster={element.img.value} genre={element.genre.value} timer={element.realLabel.value} year={element.sortie.value} rate={element.imdbRating} />)
        });
        return tmpTab;
}


  if (loading) {
    return <CircularProgress />;
  }

  if (error !== '') {
    return <p>ERROR: {error}</p>;
  }

  return (<>
  {(result.length === 0) ? <span>0 result</span> :   <Grid container spacing={3}>
                            {displayCardMovie(result)}
                        </Grid>}

  
  </>);
};

export default List;
