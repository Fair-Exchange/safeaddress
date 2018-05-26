import React, { Component } from 'react';
import { Grid, Row, Col }   from 'react-bootstrap';

import website from "../website.png";
import blogger from "../blogger.png";
import forum from "../forum.png";
import github from "../github.png";
import facebook from "../facebook.png";
import twitter from "../twitter.png";
import telegram from "../telegram.png";
import discord from "../discord.png";
import bitcointalk from "../bitcointalk.png";
import youtube from "../youtube.png";
import reddit from "../reddit.png";

export default class Footer extends Component {
    render() {
        return (
            <Grid fluid={true} id="footer">
                <br />
                <Row>
                    <Col md={12} className="footerSocialWrap">
                        <ul className="footerSocial">
                            <li>
                                <a href="https://safecoin.org">
                                    <img src={website} alt="website"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Fair-Exchange">
                                    <img src={github} alt="github"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/safecoins">
                                    <img src={twitter} alt="twitter"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/wvteEF3">
                                    <img src={discord} alt="discord"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://bitcointalk.org/index.php?topic=2838370">
                                    <img src={bitcointalk} alt="bitcointalk"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/SafeCoins/">
                                    <img src={reddit} alt="reddit"/>
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <p className="footerCopyright">
                            If you have any question or suggestion, email me
                            <a href="https://gmail.com/fair-exchange@protonmail.com">fair-exchange@protonmail.com</a> or find me on slack/discord/telegram
                             <a href="https://twitter.com/@SafeCoins">@SafeCoins</a>.
							 <br>
							Express your gratitude for the wallet! <a href="https://safe.lucky-mining.com.ua/">Go to the Lucky-Mining pool.</a>
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
