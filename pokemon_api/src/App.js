import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from 'axios'
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [ currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=807")
  // const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState()


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res =>  {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }


  if (loading) return "Loading...."

  return (
  <>
    <PokemonList pokemon={pokemon}/>
    <Pagination
      gotoNextPage={ nextPageUrl ? gotoNextPage : null} 
      gotoPrevPage={ prevPageUrl ? gotoPrevPage : null}
    />
  </>
  );
}

export default App;
