import * as React from 'react';
import {PureComponent} from 'react';
import Plot from 'react-plotly.js';
import '../App.css';

import { AiFillLike } from 'react-icons/ai';
import { GiCycle } from 'react-icons/gi';
import { MdComment } from 'react-icons/md'
import
 { 
   RiEmotionHappyLine, 
   RiEmotionSadLine,
   RiEmotionNormalLine
} from 'react-icons/ri'
import { FaHandshake } from 'react-icons/fa'

export class PopInfoB extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.tweet}`;
    const likes = info.nlikes
    const replies = info.nreplies
    const retweets = info.nretweets
    const joyperc = `${info.joy | 0}` + '%'
    const sadperc = `${info.sadness | 0}` + '%'
    const angerperc = `${info.anger | 0}` + '%'
    const fearperc = `${info.fear | 0}` + '%'
    var colorDict = {
      "Positive": "#4DB220",
      "Negative": '#BA202F'
    };
    var sizeDict = {
      "joy": [26, 18, 18, 18],
      "trust": [18, 26, 18, 18],
      "fear": [18, 18, 26, 18],
      "anger": [18, 18, 18, 26],
    }

    return (
      <div>
        <div style={{maxWidth:"17em"}}>
          <small><i>{displayName}</i></small> 
        </div>
        <div style={{backgroundColor:"rgba(221,0,0,0.0)", marginTop:10}}>
            <a>sentiment: <span style={{color:colorDict[info.status]}}>{info.predominant}</span></a>
        </div>
        <div style={{marginTop:12}}>
            {info.predominant !== undefined &&
              <div>
                <a><RiEmotionHappyLine size={sizeDict[info.predominant][0]}/></a>
                <a>{joyperc} &nbsp;</a>
                <a><FaHandshake size={sizeDict[info.predominant][1]}/></a>
                <a>{sadperc} &nbsp;</a>
                <a><RiEmotionSadLine size={sizeDict[info.predominant][2]}/></a>
                <a>{fearperc} &nbsp;</a>
                <a><RiEmotionNormalLine size={sizeDict[info.predominant][3]}/></a>
                <a>{angerperc}</a>
              </div>
            }
        </div>
        <div style={{marginTop:10}}>
            <a><AiFillLike size={18}/> </a> 
            <a>{likes}</a>|{' '}
            <a><MdComment size={18}/> </a> 
            <a>{replies}</a>|{' '}
            <a><GiCycle size={18}/> </a> 
            <a>{retweets}</a>|{' '}
        </div>
      </div>
    );
  }
}

export class PopInfoF extends PureComponent {
    render() {
      const {info} = this.props;
      const displayName = `${info.farm}`;
      const joy = info.joy
      const trust = info.trust
      const anger = info.anger
      const fear = info.fear
      const imgsrc = info.imgsrc
      return (
        <div>
          <div>
            <strong>{displayName}</strong> |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
            >
              Wikipedia
            </a>
          <div>
            <img alt={displayName} src={imgsrc}></img>
          </div>
          </div>
            <Plot className="graphBounce"
                data={[
                {
                    type: 'bar',
                    x: ['joy', 'trust', 'anger', 'fear'],
                    y: [joy, trust, anger, fear],
                    marker: {
                        color: ['#AFEC94', '#4DB220', '#FAE2E4', '#BA202F']
                    }
                }
                ]}
                layout={
                    {width: 100, 
                    height: 155, 
                    autosize: false, 
                    margin: {
                        l: 5,
                        r: 5,
                        b: 42,
                        t: 10,
                        pad: 4}
                    }
                }
                config={{displayModeBar:false}}
            />
        </div>
      );
    }
  }