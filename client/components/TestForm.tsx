import React, { useState } from 'react';
import axios from 'axios';

interface FormValues {
  description: string;
  amount: number;
  date: string;
}

export default function TestForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    description: '',
    amount: 0,
    date: new Date().toISOString(),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/expenses',
        formValues
      );

      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              style={{ marginLeft: 10 }}
              value={formValues.description}
              onChange={(e) =>
                setFormValues((old) => ({
                  ...old,
                  description: e.target.value,
                }))
              }
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="amount">
            Amount
            <input
              type="number"
              id="amount"
              style={{ marginLeft: 10 }}
              value={formValues.amount}
              onChange={(e) =>
                setFormValues((old) => ({
                  ...old,
                  amount: +e.target.value,
                }))
              }
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="date">
            Date
            <input
              type="date"
              id="date"
              style={{ marginLeft: 10 }}
              value={formValues.date}
              onChange={(e) =>
                setFormValues((old) => ({
                  ...old,
                  date: e.target.value,
                }))
              }
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
