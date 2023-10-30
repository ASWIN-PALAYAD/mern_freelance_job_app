import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import '../componentsStyles/GigCard.scss';
import newRequest from '../utils/newRequest';

const GigCard = ({ item }) => {

    const { isLoading, error, data } = useQuery({
        queryKey: [`${item.UserId}`],
        queryFn: () =>
          newRequest.get(`/users/${item.userId}`).then((res)=> {
            return res.data
          })
      });




    return (
        <Link to={`/gig/${item._id}`} className='link'>
            <div className="gigCard">
                {/* <div className="container"> */}
                <img src={item.cover} alt="" />
                <div className="info">
                    {isLoading ? "loading..." : error ? 'Somthing went wrong' : (
                        <div className="user">
                        <img src={data.img || "/images/noimage.jpg"} alt="" />
                        <span>{data.username}</span>
                    </div>
                    )}
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src="/images/star.png" alt="" />
                        <span>
                            {!isNaN(item.totalStars / item.starNumber) && 
                            Math.round(item.totalStars / item.starNumber)}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="details">
                    <img src='/images/heart.png' alt="" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>{item.price}</h2>
                    </div>

                </div>
                {/* </div> */}
            </div>
        </Link>
    )
}

export default GigCard