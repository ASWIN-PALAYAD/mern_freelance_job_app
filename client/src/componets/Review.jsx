import { useQuery } from '@tanstack/react-query';
import React from 'react';
import '../componentsStyles/Review.scss'
import newRequest from '../utils/newRequest';

const Review = ({review}) => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['review.userId'],
        queryFn: () =>
          newRequest.get(`/users/${review.userId}`).then((res) => {
            return res.data
          })
      });




    return (
        <div className="review">
            {
                isLoading ? "loading" : error ? 'Something went wrong' : (
                    <div className="user">
                <img className='pp' src={data.img || '/images/noimage.jpg'} alt="" />
                <div className="info">
                    <span>{data.username}</span>
                    <div className="country">
                        <span>{data.country}</span>
                    </div>
                </div>
            </div>
                )
            }
            <div className="stars">
                {Array(review.star).fill().map((item,i)=> (
                    <img src="/images/star.png" alt=""  key={i} />
                ))}
                
                <span>{review.star}</span>
            </div>
            <p>
                {review.desc}
            </p>
            <div className="helpfull">
                <span>Helpfull?</span>
                <img src="/images/like.png" alt="" />
                <span>Yes</span>
                <img src="/images/dislike.png" alt="" />
                <span>No</span>
            </div>
        </div>
    )
}

export default Review