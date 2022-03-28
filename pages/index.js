import { useState } from "react"
import WalletModal from '../components/WalletModal'

export default function Home() {
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /// Handle input values
  const handleChange = (event) => {
    const re = /^[0-9.\b]+$/;
    const name = event.target.name;
    const value = event.target.value;

    if (value === '' || re.test(value)) {
      if (name === 'nep') {
        setInputs({nep: value, busd: (value * 3).toFixed(2)})
      } else {
        setInputs({nep: (value / 3).toFixed(2), busd: value})
      }
    }
  }

  const handleModal = (event) => {
    event.preventDefault();
    handleShow();
  }

  return (
    <div className="App">
      <WalletModal show={show} handleClose={handleClose} handleChange={handleChange}/>

      <div className="container-fluid">
        <div className="mb-3">
          <h1 className="text-primary">Kyle Wilson</h1>
        </div>
        <div className="header-container">
          <p className="header gradient-text mb-5">Crypto Converter</p>
          <form onSubmit="#" className="px-4">
            <div className="row mb-3 justify-content-center ">
              <div className="col-lg-5">
                <label htmlFor="nep" className="form-label">NEP</label>
                <input 
                  type="text" 
                  className="form-control border-primary" 
                  placeholder="0.00" 
                  id="nep" 
                  name="nep" 
                  value={inputs.nep || ""} 
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>
              <i className="bi bi-currency-exchange text-light" style={{ fontSize: 40 }}></i>
            </p>
            <div className="row mb-5 justify-content-center">
              <div className="col-lg-5">
                <label htmlFor="busd" className="form-label">BUSD</label>
                <input 
                  type="text" 
                  className="form-control border-primary" 
                  placeholder="0.00" 
                  id="busd" 
                  name="busd" 
                  value={inputs.busd || ""} 
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-center pt-5">
              <div className="col-lg-8">
                <button onClick={handleModal} className="cta-button connect-wallet-button">
                  Check Wallet Details
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="footer-container">
        </div>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  )
}
