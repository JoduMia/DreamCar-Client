import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loader from '../../../components/shared/Loader';

const AllUsers = () => {
    const {data: users, isLoading, isError} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
            return data;
        }
    })

    if(isLoading) return <Loader />
  return (
    <div>AllUsers</div>
  )
}

export default AllUsers