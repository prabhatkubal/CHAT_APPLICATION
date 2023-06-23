import Link from 'next/link'
import { Container, Main, Title, Description } from '../../../styles/sharedstyles'
import Login from '../../../components/Auth/Login/Login'

export default function LoginPage() {
  return (
    <Container>
      <Login />
    </Container>
  )
}
