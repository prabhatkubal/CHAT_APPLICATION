import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
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
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../../gql/mutations/auth/signupUser";
import { Login } from "../../../constants/paths";

interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [signupUser, { loading: signupLoading, error: signupError }] =
    useMutation(SIGNUP_USER);

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
    signupUser({
      variables: {
        ...state,
      },
    })
      .then((response) => {
        const data = response.data.signup;
        // Handle the response data
        if (data.success) {
          // Signup successful, redirect to login with success message
          router.push({
            pathname: Login,
            query: {
              message: "You have successfully registered. Please login.",
            },
          });
        } else {
          // Handle the error response
          setMessage(data.message);
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
        <Button onClick={handleSubmit}>Signup</Button>
        <Description>
          <Link href="/account/login">&larr; Already a Member Login</Link>
        </Description>
      </Main>
    </Container>
  );
}
