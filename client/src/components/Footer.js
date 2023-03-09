import { useState, useEffect } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

const Footer = () => {
  const developerEmails = ['mer.code.99@gmail.com', 'jaredkim011@gmail.com', 'ryanstreet122@gmail.com', 'john.weaver94@utexas.edu'];
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    setFooterHeight(document.getElementById('footer').clientHeight);
  }, []);

  return (
    <div style={{ paddingTop: footerHeight }} className="footer_section">
      <Segment inverted vertical id='footer' >
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row className='footer_sub'>
              <Grid.Column width={6} textAlign='left'>
                <p>About Us</p>
                <p>The four developers for Gitfund are the amazing Merrin Abraham, Jared Kim, Ryan Street, and John Weaver.
                    We are graduates of the UT Web Development Boot Camp with aspiatrions of working in the tech industry.
                    We have all discovered a passion for coding and are excited to continue learning and growing in this field.
                    I hope this project shows our dedication to learning, our ability to work together as a team, and our
                    potential as developers. Please enjoy GitFund!</p>
              </Grid.Column>
              <Grid.Column width={4} textAlign='center'>
                <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
              </Grid.Column>
              <Grid.Column width={6} textAlign='right'>
                <p>Developed by:</p>
                <ul>
                  {developerEmails.map((email) => (
                    <p key={email}>{email}</p>
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
