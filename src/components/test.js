import React,{ useState, useEffect } from 'react'

const useFetch = (url, options) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(JSON.stringify(json));
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error };
};

const View = () => {

    const udata = {username:'123',password:'123456'}

    const [username,setUsername] = useState('123')

  const res = '123'

    if (!res) {
      return <div>Loading...</div>
    }

    return (
        <div>
          {udata['username']}<br/>
          {res}<br />
          {res}<br />
        </div>
    )
}

export default View;
