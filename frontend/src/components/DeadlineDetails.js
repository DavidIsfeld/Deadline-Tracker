// this file displays the information contained within each deadline

import { useDeadlineContext } from '../hooks/useDeadlineContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

const DeadlineDetails = ( { deadline } ) => {
    const { dispatch } = useDeadlineContext();
    const { user } = useAuthContext();

    const handleDelete = async () => {
        // make sure we are logged in before trying to delete something
        if (!user) {
            return;
        }

        // make a delete request to the api
        const response = await fetch('/api/deadline/' + deadline._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        // turn the response we get from the delete request into json format
        const json = await response.json();

        // if the request worked, remove the deadline from the local context in the frontend.
        if (response.ok) {
            dispatch({ type: 'DELETE_DEADLINE', payload: json });
        }
    };

    return ( 
        <div className="deadline-details">
            <h3>Deadline: {deadline.title}</h3>
            <p><strong>Description:</strong><br />{deadline.description}</p>
            <p><strong>Deadline: </strong>{format(new Date(deadline.date), 'MMMM d, yyyy')}</p>
            <p><strong>Time Until Deadline: <span id="details-time-left">{formatDistanceToNow(new Date(deadline.date), { addSuffix: true })}</span></strong></p>
            <p><strong>Date Deadline Was Created: </strong>{formatDistanceToNow(new Date(deadline.createdAt), { addSuffix: true })}</p>
            <Link to="/update" state={{ oldDeadline: deadline}} id="details-link">Update Deadline</Link>
            <br />
            <br />
            <button onClick={handleDelete} id="details-button">Delete Deadline</button>
        </div>
     );
}
 
export default DeadlineDetails;