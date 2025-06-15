import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail = ({ email }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Kokoro - You're on the waitlist!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Kokoro! 🎉</Heading>
          <Text style={text}>
            Thank you for joining our waitlist! We're excited to have you on board.
          </Text>
          <Text style={text}>
            We're building something special - a human-first CRM that helps you keep track of the people you care about.
          </Text>
          <Text style={text}>
            We'll keep you updated on our progress and let you know as soon as we're ready to launch.
          </Text>
          <Text style={text}>
            Best regards,<br />
            The Kokoro Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const h1 = {
  color: '#000000',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  padding: '17px 0 0',
};

const text = {
  color: '#000000',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '16px 0',
};

export default WelcomeEmail; 