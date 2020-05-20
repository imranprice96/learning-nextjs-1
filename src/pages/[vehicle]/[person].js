import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Person({ownersList}){
    const router = useRouter();
    const [owners, setOwners] = useState(ownersList);
    useEffect(() => {
    async function loadData() {
        const response = await fetch('http://localhost:4000/vehicles?ownerName=' + router.query.person + '&vehicle='+router.query.vehicle);
        const ownersList = await response.json();
      setOwners(ownersList);
    }
    if(ownersList.length == 0){
       loadData();
    }
    
  }, []);

return <pre>{ownersList[0]?.details}</pre>
}

Person.getInitialProps = async (context) => {
    if(!context.req){
        return {ownersList: []};
    }
    const {query} = context
    const response = await fetch('http://localhost:4000/vehicles?ownerName=' + query.person + '&vehicle='+query.vehicle);
    const ownersList = await response.json();
    return {ownersList: ownersList}
  }