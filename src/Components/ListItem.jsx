import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '..'

function ListItem({ character }) {
  const [open, setOpen] = useState(false);
  const { name, birth_year, hair_color, gender } = character;

  const handleNameClick = e => {
    setOpen(!open);
  }

  return (
    <li>
      <ItemWrapper colors={colors} open={open}>
        <Name onClick={handleNameClick} colors={colors}>{name}</Name>
        <TableWrapper className={ open ? 'showTable' : '' }>
          <Table>
            <tbody>
              <tr>
                <td>Birth year:</td>
                <td>{birth_year}</td>
              </tr>
              <tr>
                <td>Hair color:</td>
                <td>{hair_color}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{gender}</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </ItemWrapper>
    </li>
  )
}

export default ListItem

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ ({ open, colors }) => (
    open ?
    colors.black :
    colors.black + '00'
  )};
  .showTable {
    height: 7rem;
  }
  box-shadow: ${ ({ open, colors }) => (
    open ?
    `0px 0px 24px ${colors.darkGray}` :
    'none'
  )};
  transition: box-shadow 300ms ease, background-color 300ms ease;
`
const Name = styled.button`
  all: unset;
  background-color: ${ ({ colors }) => colors.black };
  cursor: pointer;
  margin: 1.4rem 0;
`
const TableWrapper = styled.div`
  width: 20rem;
  max-width: 80%;
  height: 0;
  overflow-y: hidden;
  transition: height 300ms ease;
`
const Table = styled.table`
  width: 100%;
  td {
    width: 50%;
    padding: 0 0.6rem;
  }
  tr > td:first-of-type {
    text-align: right;
  }
  tr > td:last-of-type {
    font-weight: 300;
    text-align: left;
  }
`