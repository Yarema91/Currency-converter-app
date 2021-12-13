import React from 'react'

const CurrencyField = ({ label, name, currency, value, setValue, rates, fromBase }) => {
  return (
    <div className="input-wrapper p--relative d--inlineBlock" tabIndex="1">
      <div className="currency-flag d--flex a--center">
        <img src={`./img/${currency}.png`} alt={currency} />
        <span className="fw--medium">{currency}</span>
      </div>
      <label htmlFor={name} className="fw--medium">
        {label}
      </label>

      {/* <select className="form-select" aria-label="Default select example">
        <option selected>{fromBase}</option>
        console.log('currency', currency);
       rates.map(rate => { return 
       console.log(rate)});
        

        

        <option value="1">{value.from}One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select> */}


      <input
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue((value = e.target.value))}
        className="fw--medium"
      />
    </div>
  )
}

export default CurrencyField
