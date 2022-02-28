

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './KodoFetch.css';

import Pagination from './Pagination'




function KodoFetch() {

    const [userInfos, setUserInfos] = useState([])

    const [filteredData,setFilteredData] = useState(userInfos);

    const [page, setPage] = useState(0);

    const fetchApi = () => {

        return axios.get('mockData.json',{

            headers : { 

              'Content-Type': 'application/json',

              'Accept': 'application/json'

             }

          })

               .then((res) => {

                   const {data} = res

                   console.log(data)

                   return data

               })

               .catch((err) => {

                   console.log("Error: ", err)

               })

    }

    useEffect(() => {

        fetchApi().then((apiUser) => {

            setUserInfos(apiUser)

            setFilteredData(apiUser)

        })

    },[])



    

    

    const handleSearch = (event) => {

        let value = event.target.value.toLowerCase();

        let result = [];

        console.log(value);

        result = userInfos.filter((data) => {

        return data.name.search(value) !== -1 ||  data.description.search(value) !== -1;

        });

        setFilteredData(result);

    }

  return (

    <React.Fragment>

        <div className="search">

                    <div className="search-wrapper">

                        <label htmlFor="search-form">

                            <input

                                type="search"

                                name="search-form"

                                id="search-form"

                                className="search-input"

                                placeholder="Search for..."

                                onChange={(e) => handleSearch(e)}

                            />

                        </label>

                    </div>

        </div>

        <div className='Users'>

            {filteredData.map((userInfo,idx) => {

                return (

                    <div>

                        <div key={idx} className="user-Info">

                            <pre>{userInfo.name}</pre>

                            <img className = "user-img" src="kodo.jfif"/>

                        </div>                

                    </div>

                            

                    )

            })}

        </div>

        <table className="tables"> 

            <tr><th>name</th><th>Description</th><th>DateLastEdited</th></tr>

            {   

                filteredData.map((dynamicData) =>

                <tr className="trow"> 

                    <td>{dynamicData.name} 

                                        </td> 

                    <td> {dynamicData.description} </td>

                    <td>{dynamicData.dateLastEdited}</td>

                </tr>

            ) }

        </table>

        {userInfos.length > 0 ? (

        <>

          <Pagination

            data={userInfos}

            RenderComponent= "name"

            title="userInfos"

            pageLimit={5}

            dataLimit={10}

          />

        </>

      ) : (

       <h1>No Posts to display</h1>

      )}


    </React.Fragment>

   

  )

}


export default KodoFetch


