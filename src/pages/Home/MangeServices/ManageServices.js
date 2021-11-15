import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [orders, setOrders] = useState([]);
    const [control, setControl] = useState(true);
    useEffect(() => {
        fetch("http://localhost:5000/services")
          .then((res) => res.json())
          .then((data) => setOrders(data));
      }, [control]);
      console.log(orders);

      const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if(proceed){
            const url = `http://localhost:5000/services/${id}`;
            // const url = https://glacial-temple-95782.herokuapp.com/services/${id};
            fetch(url, {
             method: "DELETE",
            })
            .then((res) => res.json())
             .then((data) => {
             if (data.deletedCount) {
             setControl(!control);
             }
       })
       
        }
       
   };
    return (
        <div className="container">
            <div className="row">
            <h4>All Services {orders.length}</h4>
            {orders?.map((pd, index) => (
            <div className="col-md-6 col-lg-4">
              <div className="service p-3 border border m-2">
                <div className="service-img">
                  <img className="w-100" src={pd?.img} alt="" />
                </div>
                <h1>{pd.name}</h1>
                <p>{pd.area}</p>
                <p>{pd.worth}</p>
                <button className='btn btn-danger' onClick={() => handleDelete(pd._id)}>Delete</button>
              </div>
            </div>
          ))}
            </div>
            
        </div>
    );
};

export default ManageServices;