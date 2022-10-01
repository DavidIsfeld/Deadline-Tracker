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
            <h3>{deadline.title}</h3>
            <p>Description:<br />{deadline.description}</p>
            <p>Deadline: {format(new Date(deadline.date), 'MMMM d, yyyy')}</p>
            <p>Time Until Deadline: {formatDistanceToNow(new Date(deadline.date), { addSuffix: true })}</p>
            <p>Date Deadline Was Created: {formatDistanceToNow(new Date(deadline.createdAt), { addSuffix: true })}</p>
            <button onClick={handleDelete}>delete</button>
            <Link to="/update" state={{ oldDeadline: deadline}}>Update Deadline</Link>
        </div>
     );
}
 
export default DeadlineDetails;