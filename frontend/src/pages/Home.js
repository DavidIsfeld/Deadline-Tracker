// this file contains the home page, which is the first page users are brought to when they access the web app

import { useEffect } from 'react';
import { useDeadlineContext } from '../hooks/useDeadlineContext';
import { useAuthContext } from '../hooks/useAuthContext';
import DeadlineDetails from '../components/DeadlineDetails';
import DeadlineForm from '../components/DeadlineForm';

const Home = () => {
    const { deadlines, dispatch } = useDeadlineContext();
    const { user } = useAuthContext();

    // everytime the user changes, or when DeadlineContext's dispatch is run, we get all of that user's deadlines
    // after getting all of the deadlines we store them in deadlines in DeadlineContext
    useEffect(() => {
        const fetchDeadlines = async () => {
            const response = await fetch('/api/deadline/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            // only set the deadlines context if the fetch request worked
            if (response.ok) {
                dispatch({ type: 'SET_DEADLINES', payload: json });
            }
        };

        // Only try to fetch deadlines if a user is logged in
        // We can check this by seeing if the user context is not null
        if (user) {
            fetchDeadlines();
        }
    }, [user, dispatch]);

    return ( 
        <div className="home">
            <h2>Deadlines:</h2>
            <div className="deadlines">
                {deadlines && deadlines.map((deadline) => (
                    <DeadlineDetails key={deadline._id} deadline={deadline} />
                ))}
            </div>
            <DeadlineForm />
        </div>
     );
};
 
export default Home;