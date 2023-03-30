import clsx from 'clsx'
import React from 'react'
import { Container } from 'react-bootstrap'
import NewUserForm from './components/NewUserForm'
import styles from "./NewUser.module.scss"

function NewUser() {
  return (
    <Container className={clsx('p-4',styles.wrapper)}>
      <NewUserForm/>
    </Container>
  )
}

export default NewUser