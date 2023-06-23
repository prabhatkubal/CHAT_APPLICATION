import Head from 'next/head'
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from '../styles/sharedstyles'
import Login from '../components/Auth/Login/Login'

export default function Home() {
  return (
    <Container>
      <Login />
    </Container>
  )
}
