import { useState, useEffect } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

const Footer = () => {
  const developerEmails = ['mer.code.99@gmail.com', 'john.doe@gmail.com', 'jane.doe@gmail.com'];
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    setFooterHeight(document.getElementById('footer').clientHeight);
  }, []);

  return (
    <div style={{ paddingBottom: footerHeight }}>
      <Segment inverted vertical id='footer'>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <p>About Us</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec augue at lectus mollis posuere.</p>
              </Grid.Column>
              <Grid.Column width={8} textAlign='center'>
                <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
              </Grid.Column>
              <Grid.Column width={4} textAlign='right'>
                <p>Developed by:</p>
                <ul>
                  {developerEmails.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
};

export default Footer;
