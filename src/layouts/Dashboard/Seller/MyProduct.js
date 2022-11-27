import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loader from '../../../components/shared/Loader'
import { AuthContext } from '../../../contexts/AuthContext/AuthProvider'

const MyProduct = () => {
  const { user } = useContext(AuthContext);

  const { data: myproducts, isLoading, isError, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch(`http://localhost:5000/myproducts?email=${user?.email}`)
      .then(res => res.json())
  })


  //addto advertise function
  const addToAdvertise = (id, refectch) => {
    fetch(`http://localhost:5000/addtoads/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Successfully added to advertisement');
          refectch();
        }
      })
  };

  const handleDelete = (id, name, refetch) => {
    const agree = window.confirm(`Are you sure to delete ${name}`);
    if (agree) {
      fetch(`http://localhost:5000/deleteproduct/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            toast.success('Successfully Deleted');
            refetch();
          }
        })
    }
  };

  if (isLoading) return <Loader />
  if (isError) return (
    <div className='flex items-center justify-center h-[80vh]'>
      <h1 className='text-3xl font-semibold text-red-600'>Something Wrong happended</h1>
    </div>
  )


  if(myproducts.length) return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Sell Status</th>
              <th>Advertisement</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {
              myproducts.map(product => {
                const { _id, image, resale_price, product_name, sell_status, ad } = product;
                return (
                  <tr key={_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{product_name}</td>
                    <td className='font-bold'>${resale_price}</td>
                    <td className={sell_status === 'available' ? 'text-green-600 font-bold capitalize' : 'text-red-600 font-bold capitalize'}>{sell_status}</td>

                    <td>
                      <button
                        onClick={() => addToAdvertise(_id, refetch)}
                        className="btn btn-success btn-sm"
                        disabled={(sell_status === 'sold' || ad) && true}>
                        {(sell_status === 'available' && !ad) ? 'Click to advertise'
                          : (sell_status === 'available' && ad) ? 'On advertisement'
                            :
                            'Already Sold'
                        }
                      </button>
                    </td>

                    <td>
                      <button onClick={() => handleDelete(_id, product_name, refetch)} className="btn btn-success btn-sm" >Delete</button>
                    </td>
                  </tr>
                )

              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className='flex items-center justify-center h-[300px]'>
      <div className='space-y-3'>
      <h3 className='text-3xl font-semibold text-green-600'>You have no products to display</h3>
      <p>Want to add a product to sell? <Link className='btn btn-sm btn-success' to={'/dashboard/addproduct'}>Add product</Link></p>
      </div>
    </div>
  )
}

export default MyProduct