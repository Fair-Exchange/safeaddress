import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Radio }
                            from 'react-bootstrap';
import { QRCode }           from 'react-qr-svg';
import safecoinjs            from 'safecoinjs';

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'T',
            priv: '',
            wif: '',
            addr: ''
        };
    }

    genTAddress() {
        const priv      = safecoinjs.address
            .mkPrivKey(this.props.entropy + new Date().getTime());
        const privWIF   = safecoinjs.address.privKeyToWIF(priv, true);
        const pubKey    = safecoinjs.address.privKeyToPubKey(priv, true);
        const znAddr    = safecoinjs.address.pubKeyToAddr(pubKey);

        this.setState({
            priv: priv,
            wif: privWIF,
            addr: znAddr
        });
    }

    genZAddress() {
        const z_secretKey   = safecoinjs.zaddress
            .mkZSecretKey(this.props.entropy + new Date().getTime());
        const spendingKey   = safecoinjs.zaddress
                                .zSecretKeyToSpendingKey(z_secretKey);
        const a_pk          = safecoinjs.zaddress
                                .zSecretKeyToPayingKey(z_secretKey);
        const pk_enc        = safecoinjs.zaddress
                                .zSecretKeyToTransmissionKey(z_secretKey);
        const Zaddress      = safecoinjs.zaddress.mkZAddress(a_pk, pk_enc);

        this.setState({
            priv: z_secretKey,
            wif: spendingKey,
            addr: Zaddress
        });
    }

    handleCheckRadio(type) {
        this.setState({
            type: type,
            priv: '',
            wif: '',
            addr: ''
        });
    }

    getZpriv() {
        if (this.state.type === 'Z')
            return("private key: " + this.state.priv);
    }

    render() {
        return (
            <Col md={12} id="Single">
                <hr />
                <Row className="r1">

                    <Col md={4}>
                        <FormGroup>
                            <Radio name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('T')}
                            checked={this.state.type === 'T'} inline>
                                T Address
                            </Radio>
                            <br />
                            <Radio name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('Z')}
                            checked={this.state.type === 'Z'} inline>
                                Z Address
                            </Radio>
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <Button onClick={this.state.type === 'T' ?
                            () => this.genTAddress()
                            : () => this.genZAddress()}
                        >
                            Generate a new wallet
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={window.print}>
                            Print
                        </Button>
                    </Col>
                </Row>
                <hr />
                {this.state.addr ? (
                    <Row className="r2">
                        <Col md={3} className="max-width singleTabs col-sm-offset-3">
                            <h1 style={{color:'green'}}>Public</h1>
                            <h3>Safe Address</h3>
                            <div>
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    style={{ width: 200 }}
                                    value={this.state.addr}
                                />
                            </div>
                            <div className="safetabcode">
                                {this.state.addr}
                            </div>
                        </Col>
                        <Col md={3} className="max-width singleTabs">
                            <h1 style={{color:'red'}}>Secret</h1>
                            <div>
                                {this.state.type === 'T' ? (
                                    <h3>Private Key</h3>
                                ) : (
                                    <h3>Spending Key</h3>
                                )}
                                <div>
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 200 }}
                                        value={this.state.wif}
                                    />
                                </div>
                                <div className="safetabcode">{this.state.wif}</div>
                            </div>
                            <p>{this.getZpriv()}</p>
                        </Col>
                    </Row>
                ) : (
                    <Row className="r2 no-padding"></Row>
                )}
                <hr />
                <Row className="r3">
                    <Col>
                        <p>
                            <b>A SafeCoin wallet</b> is as simple as a single pairing of a SafeCoin address with its corresponding SafeCoin private key. You can share your address to receive SAFE payments, however your private key is what allows you to unlock and manage your funds, keep it safe.
                        </p>
                        <p>
                            <b>A T-Address</b> (also known as “transparent address”) is like a classical Bitcoin address and can be seen on the blockchain explorer. 
                        </p>
                        <p>
                            <b>A Z-Address</b> is a private address using a zero-knowledge system to shield the balance and transactions in it from being seen.
                        </p>
                        <p>
                            <b>To safeguard this wallet</b> you must print or otherwise record the SafeCoin address and private key. It is important to make a backup copy of the private key and store it in a safe location. This site does not have knowledge of your private key. If you leave/refresh the site or press the "Generate New Address" button then a new private key will be generated and the previously displayed private key will not be retrievable. Your SafeCoin private key should be kept a secret. Whomever you share the private key with has access to spend all the SAFE associated with that address. If you print your wallet then store it in a zip lock bag to keep it safe from water. Treat a paper wallet like cash.
                        </p>
                        <p>
                            <b>Add funds</b> to this wallet by instructing others to send SAFE to your Safe address.
                        </p>
                        <p>
                            <b>Check your balance</b> by entering your Safe address on one of these explorers :
                        </p>
                        <ul style={{listStyleType: 'none'}}>
                            <li><a href="https://explorer.safecoin.org/">https://explorer.safecoin.org/</a></li>
                        </ul>
                        <p>
                            <b>To spend your SAFE</b> you can download the <a href='https://github.com/Fair-Exchange/safewallet/releases/'>SafeCoin Agama Wallet</a> and import your private key to the p2p client wallet.
                        </p>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Single;
