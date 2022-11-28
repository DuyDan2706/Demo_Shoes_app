import React from 'react'

type Props = {}

export default function Cart({}: Props) {
  return (
    <div>
          <h3>Carts</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>image</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th> action</th>
                    </tr>
                </thead>
                <tbody>
                         <td>1</td>
                         <td>Adidas Prophere</td>
                         <td><img src="http://i.pravatar.cc?u=1" width={50}/>  </td>
                         <td>1.0000</td>
                         <td>10</td>
                         <td>10.0000</td>
                         <td>
                            <button >Del</button>
                         </td>

                </tbody>
                <tbody>
                         <td>1</td>
                         <td>Adidas Prophere</td>
                         <td><img src="http://i.pravatar.cc?u=1" width={50}/>  </td>
                         <td>1.0000</td>
                         <td>10</td>
                         <td>10.0000</td>
                         <td>
                            <button >Del</button>
                         </td>

                </tbody>
                <tbody>
                         <td>1</td>
                         <td>Adidas Prophere</td>
                         <td><img src="http://i.pravatar.cc?u=1" width={50}/>  </td>
                         <td>1.0000</td>
                         <td>10</td>
                         <td>10.0000</td>
                         <td>
                            <button > Del</button>
                         </td>

                </tbody>
                    
                </table>
              <div className='d-flex justify-content-end '  >
                <button type="button" className="btn btn-primary p-2 m-2 " > Order </button>
              </div>
    </div>
  )
}