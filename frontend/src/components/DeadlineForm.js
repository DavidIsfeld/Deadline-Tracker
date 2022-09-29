// this file contains a form which allows users to create new deadlines via a POST request

import { useState } from 'react';
import { useDeadlineContext } from '../hooks/useDeadlineContext';
import { useAuthContext } from '../hooks/useAuthContext';

const DeadlineForm = () => {
    // keep track of all relevant details with states
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('An upcoming deadline.');
    const { dispatch } = useDeadlineContext();
    const { user } = useAuthContext();
    // use this state to display errors
    const [error, setError] = useState(null);


    // this function handles a submission after the form is filled out
    const handleSubmit = async (e) => {
        // prevent default so that page does not refresh after submitting form
        e.preventDefault();

        // check if the user is actually logged in before submitting
        if (!user) {
            setError('You must be logged in to create a deadline');
            return;
        }

        // create a deadline object containing all the information we want
        const deadline = {title, date, description};

        // make a post reques using this deadline
        const response = await fetch('/api/deadline/', {
            method: 'POST',
            body: JSON.stringify(deadline),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            // since our POST request worked, we reset the form so another deadline can be created
            setTitle('');
            setDate('');
            setDescription("An upcoming deadline");

            // set the deadline context to include the new deadline
            dispatch({ type: 'CREATE_DEADLINE', payload: json });
        }
    };
    

    return ( 
        <form className="create-deadline-form" onSubmit={handleSubmit}>
            <h3>Add a New Deadline</h3>

            <label>Deadline Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            
            <label>Deadline Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description}>
            </textarea>

            <label>Deadline Date</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />

            <button>Add Deadline</button>
            {error && <div>{error}</div>}
        </form>
     );
}
 
export default DeadlineForm;