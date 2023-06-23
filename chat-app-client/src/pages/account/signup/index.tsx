import Link from 'next/link'
import { Container, Main, Title, Description } from '../../../styles/sharedstyles'
import Signup from '../../../components/Auth/Signup/Signup'

export default function SignupPage() {
  return (
    <Container>
      <Signup />
    </Container>
  )
}
