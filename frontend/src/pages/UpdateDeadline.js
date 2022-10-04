// This component deals with updating a single deadline

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeadlineContext } from '../hooks/useDeadlineContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const UpdateDeadline = () => {
    const { dispatch } = useDeadlineContext();
    const { user } = useAuthContext();
    const location = useLocation();
    const { oldDeadline } = location.state;
    const navigate = useNavigate();

    // keep track of all relevant details with states
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    // use this state to display errors
    const [error, setError] = useState(null);

    // this function handles a submission after the form is filled out
    const handleSubmit = async function(e) {
        // prevent default so that page does not refresh after submitting form
        e.preventDefault();

        // check if the user is actually logged in before submitting
        if (!user) {
            setError('You must be logged in to update a deadline');
            return;
        }

        // create a deadline object containing all the information we want
        // we only include information that has been filled out on the form

        // first make sure at least one input field was actually changed
        if (title === '' && date === '' && description === '') {
            setError('No updates were requested');
            return;
        }

        let newDeadline = {};

        if (title !== '') {
            newDeadline['title'] = title;
        }

        if (date !== '') {
            newDeadline['date'] = date;
        }

        if (description !== '') {
            newDeadline['description'] = description;
        }

        const response = await fetch('/api/deadline/' + oldDeadline._id, {
            method: 'PATCH',
            body: JSON.stringify(newDeadline),
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
            // since our PATCH request worked, we reset the form in case another update needs to be made
            setTitle('');
            setDate('');
            setDescription("");
            setError(null);

            // delete the old deadline from the local context
            dispatch({ type: 'DELETE_DEADLINE', payload: json });

            // send user back to homepage after updating
            navigate('/');
        }
    };

    return (
        <form className="create-deadline-form" onSubmit={handleSubmit}>
            <Link to="/">Return</Link>
            <h3>Update Deadline</h3>

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

            <button>Update Deadline</button>
            {error && <div>{error}</div>}
        </form>
     );
}
 
export default UpdateDeadline;