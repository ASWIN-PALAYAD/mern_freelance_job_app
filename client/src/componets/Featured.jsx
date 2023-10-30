import React, { useState } from 'react'
import '../componentsStyles/Featured.scss';
import {useNavigate} from 'react-router-dom'

export const Featured = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        navigate(`/gigs?search=${input}`)
    }

  return (
    <div className='featured' >
        <div className="container">
            <div className="left">
                <h1>Find the perfect <i>freelance</i> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="/images/search.png" alt="" />
                        <input type="text" placeholder='Try "building mobil app"'
                            onChange={e => setInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit} >Search</button>
                </div>
                <div className="popular">
                    <span>popular :</span>
                    <button>Web Design</button>
                    <button>Wordpress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>
            <div className="right">
                <img src='/images/man.png' alt="" />
            </div>
        </div>
    </div>
  )
}
