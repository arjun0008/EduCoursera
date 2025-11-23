import React, { useEffect, useState } from "react";
import api from "../api";

interface PurchasedCourse {
  id: number;
  course_name: string;
  course_description: string;
  course_price: string;
  course_image: string;
  purchased_at: string;
}

const PurchasedCourses: React.FC = () => {
  const [purchased, setPurchased] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768;

  useEffect(() => {
    api
      .get<PurchasedCourse[]>("purchased/")
      .then((res) => setPurchased(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading purchased courses...</p>;
 

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '60px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          color: '#148FA2',
          marginBottom: '50px',
          position: 'relative',
          paddingBottom: '20px'
        }}>
          Purchased Courses
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '80px',
            height: '4px',
            backgroundColor: '#148FA2',
            borderRadius: '2px'
          }}></div>
        </h1>

        {purchased.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f8feff',
            borderRadius: '16px',
            border: '2px dashed #148FA2'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              margin: 0
            }}>
              You haven't purchased any courses yet.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {purchased.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(20, 143, 162, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(20, 143, 162, 0.1)',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(20, 143, 162, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 143, 162, 0.1)';
                }}
              >
                <div style={{
                  width: isSmallScreen ? '100%' : '300px',
                  minWidth: isSmallScreen ? '100%' : 'auto',
                  height: isSmallScreen ? '220px' : 'auto',
                  flexShrink: 0,
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0'
                }}>
                  <img
                    src={item.course_image}
                    alt={item.course_name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
                <div style={{
                  flex: 1,
                  padding: '30px',
                  minWidth: isSmallScreen ? '100%' : '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      {item.course_name}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '20px'
                    }}>
                      {item.course_description}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '15px'
                    }}>
                      <p style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#148FA2',
                        margin: 0
                      }}>
                        ${item.course_price}
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#888',
                        margin: 0
                      }}>
                        Purchased on: {new Date(item.purchased_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    {/* <button
                      style={{
                        backgroundColor: '#148FA2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px 30px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        alignSelf: 'flex-start',
                        marginTop: '10px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#0d6b7a';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#148FA2';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Continue Learning
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedCourses;

