import React,{useState} from 'react';

const MaxButton = (amount, function, state, vault) => {
    const [amount, setAmount] = useState();

    const setMax = () => {
        setIsMax(true);
        if (
          props.vaults[vault.name].user_balance > 0 &&
          props.vaults[vault.name].user_balance < 1
        ) {
          setDeposit(props.vaults[vault.name].user_balance);
        } else if (props.vaults[vault.name].user_balance > 1) {
          setDeposit(props.vaults[vault.name].user_balance.toFixed(6));
        }
      };
      const clear = () => {
        setIsMax(false);
    
        setDeposit(0);
      };

    return (
        <>
            {deposit > 0 || isMax ? (
          <button className="max-button" onClick={clear}>
            clear
          </button>
        ) : (
          <button className="max-button" onClick={setMax}>
            max
          </button>
        )}
        </>
    );
}

export default MaxButton;
