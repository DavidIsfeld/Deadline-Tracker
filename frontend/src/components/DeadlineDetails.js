import { useDeadlineContext } from '../hooks/useDeadlineContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

const DeadlineDetails = ( { deadline } ) => {


    return ( 
        <div className="deadline-details">
            <h3>{deadline.title}</h3>
            <p>Description:<br />{deadline.description}</p>
            <p>Deadline: {format(new Date(deadline.date), 'MMMM d, yyyy')}</p>
            <p>Time Until Deadline: {formatDistanceToNow(new Date(deadline.date), { addSuffix: true })}</p>
            <p>Date Deadline Was Created: {formatDistanceToNow(new Date(deadline.createdAt), { addSuffix: true })}</p>

        </div>
     );
}
 
export default DeadlineDetails;