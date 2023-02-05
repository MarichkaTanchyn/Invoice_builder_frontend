import React from 'react';

const Side = () => {
    return (
        <aside>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li className="dropdown">
                    <a href="#">Services</a>
                    <ul className="dropdown-content">
                        <li><a href="#">Service 1</a></li>
                        <li><a href="#">Service 2</a></li>
                        <li><a href="#">Service 3</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>

            <style jsx>{`
        aside {
          width: 200px;
          background-color: #f2f2f2;
          padding: 20px;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin: 10px 0;
        }

        a {
          display: block;
          padding: 10px;
          text-decoration: none;
          color: #333;
        }

        .dropdown {
          position: relative;
          display: none;
          
        }

        .dropdown-content {
          display: none;
          position: absolute;
          z-index: 1;
          background-color: #f9f9f9;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
        </aside>
    );
};

export default Side;