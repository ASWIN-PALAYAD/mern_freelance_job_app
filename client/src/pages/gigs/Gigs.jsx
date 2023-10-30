import React, { useEffect, useRef, useState } from 'react';
import "./Gigs.scss"
// import {gigs} from '../../data'
import GigCard from '../../componets/GigCard'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

const Gigs = () => {

  const [open, setOpen] = useState(false); 
  const [sort, setSort] = useState('sales');
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();
  console.log(search);
   const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res)=> {
        return res.data
      })
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false)
  }

  useEffect(()=>{
    refetch();
  },[sort])

  const apply = () => {
    refetch()
  }

  return (
    <div className="gigs">
      <div className="container">
          <span className="breadcrumbs">FIVERR - GRAPHICS & DESIGN - </span>
          <h1>Logo Design</h1>
          <p>Stand out from the crowd with a logo that fits your brand personality.</p>
          <div className="menu">
            <div className="left">
              <span>Budged</span>
              <input type="number" placeholder='min' ref={minRef} />
              <input type="number" placeholder='max'  ref={maxRef}/>
              <button onClick={apply} >Apply</button>
            </div>
            <div className="right">
                <span className='sortBy' >SortBy</span>
                <span className="sortType">{sort === 'sales' ? "Best Selling" : "Newest"}</span>
                <img src="/images/down.png" alt="" onClick={()=> setOpen(!open)} />
                
                {open && (
                  <div className="rightMenu">
                    {sort === "sales" ? (
                        <span onClick={()=> reSort('createdAt')} >Newest</span>
                    ): (
                      <span onClick={()=> reSort('sales')} >Best Selling</span>
                    )}
                  
                </div>
                )}
            </div>
          </div>

              <div className="cards">
                {isLoading ? "loading..." : error ? 'Somthing went wrong' : data.map(gig => (
                  <GigCard key={gig._id} item={gig} />
                ))}
              </div>

      </div>
    </div>
  )
}

export default Gigs