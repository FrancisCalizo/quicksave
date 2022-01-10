import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function TestList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async function getList() {
      try {
        const res = await axios.get('http://localhost:5000/expenses');

        setList(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
}
