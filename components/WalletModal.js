import { useWeb3React } from "@web3-react/core"
import { formatEther } from '@ethersproject/units'

import { injected } from "./wallet/connectors"
import {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const WalletModal = (props) => {
  const { chainId, account, library, activate, deactivate } = useWeb3React()
  const [walletConnected, setWalletConnected] = useState(false);
  const [blockNumber, setBlockNumber] = useState();
  const [balance, setBalance] = useState();

  async function connect() {
    try {
      await activate(injected);
      setWalletConnected(true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      setWalletConnected(false)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  useEffect(() => {
    if (library && account) {
      let stale = false;
      console.log('fetching block number!!')
      library
        .getBlockNumber()
        .then(blockNumber => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        });
    }
  }, [library, account])

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false
      library
        .getBalance(account)
        .then((bal) => {
          if (!stale) {
            setBalance(bal)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }  
  }, [library, account])

  return (
      <Modal 
        {...props}
        show={props.show} 
        onHide={props.handleClose} 
        backdrop="static" 
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title>Wallet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container was-validated text-center">
          <div className="row justify-content-center">
            <div className="col col-lg-12">
              {walletConnected ? 
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>KEY</th>
                      <th>VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Account</td>
                      <td>{account.slice(0, 5)+" ... "+account.slice(-5)}</td>
                    </tr>
                    <tr>
                      <td>Chain ID</td>
                      <td>{chainId}</td>
                    </tr>
                    <tr>
                      <td>Block Number</td>
                      <td>{blockNumber}</td>
                    </tr>
                    <tr>
                      <td>Balance</td>
                      <td>{balance === null ? 'Error' : balance ? `Ξ ${formatEther(balance)}` : ''}</td>
                    </tr>
                  </tbody>
                </Table>
                : 
                <span className="text-danger">Wallet not connected. Please click the CONNECT button below.</span>
              }
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {walletConnected ?
          <button className="btn btn-danger" onClick={disconnect}>
            Disconnect
          </button>
          :
          <button className="btn btn-primary" onClick={connect}>
            Connect
          </button>
        }
        <button className="btn btn-secondary" onClick={props.handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>      
  );
}

export default WalletModal;