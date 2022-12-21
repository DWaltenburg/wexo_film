import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  let [responseData, setResponseData] = React.useState('');
  let [loadingStatus, setLoadingStatus] = React.useState('');

  //Definer hvilken fetch
  var config = {
    method: 'get',
    url: 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series',
    headers: {}
  };

  //henter data ned til senere brug med responseData
  const loadAllSeries = () => {
    setLoadingStatus('Loading...');
    axios(config)
      .then(response => {
        setResponseData(response.data);
        setLoadingStatus('Done');
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //laver en liste over alle programmer med underliste med titel, billede, beskrivelse mm til hver 
  const showAllSeries = () => {
    var fragList = document.createDocumentFragment();

    //indholdets overskrift
    let listTitle = document.getElementById('contentTitle');
    listTitle.innerHTML = responseData.title;


    let list = document.getElementById('contentList');

    //danner en ny item til content listen, samt en underliste med detaljer
    for (let i = 0; i < responseData.entryCount; i++) {

      //tilføjer titel til hovedliste som overskrift
      var li = document.createElement('li');
      li.innerHTML = responseData.entries[i].title;

      //danner underliste
      var innerUl = document.createElement('ul');

      //Tilføj billede - burde kunne gøres bedre - asset types?
      if (responseData.entries[i].plprogram$thumbnails['orig-1080x1920']) {
        var imgLi = document.createElement('li');
        var img = new Image();
        img.src = responseData.entries[i].plprogram$thumbnails['orig-1080x1920'].plprogram$url;
        img.width = 500;
        imgLi.appendChild(img);
        console.log(img);
        innerUl.appendChild(imgLi);
      }

      //Tilføj beskrivelse
      var descLi = document.createElement('li'); //ny item til liste
      descLi.innerHTML = 'Description: ' + responseData.entries[i].description; //indholdet
      innerUl.appendChild(descLi); //tilføj

      //Tilføj programtype
      var progTypeLi = document.createElement('li');
      progTypeLi.innerHTML = 'Programtype: ' + responseData.entries[i].plprogram$programType;
      innerUl.appendChild(progTypeLi);

      //Tilføj programid
      var idLi = document.createElement('li');
      idLi.innerHTML = 'Programid: ' + responseData.entries[i].id;
      innerUl.appendChild(idLi);

      li.appendChild(innerUl);

      fragList.appendChild(li);
    };
    list.appendChild(fragList);
  }


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => loadAllSeries()} type='button'>
          Click to load data
        </button>

        <button onClick={() => showAllSeries()} type='button'>
          Click to show data
        </button>
        <p>
          {loadingStatus}
        </p>
        <div id='content'>
          <h3 id='contentTitle'></h3>
          <ul id='contentList'></ul>
        </div>
      </header>
    </div>
  );
}

export default App;