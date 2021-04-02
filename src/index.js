import React,{useState,useEffect} from 'react'
import ReactDom from 'react-dom'
import Header from './components/Header'
import PodcastRow from './components/PodcastRow'
import Episode from './components/Episode'
import axios from 'axios'
// import { post } from '../app'

const App = () => {
    const [searchTerm,setSearchTerm]=useState('')
    const [podcasts,setPodcasts]=useState([])
    const [episodes,setEpisodes]=useState([])
    const [selectedPodcast,setSelectedPodCast]=useState(null)
//     const podcasts = [
// {id:0,name: 'podcast 1',image:'/images/person_1.jpg',categories:['sports','entertainment']},
// {id:1,name: 'podcast 2',image:'/images/person_2.jpg',categories:['news','politics']},
// {id:2,name: 'podcast 3',image:'/images/person_3.jpg',categories:['business','economy']},


//     ]

//     const episodes = [
// {id:0,title:'track 1',image:'/images/img_1.jpg',trackUrl:'/audio/1.mp3'},
// {id:1,title:'track 2',image:'/images/img_2.jpg',trackUrl:'/audio/1.mp3'},
// {id:2,title:'track 3',image:'/images/img_3.jpg',trackUrl:'/audio/1.mp3'},
// {id:3,title:'track 4',image:'/images/img_4.jpg',trackUrl:'/audio/1.mp3'},
// {id:4,title:'track 5',image:'/images/img_5.jpg',trackUrl:'/audio/1.mp3'}

//     ]
const onInputTyped = (event) =>{
// console.log('onInputTyped'+ event.target.value);
setSearchTerm(event.target.value)
}

const onSearchBtnClicked=(event)=>{
console.log('onSearchBtnClicked:'+  searchTerm);
// console.log('URL:' +url)

axios({
    url:'/search',
    method:'post',
    data:{
        term:searchTerm.trim().toLocaleLowerCase()
    },
    options:{
        headers:{Accept:'application/json'}
    }

})
.then(({data}) =>{
// console.log('PODCAST: '+JSON.stringify(data))
setPodcasts(data.podcasts)
})

.catch(err =>{

})

}
const selectPodcast=(podcast,event)=>{
    event.preventDefault()
    console.log('selectPodcast:'+JSON.stringify(podcast))
    setSelectedPodCast(podcast)
}

useEffect(()=>{
console.log('SELECTED PODCAST CHANGED!'+JSON.stringify(selectedPodcast))
},[selectedPodcast])
    return (
        <div className="site-wrap">
            <Header />

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="featured-user  mb-5 mb-lg-0">
                                <h3 className="mb-2">Search Podcasts</h3>
                                <div style={{display: 'flex'}}>
                                    <input onChange={onInputTyped} type="text" style={{height: 32}} className="form-control mb-4" />
                                    <button onClick={onSearchBtnClicked} className="btn btn-info p-1 ml-2" style={{height: 32}}>GO!</button>
                                </div>
                                <ul className="list-unstyled">
                                    {podcasts.map(podcast=> <PodcastRow key={podcast.id}{...podcast} onSelect={(e)=>selectPodcast(podcast,e)}/>)}
                                   

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                           {episodes.map(episode=><Episode key= {episode.id}{...episode}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById('root'))