import React from 'react'
import styled from 'styled-components'
import { colors } from '..'

function Header({ searchInput, setSearchInput }) {
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <ReturnDiv colors={colors}>
      <Logo>
        <img src="/svg/ChOfStarWars_logo.svg" alt="Characters of Star Wars Logo" />
      </Logo>
      <Form onSubmit={e => e.preventDefault()}>
        <ControlledInput colors={colors} type="text" value={searchInput} onChange={handleInput} placeholder='Search' />
      </Form>
    </ReturnDiv>
  )
}

export default Header

const ReturnDiv = styled.div`
  background-image: ${({ colors }) => (
    `linear-gradient(120deg, ${colors.blue2}99, 10%, ${colors.black}00, 90%, ${colors.red}66)`
  )};
`
const Logo = styled.div`
  padding: 82px 0;
`
const Form = styled.form`
  margin-bottom: 60px;
`
const ControlledInput = styled.input`
  all: unset;
  width: 100%;
  background-color: ${ ({ colors }) => colors.lightSaberWhite };
  padding: 0.5em 0;
  font-weight: 600;
  box-shadow: 0px 0px 31px ${ ({ colors }) => colors.blue };
`