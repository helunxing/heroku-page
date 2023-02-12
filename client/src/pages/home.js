import React, {useEffect} from 'react';
import IntroContent from '../components/IntroContent'

const Home = () => {

    useEffect(() => {
        document.title = 'Time Agreement';
    }, []);

    return <main>
        <IntroContent/>
    </main>;

}

export default Home
