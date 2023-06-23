import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import {
  Container,
  Main,
  Title,
  Description,
} from "../../../styles/sharedstyles";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import InfoMessage from "../../Common/InfoMessage";

interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [message, setMessage] = useState<string | null>(null);

  const [state, setState] = useState<SignupState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted value:", state);
    axios
      .post("http://localhost:4000/account/signup", state, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        // Handle the response data
        if (data.success) {
          // Signup successful, redirect to login with success message
          router.push({
            pathname: "/account/login",
            query: {
              message: "You have successfully registered. Please login.",
            },
          });
        } else if (!data.success && data.errors) {
          // Handle the error response
          setMessage(data.errors.message);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <Container>
      <Main>
        <Title>Welcome to My Chat Application</Title>
        {message && <InfoMessage message={message} />}
        <Input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={state.name}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="text"
          name="email"
          placeholder="Enter your Email"
          value={state.email}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="password"
          name="password"
          placeholder="create your password"
          value={state.password}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="confirm your password"
          value={state.confirmPassword}
          onChange={(e) => handleInputChange(e)}
        />
        <Button onClick={handleSubmit}>
          <Link href="/account/signup">Signup</Link>
        </Button>
        <Description>
          <Link href="/account/login">&larr; Already a Member Login</Link>
        </Description>
      </Main>
    </Container>
  );
}
