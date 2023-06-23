import Link from 'next/link'
import { Container, Main, Title, Description } from '../../styles/sharedstyles'

export default function Home() {
  return (
    <Container>
      <Main>
        <Title>Home Page</Title>
        <Description>
          <Link href="/">&larr; Go Back</Link>
        </Description>
      </Main>
    </Container>
  )
}
