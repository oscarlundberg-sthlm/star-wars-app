import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '..'
import ListItem from './ListItem'

function List({ searchInput }) {
  const [nextPage, setNextPage] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [showLoader, setShowLoader] = useState(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const listRef = useRef(null);

  const fetchMore = useCallback(
    async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setShowLoader(true);

      let data;
      try {
        data = await (await fetch(nextPage, { signal })).json();
        
        if (!data) {
          return;
        }
        
        let charactersTemp = [...characters, ...data.results];
        
        let indexing = -1;
        
        charactersTemp = charactersTemp.map(v => {
          indexing++;
          return {...v, indexing};
        })
        
        setCharacters(charactersTemp);
        setShowLoader(false);
        setNextPage(data.next);
      } catch (error) {
        console.error(error);
        if (signal.aborted) {
          console.error(error.message);
        }
      }
    },
    [nextPage],
  )

  const handleScroll = () => {
    let scroll = Math.round(listRef.current.scrollTop);
    let bottom = listRef.current.scrollHeight - listRef.current.clientHeight;
    console.log(scroll, bottom);
    if (scroll === bottom && nextPage) {
      fetchMore();
    }
  }

  useEffect(() => {
    setScrollHeight(listRef.current.scrollHeight);
    setClientHeight(listRef.current.clientHeight);
  }, [characters]);

  useEffect(() => {
    if (scrollHeight === clientHeight && nextPage) {
      fetchMore();
      setScrollHeight(listRef.current.scrollHeight);
      setClientHeight(listRef.current.clientHeight);
    }
  }, [scrollHeight, clientHeight, fetchMore, nextPage])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchAndSetCharacters = async () => {
      let isSearch = searchInput.length > 0 ? true : false;
  
      let url = 
        isSearch ?
        `https://swapi.dev/api/people/?search=${searchInput}` :
        'https://swapi.dev/api/people';
  
      setShowLoader(true);
      
      let data;
      try {
        data = await (await fetch(url, { signal })).json();
        
        if (data.count === 0) {
          setShowLoader(false);
        }
        
        let charactersTemp = [...data.results];
        
        let indexing = -1;
        
        charactersTemp = charactersTemp.map(v => {
          indexing++;
          return {...v, indexing};
        })
        
        setCharacters(charactersTemp);
        setNextPage(data.next);
        setShowLoader(false);
      } catch (error) {
        if (signal.aborted) {
          console.error(error.message);
        }
        console.error(error);
      }
    };
    fetchAndSetCharacters();

    return () => {
      controller.abort();
    }
  }, [searchInput]);

  return (
    <ReturnDiv ref={listRef} onScroll={handleScroll} colors={colors}>
      <ul>
        {
          characters.map(character => (
            <ListItem key={character.indexing} character={character} />
          ))
        }
      </ul>
      {
        showLoader ?
        <div className="loading"></div> :
        null
      }
    </ReturnDiv>
  )
}

export default List

const ReturnDiv = styled.div`
  background-color: ${ ({ colors }) => colors.black };
  flex-grow: 1;
  color: ${ ({ colors }) => colors.lightGray };
  overflow-y: scroll;
  ul {
    all: unset;
    list-style-type: none;
  }
  ul > li:first-of-type {
    margin-top: 1.4rem;
  }
  ul > li:last-of-type {
    margin-bottom: 1.4rem;
  }
`