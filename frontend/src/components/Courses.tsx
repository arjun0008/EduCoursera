import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

interface Course {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  created_at: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Course[]>("courses/")
      .then((res) => setCourses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <>
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Landing Section */}
      <div style={{
        // backgroundColor: '#f8feff',
        background:"#fff",
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          <div style={{
            flex: '1 1 400px',
            textAlign: 'left',
            minWidth: '300px'
          }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: '700',
              marginBottom: '30px',
              letterSpacing: '2px',
              lineHeight: '1.1',
              color: '#148FA2',
              textTransform: 'uppercase'
            }}>
              Online<br/>Learning
            </h1>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '40px',
              lineHeight: '1.8',
              color: '#333',
              maxWidth: '500px'
            }}>
              Transform your career with industry-leading courses. Learn from experts, build real projects, and achieve your goals at your own pace.
            </p>
            {/* <a href="#courses" style={{
              display: 'inline-block',
              backgroundColor: '#148FA2',
              color: '#ffffff',
              padding: '16px 48px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '50px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(20, 143, 162, 0.3)',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 143, 162, 0.4)';
              e.currentTarget.style.backgroundColor = '#0d6b7a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(20, 143, 162, 0.3)';
              e.currentTarget.style.backgroundColor = '#148FA2';
            }}>
              More
            </a> */}
          </div>
          <div style={{
            flex: '1 1 500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '300px'
          }}>
            <img 
              src="/cover.svg" 
              alt="Online learning illustration" 
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 20px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          textAlign: 'center',
          color: '#148FA2',
          marginBottom: '60px',
          position: 'relative',
          paddingBottom: '20px'
        }}>
          Our Courses
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            backgroundColor: '#148FA2',
            borderRadius: '2px'
          }}></div>
        </h1>

        {courses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem' }}>
            No courses available.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            justifyContent: 'center'
          }}>
            {courses.map((course) => (
              <a
                key={course.id}
                href={`/courses/${course.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(20, 143, 162, 0.1)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(20, 143, 162, 0.1)',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(20, 143, 162, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 143, 162, 0.1)';
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '220px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#f0f0f0'
                  }}>
                    <img
                      src={course.image_url}
                      alt={course.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
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
                    padding: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <p style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '16px',
                      lineHeight: '1.4',
                      flex: 1
                    }}>
                      {course.name}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto'
                    }}>
                      <p style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#148FA2',
                        margin: 0
                      }}>
                        ${course.price}
                      </p>
                      <button
                      className="btn-outline"
                        // style={{
                        //   backgroundColor: 'transparent',
                        //   color: '#148FA2',
                        //   border: '2px solid #148FA2',
                        //   padding: '10px 24px',
                        //   fontSize: '1rem',
                        //   fontWeight: '600',
                        //   borderRadius: '25px',
                        //   cursor: 'pointer',
                        //   transition: 'all 0.3s ease'
                        // }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#148FA2';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#148FA2';
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </>
);

};

export default Courses;