import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css';

interface StaffData {
  StaffID: string;
  StaffName: string;
  Position: string;
  Password: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<StaffData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<StaffData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            ...row,
            Password: generatePassword(),
          }));
          setData(parsedData);
        },
      });
    }
  };

  const generatePassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App">
      <h1>CSV File Reader</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Table data={data} />
      {data.length > 0 && (
        <button onClick={downloadJSON}>Download JSON</button>
      )}
    </div>
  );
};

interface TableProps {
  data: StaffData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{(row as any)[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
