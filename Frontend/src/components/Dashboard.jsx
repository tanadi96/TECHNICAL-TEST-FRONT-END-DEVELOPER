import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import drumIjo from '../assets/drum_Ijo.png';
import drumKuning from '../assets/drum_Kuning.png';
import drumMerah from '../assets/drum_Merah.png';
import { dummyCar } from '../data/dummycar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dummyFuelData } from '../data/dummyFuel';

function Dashboard() {
  const [fuelData, setFuelData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setConnectionStatus] = useState('disconnected');
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const options = {
      username: 'testravelware',
      password: 'R12345678',
      reconnectPeriod: 5000,
      keepalive: 60,
      protocol: 'wss',
      rejectUnauthorized: false,
    };

    let client;
    try {
      client = mqtt.connect(
        'wss://245d28c8a27a42569750f87c3eb044d2.s2.eu.hivemq.cloud:8884/mqtt',
        options
      );

      client.on('connect', () => {
        setConnectionStatus('connected');
        console.log('Connected to MQTT broker');

        client.subscribe('test/realtime', { qos: 1 }, (err) => {
          if (!err) {
            console.log('Successfully subscribed to test/realtime');
          } else {
            console.error('Subscription error:', err);
          }
        });
      });

      client.on('message', (_, message) => {
        try {
          const data = JSON.parse(message.toString());
          setFuelData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      client.on('error', (error) => {
        console.error('MQTT error:', error);
        setConnectionStatus('error');
      });
    } catch (error) {
      console.error('Failed to create MQTT client:', error);
      setConnectionStatus('error');
    }

    return () => {
      if (client) {
        client.end(true, {}, () => {
          console.log('MQTT connection closed');
          setConnectionStatus('disconnected');
        });
      }
    };
  }, []);

  const slides = fuelData.map((drum) => {
    const fuelPercentage = (drum.current_stock / drum.maxium_stock) * 100;
    let bgColor = 'bg-red-600';
    let bgDrum = drumMerah;
    if (fuelPercentage >= 60) {
      bgColor = 'bg-green-600';
      bgDrum = drumIjo;
    } else if (fuelPercentage >= 20) {
      bgColor = 'bg-yellow-600';
      bgDrum = drumKuning;
    }

    return {
      bgColor,
      title: drum.name,
      volume: `${drum.current_stock} / ${drum.maxium_stock}L`,
      status: drum.status,
      imgSrc: bgDrum || 'https://placehold.co/50x50',
      updated: drum.updated_at,
    };
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); 

    return () => {
      clearInterval(intervalId)
    };
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const carData = dummyCar.map((car) => ({
    name: car.name,
    fuel: car.usage / 10,
  }));

  const topCarData = carData.sort((a, b) => b.fuel - a.fuel).slice(0, 5);

  const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#ffc658", "#ff8042"];

  const getColor = (index) => {
    return colors[index % colors.length];
  };

  const totalUsage = dummyFuelData.reduce((total, fuel) => total + fuel.usage, 0);
  const fuelPer = dummyFuelData.map((fuel) => {
    return (fuel.usage / totalUsage) * 100;
  });

  return (
    <div className="ml-56 mt-14 p-0 h-full flex flex-col">
      <div className="bg-gray-800 shadow-lg p-4 border border-gray-700 flex-grow">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div>
          <h1 className="text-3xl font-bold text-white text-center">REALTIME FUEL TANK STATUS</h1>
        </div>

      
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-300 border-t-transparent rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {/* Carousel */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700 flex-grow">
              <div className="relative h-full">
                <div className="carousel flex space-x-4 overflow-hidden h-full">
                  {slides.map((slide, index) => {
                    const updatedDate = new Date(slide.updated);
                    const now = new Date();
                    const timeDiff = Math.abs(now - updatedDate);
                    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                    return (
                      <div
                        key={index}
                        className={`carousel-item ${slide.bgColor} p-4 rounded-lg flex-shrink-0 w-64 border border-gray-700`}
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        <div className="flex items-center mb-2">
                          <img alt="Fuel Tank" className="mr-2" height={40} src={slide.imgSrc} width={40} />
                          <div className="flex flex-col">
                            <h3 className="font-bold">{slide.title}</h3>
                            <p className="text-sm">{slide.volume}</p>
                            <p className="text-lg mt-3 mb-0">Status: {slide.status}</p>
                          </div>
                          <p className="text-sm">Last transaction: {diffDays} days ago</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                  onClick={prevSlide}
                >
                  &lt;
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                  onClick={nextSlide}
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="flex p-1 space-x-4 h-2/3">
              <div className="bg-gray-800 p-4 rounded-lg mb-6 w-1/2 border border-gray-700">
                <h2 className="text-xl text-white text-center font-bold mb-4">TOP 5 CAR USAGE THIS MONTH</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topCarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Volume (Liter)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fuel" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg mb-6 w-1/2 border border-gray-700">
                <h2 className="text-xl text-white text-center font-bold mb-4">FUEL USAGE THIS MONTH</h2>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={dummyFuelData}
                      dataKey="usage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      labelLine={false}
                      label={({ cx, cy, midAngle, outerRadius, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius - 10;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#fff"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={14}
                          >
                            {fuelPer[index].toFixed(0)}%
                          </text>
                        );
                      }}
                    >
                      {dummyFuelData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={getColor(index)} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="bg-gray-800 p-2 rounded-lg w-full border border-gray-700" >
                  <table className="min-w-full text-white border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border-b">Fuel Type</th>
                        <th className="p-2 border-b">Percentage</th>
                        <th className="p-2 border-b">Usage (L)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyFuelData.map((fuel, index) => {
                        const percentage = (fuel.usage / totalUsage) * 100;
                        return (
                          <tr key={index} className="odd:bg-gray-700">
                            <td className="p-2 border-b flex items-center">
                              <span
                                className="inline-block w-2 h-1 rounded-full mr-1"
                                style={{ backgroundColor: getColor(index) }}
                              ></span>
                              {fuel.name}
                            </td>
                            <td className="p-2 border-b">{percentage.toFixed(0)}%</td>
                            <td className="p-2 border-b">{fuel.usage}L</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
