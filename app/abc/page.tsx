'use client';

import { useEffect, useState } from 'react';
import supabase from '../../client';

const TestConnection = () => {
  interface UserData {
    user_id: number;
    full_name: string;
    bank_acc_no: string;
    aadhar_no: number;
    pan_no: string;
    dob: string;
    gender: string;
    email: string;
  }

  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sendData = async () => {
      try {
       await supabase.auth.getSession().then((session) => {console.log("session", session)})
       
        // Insert dummy data into 'users' table
        const { data: insertedData, error } = await supabase
          .from('users')
          .insert([
            {
              user_id: 7,
              full_name: "John Doe",
              bank_acc_no: "1234567890",
              aadhar_no: 123456789012,
              pan_no: "ABCDE1234F",
              dob: "1990-01-01T00:00:00Z",
              gender: "Male",
              email: "johndoe@example.com",
            },
          ]);

        if (error) throw error;

        if (insertedData) {
          setData(insertedData);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    sendData();
  }, []);

  return (
    <div>
      <h2>Test Connection and Data Insertion</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <div>
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.user_id}>
                  <strong>Name:</strong> {item.full_name} | <strong>Email:</strong> {item.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>Data inserted successfully, but no additional data retrieved.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TestConnection;
