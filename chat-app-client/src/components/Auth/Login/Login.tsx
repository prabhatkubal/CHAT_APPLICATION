import { useState } from "react";
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

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { message } = router.query;
  const formattedMessage = Array.isArray(message)
    ? message.join(", ")
    : message;

  const handleInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted value:", state);
    axios
      .post("http://localhost:4000/account/login", state, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        // Handle the response data
        if (data.success) {
          localStorage.setItem("user_details", JSON.stringify(data.user));
          // Signup successful, redirect to login with success message
          localStorage.setItem("isAuthorised", "true");
          router.push({
            pathname: "/chat",
          });
        } else if (!data.success && data.errors) {
          // Handle the error response
          console.log(data.errors.message);
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
        {formattedMessage && <InfoMessage message={formattedMessage} />}
        <Input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={state.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit}>
          <Link href="/account/login">Login</Link>
        </Button>
        <Description>
          <Link href="/account/signup">&larr; Not a Member Signup</Link>
        </Description>
      </Main>
    </Container>
  );
}
