import React, { useState } from 'react';

function Welcome() {

    const [selected, setSelected] = useState([]);

    const handleCheckbox = () => {
        setSelected();
    }

    const checkboxes = [
        'I feel great!', 
        'A little tired', 
        'Sore or achy', 
        'Feeling under the weather',
        'Stressed or overwhelmed'
    ]

    return(
        <>
            <h1>Hey Name, glad you're here! Let's check in: <br />
            how are you feeling today?</h1>

        <div>
            <input 
                type="range"
                min="1"
                max="5"
            />
        </div>

            {checkboxes.map(checkbox => (
                <label key={checkbox}>
                <input 
                    type="checkbox" 
                    value={checkbox}
                    onChange={handleCheckbox}
                    checked={selected.includes(checkbox)}
                /> {checkbox}
            </label>
            ))}
        </>
    )
}

export default Welcome;