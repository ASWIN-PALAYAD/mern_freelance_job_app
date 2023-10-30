import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Message.scss'

const Message = () => { 

  const {id} = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const queryClient = useQueryClient();


  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res)=> {
        return res.data
      })
  });


  const mutation = useMutation({
    mutationFn: (message) => {
        return newRequest.post(`/messages`,message)
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries(['messages'])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId : id,
      desc : e.target[0].value,
    });
    e.target[0].value = ''
  }

  return (
    <div className="message"> 
      <div className="container">
        <span className="breadCrumbs">
          <Link className='link' to='/messages'>MESSAGES</Link > > ASWIN S > 
        </span>

        {isLoading ? 'loading..' : error ? "something went wrong" : (
          <div className="messages">
            {data.map((message) => (
              <div className={message.userId === currentUser._id ? "owner item" : "item"} key={message.id}>
              <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="" />
              <p>{message.desc}</p>
            </div>
            ))}
        </div>
        )}
        
        <hr />
        <form className="write" onSubmit={handleSubmit} >
          <textarea name="" placeholder='write a message' id="" cols="30" rows="10"></textarea>
          <button type='submit'  >Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message 