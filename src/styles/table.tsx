'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { RiCloseLine } from 'react-icons/ri'

export const Table = styled.table`
  display: block;
  border-collapse: collapse;
  max-width: 90%;
  max-height: 475px;
  margin: 0 auto;
  overflow: scroll;
  color: var(--gray);

  tbody tr:nth-child(odd) {
    background: #f2f2f2;
  }

  tbody tr:hover {
    background: lightgrey;
  }

  th {
    text-transform: uppercase;
  }

  td,
  th {
    text-align: left;
    padding: 0.7rem;
    border: 1px solid #ddd;
  }
`

export const OrderLink = styled(Link)`
  background: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
`

export const Cross = styled(RiCloseLine)`
  color: red;
  font-size: 1.5rem;
`
