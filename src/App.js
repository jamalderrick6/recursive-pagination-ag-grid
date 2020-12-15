import logo from './logo.svg';
import React from 'react'
import './App.css';

const url = 'https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users'

class App extends  React.Component{
  constructor(props){
    super(props);
    this.state={
      rowData : [],
      page: 1,
      limit: 20
    }
  }

  componentDidMount() {
    let limit = 20;
    const getUsers = async function(page = 1) {
      var apiResults = await fetch(url + `?page=${page}&limit=${limit}`)
      .then(res=>{
        return res.json();
        });
        
        return apiResults;
    }

      const getEntireUserList = async function(page = 1) {
        const results = await getUsers(page);
        console.log("Retreiving data from API for page : " + page);
        if (results.length>0) {
          return results.concat(await getEntireUserList(page+1));
        } else {
          return results;
        }
      };

      (async ()=>{

        const entireList=await getEntireUserList();
        console.log(entireList);
    })();
  }



  render(){
    return(
      <>
        This is an app
      </>

    )
  }
}

export default App;